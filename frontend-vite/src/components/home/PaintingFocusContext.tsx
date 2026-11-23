import { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type PaintingFocusMode = 'closed' | 'hover' | 'pinned';

interface PaintingFocusContextValue {
  mode: PaintingFocusMode;
  setMode: (mode: PaintingFocusMode) => void;
  close: () => void;
}

const PaintingFocusContext = createContext<PaintingFocusContextValue | null>(null);

export const PaintingFocusProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<PaintingFocusMode>('closed');
  const close = useCallback(() => setMode('closed'), []);

  const value = useMemo(
    () => ({
      mode,
      setMode,
      close,
    }),
    [mode, close],
  );

  return (
    <PaintingFocusContext.Provider value={value}>{children}</PaintingFocusContext.Provider>
  );
};

export const usePaintingFocus = () => {
  const ctx = useContext(PaintingFocusContext);
  if (!ctx) {
    throw new Error('usePaintingFocus must be used within PaintingFocusProvider');
  }
  return ctx;
};