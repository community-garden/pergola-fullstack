import { describe, it, expect } from "bun:test";
import {
  generatePicturiumToken,
  buildPicturiumUrl,
  isValidThumbnailSize,
  THUMB_PIXEL_WIDTHS,
} from "./index";

describe("generatePicturiumToken", () => {
  it("produces a deterministic hex string for known inputs", async () => {
    const token = await generatePicturiumToken(
      "uploads/abc.jpg",
      { w: "320", f: "auto" },
      "test-secret"
    );
    // Verify it's a 64-char hex string (SHA-256 = 32 bytes = 64 hex chars)
    expect(token).toMatch(/^[0-9a-f]{64}$/);
    // Same inputs must produce the same token
    const token2 = await generatePicturiumToken(
      "uploads/abc.jpg",
      { w: "320", f: "auto" },
      "test-secret"
    );
    expect(token).toBe(token2);
  });

  it("sorts params alphabetically before signing", async () => {
    // Params in different order should produce the same token
    const t1 = await generatePicturiumToken("uploads/x.jpg", { w: "128", f: "auto" }, "k");
    const t2 = await generatePicturiumToken("uploads/x.jpg", { f: "auto", w: "128" }, "k");
    expect(t1).toBe(t2);
  });

  it("excludes the 'token' param from the signed string", async () => {
    const withToken = await generatePicturiumToken(
      "uploads/x.jpg",
      { w: "128", token: "old-token", f: "auto" },
      "k"
    );
    const withoutToken = await generatePicturiumToken(
      "uploads/x.jpg",
      { w: "128", f: "auto" },
      "k"
    );
    expect(withToken).toBe(withoutToken);
  });

  it("produces different tokens for different keys", async () => {
    const t1 = await generatePicturiumToken("uploads/x.jpg", { w: "320" }, "key-a");
    const t2 = await generatePicturiumToken("uploads/x.jpg", { w: "320" }, "key-b");
    expect(t1).not.toBe(t2);
  });

  it("produces different tokens for different paths", async () => {
    const t1 = await generatePicturiumToken("uploads/a.jpg", { w: "320" }, "key");
    const t2 = await generatePicturiumToken("uploads/b.jpg", { w: "320" }, "key");
    expect(t1).not.toBe(t2);
  });
});

describe("buildPicturiumUrl", () => {
  it("returns a URL with w, f, and token params", async () => {
    const url = await buildPicturiumUrl(
      "http://picturium:20045",
      "uploads/abc.jpg",
      "medium",
      "secret"
    );
    expect(url).toMatch(/^http:\/\/picturium:20045\/uploads\/abc\.jpg\?/);
    expect(url).toContain(`w=${THUMB_PIXEL_WIDTHS.medium}`);
    expect(url).toContain("f=auto");
    expect(url).toContain("token=");
  });

  it("uses the correct pixel width for each size", async () => {
    for (const [size, px] of Object.entries(THUMB_PIXEL_WIDTHS)) {
      const url = await buildPicturiumUrl("http://p", "f.jpg", size as keyof typeof THUMB_PIXEL_WIDTHS, "k");
      expect(url).toContain(`w=${px}`);
    }
  });
});

describe("isValidThumbnailSize", () => {
  it("accepts all defined sizes", () => {
    for (const size of Object.keys(THUMB_PIXEL_WIDTHS)) {
      expect(isValidThumbnailSize(size)).toBe(true);
    }
  });

  it("rejects unknown sizes", () => {
    expect(isValidThumbnailSize("huge")).toBe(false);
    expect(isValidThumbnailSize("")).toBe(false);
    expect(isValidThumbnailSize("320")).toBe(false);
  });
});
