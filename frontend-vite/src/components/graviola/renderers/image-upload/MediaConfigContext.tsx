import React, { createContext, useContext } from 'react';

export interface MediaConfig {
  /** Base URL for the media API, e.g. "/api/media" or "https://dev01.example.com/api/media" */
  mediaApiBase: string;
}

const DEFAULT_MEDIA_API_BASE =
  (import.meta.env.VITE_MEDIA_API_URL as string | undefined) ?? '/api/media';

const MediaConfigContext = createContext<MediaConfig>({
  mediaApiBase: DEFAULT_MEDIA_API_BASE,
});

export const MediaConfigProvider: React.FC<{
  mediaApiBase?: string;
  children: React.ReactNode;
}> = ({ mediaApiBase = DEFAULT_MEDIA_API_BASE, children }) => (
  <MediaConfigContext.Provider value={{ mediaApiBase }}>
    {children}
  </MediaConfigContext.Provider>
);

export const useMediaConfig = (): MediaConfig => useContext(MediaConfigContext);
