import { useState, useCallback } from 'react';

export type UploadStatus = 'idle' | 'uploading' | 'done' | 'error';

export interface UseImageUploadOptions {
  maxSizeBytes?: number;
  allowedTypes?: string[];
  apiBase?: string;
}

export interface UseImageUploadResult {
  status: UploadStatus;
  error: string | null;
  mediaIri: string | null;
  encodedIRI: string | null;
  upload: (file: File) => Promise<void>;
  reset: () => void;
}

const DEFAULT_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const DEFAULT_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const DEFAULT_API_BASE = '/api/media';

export function useImageUpload(opts: UseImageUploadOptions = {}): UseImageUploadResult {
  const {
    maxSizeBytes = DEFAULT_MAX_BYTES,
    allowedTypes = DEFAULT_ALLOWED_TYPES,
    apiBase = DEFAULT_API_BASE,
  } = opts;

  const [status, setStatus] = useState<UploadStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [mediaIri, setMediaIri] = useState<string | null>(null);
  const [encodedIRI, setEncodedIRI] = useState<string | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setMediaIri(null);
    setEncodedIRI(null);
  }, []);

  const upload = useCallback(
    async (file: File) => {
      setError(null);

      // Client-side validation
      if (!allowedTypes.includes(file.type)) {
        setError(`Unsupported file type: ${file.type}. Allowed: ${allowedTypes.join(', ')}`);
        setStatus('error');
        return;
      }
      if (file.size > maxSizeBytes) {
        setError(`File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Maximum: ${(maxSizeBytes / 1024 / 1024).toFixed(1)} MB`);
        setStatus('error');
        return;
      }

      setStatus('uploading');

      try {
        const fd = new FormData();
        fd.append('file', file);

        const res = await fetch(apiBase, { method: 'POST', body: fd });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? `Upload failed with status ${res.status}`);
        }

        const data = await res.json();
        setMediaIri(data['@id']);
        setEncodedIRI(data.encodedIRI);
        setStatus('done');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
        setStatus('error');
      }
    },
    [allowedTypes, maxSizeBytes, apiBase]
  );

  return { status, error, mediaIri, encodedIRI, upload, reset };
}
