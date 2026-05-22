import { describe, it, expect, mock, beforeEach } from "bun:test";

// ── Module mocks — must be declared before any dynamic imports ─────────────────

const mockWriteFile = mock(async () => {});
const mockMkdir = mock(async () => {});
const mockReadFile = mock(async (_path: string) => Buffer.from("<svg/>"));
const mockUnlink = mock(async () => {});

mock.module("node:fs/promises", () => ({
  writeFile: mockWriteFile,
  mkdir: mockMkdir,
  readFile: mockReadFile,
  unlink: mockUnlink,
}));

const mockUpsertDocument = mock(async () => {});
const mockLoadDocument = mock(async (_type: string, _iri: string) => null as unknown);
const mockRemoveDocument = mock(async () => {});

mock.module("../store", () => ({
  store: {
    upsertDocument: mockUpsertDocument,
    loadDocument: mockLoadDocument,
    removeDocument: mockRemoveDocument,
  },
}));

const mockBuildPicturiumUrl = mock(
  async () => "http://picturium:20045/uploads/test.jpg?w=320&f=auto&token=abc"
);
const mockFetchFromPicturium = mock(
  async () =>
    new Response(new Uint8Array([0xff, 0xd8]), {
      status: 200,
      headers: { "Content-Type": "image/jpeg" },
    })
);

mock.module("../picturium", () => ({
  buildPicturiumUrl: mockBuildPicturiumUrl,
  fetchFromPicturium: mockFetchFromPicturium,
  isValidThumbnailSize: (s: string) =>
    ["icon", "small", "medium", "large", "xlarge"].includes(s),
  THUMB_PIXEL_WIDTHS: { icon: 64, small: 128, medium: 320, large: 640, xlarge: 1200 },
}));

// ── Import route after mocks ───────────────────────────────────────────────────

// Dynamic imports ensure mocks are active before module evaluation.
// We test the Hono sub-app directly (without the /api/media prefix wrapper) to
// avoid Hono v4 trailing-slash routing quirks with route() + POST /.
const { default: mediaApp, encodeIRI } = await import("./media");

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeImageFormData(opts: {
  name?: string;
  type?: string;
  size?: number;
  altText?: string;
  attachedTo?: string;
}): FormData {
  const {
    name = "photo.jpg",
    type = "image/jpeg",
    size = 1024,
    altText,
    attachedTo,
  } = opts;
  const fd = new FormData();
  fd.append("file", new File([new Uint8Array(size)], name, { type }));
  if (altText) fd.append("altText", altText);
  if (attachedTo) fd.append("attachedTo", attachedTo);
  return fd;
}

function makeEncodedIRI(): string {
  const iri = "https://data.semantic-desk.top/garden/Media/00000000-0000-0000-0000-000000000001";
  return encodeIRI(iri);
}

const FAKE_ATTACHMENT = {
  "@id": "https://data.semantic-desk.top/garden/Media/00000000-0000-0000-0000-000000000001",
  "@type": "https://ontology.semantic-desk.top/garden#MediaAttachment",
  name: "photo.jpg",
  storedPath: "uploads/00000000-0000-0000-0000-000000000001.jpg",
  mimeType: "image/jpeg",
  fileSize: 1024,
  uploadedAt: "2026-01-01T00:00:00.000Z",
};

const FAKE_SVG_ATTACHMENT = {
  ...FAKE_ATTACHMENT,
  storedPath: "uploads/test.svg",
  mimeType: "image/svg+xml",
};

// ── Tests ──────────────────────────────────────────────────────────────────────

describe("POST /api/media/ — upload", () => {
  beforeEach(() => {
    mockWriteFile.mockClear();
    mockMkdir.mockClear();
    mockUpsertDocument.mockClear();
  });

  it("accepts a valid JPEG and returns 201 with IRI", async () => {
    const res = await mediaApp.request("/", {
      method: "POST",
      body: makeImageFormData({}),
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body["@id"]).toMatch(/^https:\/\/data\.semantic-desk\.top\/garden\/Media\//);
    expect(body.mimeType).toBe("image/jpeg");
    expect(body.encodedIRI).toBeTruthy();
    expect(mockMkdir).toHaveBeenCalled();
    expect(mockWriteFile).toHaveBeenCalled();
    expect(mockUpsertDocument).toHaveBeenCalledWith(
      "MediaAttachment",
      expect.stringContaining("Media/"),
      expect.objectContaining({ mimeType: "image/jpeg" })
    );
  });

  it("stores altText when provided", async () => {
    const res = await mediaApp.request("/", {
      method: "POST",
      body: makeImageFormData({ altText: "A rose garden" }),
    });
    expect(res.status).toBe(201);
    expect(mockUpsertDocument).toHaveBeenCalledWith(
      "MediaAttachment",
      expect.any(String),
      expect.objectContaining({ altText: "A rose garden" })
    );
  });

  it("returns 400 when no file field is present", async () => {
    const fd = new FormData();
    fd.append("altText", "no file here");
    const res = await mediaApp.request("/", { method: "POST", body: fd });
    expect(res.status).toBe(400);
  });

  it("returns 413 when file exceeds MAX_BYTES", async () => {
    // Default MAX_BYTES is 10MB; send 11MB
    const res = await mediaApp.request("/", {
      method: "POST",
      body: makeImageFormData({ size: 11 * 1024 * 1024 }),
    });
    expect(res.status).toBe(413);
  });

  it("returns 415 for unsupported MIME type", async () => {
    const res = await mediaApp.request("/", {
      method: "POST",
      body: makeImageFormData({ type: "video/mp4", name: "clip.mp4" }),
    });
    expect(res.status).toBe(415);
    const body = await res.json();
    expect(body.allowed).toBeDefined();
  });

  it("accepts SVG files", async () => {
    const res = await mediaApp.request("/", {
      method: "POST",
      body: makeImageFormData({ type: "image/svg+xml", name: "icon.svg" }),
    });
    expect(res.status).toBe(201);
  });
});

describe("GET /api/media/:base64iri/thumb/:size — thumbnail proxy", () => {
  beforeEach(() => {
    mockLoadDocument.mockClear();
    mockBuildPicturiumUrl.mockClear();
    mockFetchFromPicturium.mockClear();
  });

  it("proxies through picturium for JPEG attachments", async () => {
    mockLoadDocument.mockImplementation(async () => FAKE_ATTACHMENT);

    const encoded = makeEncodedIRI();
    const res = await mediaApp.request(`/${encoded}/thumb/medium`);

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("image/jpeg");
    expect(mockBuildPicturiumUrl).toHaveBeenCalledWith(
      expect.any(String),
      FAKE_ATTACHMENT.storedPath,
      "medium",
      expect.any(String)
    );
    expect(mockFetchFromPicturium).toHaveBeenCalled();
  });

  it("serves SVG files directly without calling picturium", async () => {
    mockLoadDocument.mockImplementation(async () => FAKE_SVG_ATTACHMENT);
    mockReadFile.mockImplementation(async () => Buffer.from("<svg/>"));

    const encoded = makeEncodedIRI();
    const res = await mediaApp.request(`/${encoded}/thumb/icon`);

    expect(res.status).toBe(200);
    expect(res.headers.get("Content-Type")).toBe("image/svg+xml");
    expect(mockBuildPicturiumUrl).not.toHaveBeenCalled();
    expect(mockFetchFromPicturium).not.toHaveBeenCalled();
  });

  it("returns 404 when attachment is not in the store", async () => {
    mockLoadDocument.mockImplementation(async () => null);

    const encoded = makeEncodedIRI();
    const res = await mediaApp.request(`/${encoded}/thumb/medium`);

    expect(res.status).toBe(404);
  });

  it("returns 400 for an invalid size", async () => {
    mockLoadDocument.mockImplementation(async () => FAKE_ATTACHMENT);

    const encoded = makeEncodedIRI();
    const res = await mediaApp.request(`/${encoded}/thumb/huge`);

    expect(res.status).toBe(400);
    expect(mockBuildPicturiumUrl).not.toHaveBeenCalled();
  });

  it("returns 502 when picturium returns an error", async () => {
    mockLoadDocument.mockImplementation(async () => FAKE_ATTACHMENT);
    mockFetchFromPicturium.mockImplementation(
      async () => new Response("error", { status: 500 })
    );

    const encoded = makeEncodedIRI();
    const res = await mediaApp.request(`/${encoded}/thumb/small`);

    expect(res.status).toBe(502);
  });
});

describe("DELETE /api/media/:base64iri", () => {
  beforeEach(() => {
    mockLoadDocument.mockClear();
    mockUnlink.mockClear();
    mockRemoveDocument.mockClear();
  });

  it("deletes the file and SPARQL entity", async () => {
    mockLoadDocument.mockImplementation(async () => FAKE_ATTACHMENT);

    const encoded = makeEncodedIRI();
    const res = await mediaApp.request(`/${encoded}`, { method: "DELETE" });

    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.deleted).toBe(FAKE_ATTACHMENT["@id"]);
    expect(mockUnlink).toHaveBeenCalled();
    expect(mockRemoveDocument).toHaveBeenCalledWith("MediaAttachment", FAKE_ATTACHMENT["@id"]);
  });

  it("still removes SPARQL entity when file is already gone from disk", async () => {
    mockLoadDocument.mockImplementation(async () => FAKE_ATTACHMENT);
    mockUnlink.mockImplementation(async () => {
      throw new Error("ENOENT: no such file");
    });

    const encoded = makeEncodedIRI();
    const res = await mediaApp.request(`/${encoded}`, { method: "DELETE" });

    expect(res.status).toBe(200);
    expect(mockRemoveDocument).toHaveBeenCalled();
  });

  it("returns 404 when attachment does not exist", async () => {
    mockLoadDocument.mockImplementation(async () => null);

    const encoded = makeEncodedIRI();
    const res = await mediaApp.request(`/${encoded}`, { method: "DELETE" });

    expect(res.status).toBe(404);
  });
});
