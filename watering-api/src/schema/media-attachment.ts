import { z } from "zod";
import type { JSONSchema7 } from "json-schema";
import { ONTOLOGY, DATA_BASE } from "./watering-availability";

export { ONTOLOGY, DATA_BASE };

export const MediaAttachmentTypeIRI = `${ONTOLOGY}MediaAttachment`;

export function mediaAttachmentIRI(uuid: string): string {
  return `${DATA_BASE}Media/${uuid}`;
}

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
  "application/pdf",
] as const;

export type AllowedMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export const MIME_TO_EXT: Record<AllowedMimeType, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
  "application/pdf": "pdf",
};

export interface MediaAttachment {
  "@id": string;
  "@type": string;
  /** Original filename — used as Graviola label */
  name: string;
  /** Relative path within the media volume, e.g. "uploads/abc123.jpg" */
  storedPath: string;
  mimeType: string;
  /** File size in bytes */
  fileSize: number;
  uploadedAt: string;
  altText?: string;
  copyright?: string;
  width?: number;
  height?: number;
  /** Optional reference to the entity this attachment belongs to */
  attachedTo?: { "@id": string };
}

export const MediaUploadMetadataSchema = z.object({
  altText: z.string().optional(),
  copyright: z.string().optional(),
  attachedTo: z.string().url().optional(),
});

export type MediaUploadMetadata = z.infer<typeof MediaUploadMetadataSchema>;

export const MediaAttachmentJsonSchema: JSONSchema7 = {
  type: "object",
  definitions: {
    MediaAttachment: {
      type: "object",
      title: "Media Attachment",
      properties: {
        "@id": { type: "string" },
        "@type": { type: "string", const: MediaAttachmentTypeIRI },
        name: { type: "string", title: "File name" },
        storedPath: { type: "string", title: "Stored path" },
        mimeType: { type: "string", title: "MIME type" },
        fileSize: { type: "integer", title: "File size (bytes)" },
        uploadedAt: { type: "string", format: "date-time", title: "Uploaded at" },
        altText: { type: "string", title: "Alt text" },
        copyright: { type: "string", title: "Copyright" },
        width: { type: "integer", title: "Width (px)" },
        height: { type: "integer", title: "Height (px)" },
        attachedTo: {
          type: "object",
          title: "Attached to",
          properties: {
            "@id": { type: "string" },
          },
          required: ["@id"],
        },
      },
      required: ["@id", "@type", "name", "storedPath", "mimeType", "fileSize", "uploadedAt"],
      additionalProperties: true,
    },
  },
};
