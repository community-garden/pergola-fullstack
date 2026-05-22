/**
 * Picturium proxy client — pure module, no Hono or store dependencies.
 * Can be extracted to a shared package for reuse in other services.
 *
 * Picturium token convention:
 *   HMAC-SHA256( path + "?" + alphabetically_sorted_params_excluding_token, secretKey )
 */

export type ThumbnailSize = "icon" | "small" | "medium" | "large" | "xlarge";

export const THUMB_PIXEL_WIDTHS: Record<ThumbnailSize, number> = {
  icon: 64,
  small: 128,
  medium: 320,
  large: 640,
  xlarge: 1200,
};

export const VALID_SIZES = Object.keys(THUMB_PIXEL_WIDTHS) as ThumbnailSize[];

export function isValidThumbnailSize(s: string): s is ThumbnailSize {
  return VALID_SIZES.includes(s as ThumbnailSize);
}

/**
 * Generate an HMAC-SHA256 token for picturium request authorization.
 * Uses the Web Crypto API (available in Bun, Deno, modern Node).
 */
export async function generatePicturiumToken(
  path: string,
  params: Record<string, string>,
  key: string
): Promise<string> {
  const sortedParams = Object.entries(params)
    .filter(([k]) => k !== "token")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const message = `${path}?${sortedParams}`;

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, new TextEncoder().encode(message));

  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Build a full picturium URL for the given stored path and thumbnail size,
 * including the HMAC token required for authorization.
 */
export async function buildPicturiumUrl(
  baseUrl: string,
  storedPath: string,
  size: ThumbnailSize,
  key: string
): Promise<string> {
  const w = String(THUMB_PIXEL_WIDTHS[size]);
  const params: Record<string, string> = { f: "auto", w };
  const token = await generatePicturiumToken(storedPath, params, key);
  const qs = new URLSearchParams({ ...params, token }).toString();
  return `${baseUrl}/${storedPath}?${qs}`;
}

/**
 * Proxy a request to picturium and return the raw Response for streaming.
 */
export async function fetchFromPicturium(url: string): Promise<Response> {
  return fetch(url);
}
