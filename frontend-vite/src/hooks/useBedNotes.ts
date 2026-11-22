import { useCallback, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAdbContext } from '@graviola/edb-state-hooks';
import { useAuth } from '@auth/index';
import {
  NOTES_QUERY_KEY,
  editedNoteDoc,
  fetchNotes,
  newNoteDoc,
} from '../api/bedNotes';
import { toReferences } from '../utils/toReferences';
import { usePergolaStore } from './usePergolaStore';

export interface BedNotesApi {
  addNote: (patchIri: string, text: string) => Promise<void>;
  updateNote: (iri: string, text: string) => Promise<void>;
  removeNote: (iri: string) => Promise<void>;
}

/**
 * Notes on a bed (Markdown). Everybody may change every note; date and
 * author (name from the login, none without one) are set on write.
 */
export const useBedNotes = () => {
  const { store, ready } = usePergolaStore();
  const { createEntityIRI } = useAdbContext();
  const queryClient = useQueryClient();
  const { isAuthenticated, user } = useAuth();
  const userName = isAuthenticated ? (user?.profile?.name as string | undefined) : undefined;
  const [error, setError] = useState<string>();

  const query = useQuery({
    queryKey: NOTES_QUERY_KEY,
    enabled: Boolean(ready && store),
    staleTime: 30_000,
    queryFn: () => fetchNotes(store!),
  });

  const run = useCallback(
    async (write: () => Promise<unknown>) => {
      try {
        await write();
        setError(undefined);
      } catch (e) {
        console.error('Bed notes: saving failed', e);
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        await queryClient.invalidateQueries({ queryKey: NOTES_QUERY_KEY });
      }
    },
    [queryClient],
  );

  const api = useMemo<BedNotesApi>(
    () => ({
      addNote: (patchIri, text) =>
        run(async () => {
          if (!store) throw new Error('DataStore not ready');
          const iri = createEntityIRI('BedNote');
          await store.upsert('BedNote', iri, newNoteDoc(iri, patchIri, text, userName, new Date().toISOString()) as never);
        }),
      updateNote: (iri, text) =>
        run(async () => {
          if (!store) throw new Error('DataStore not ready');
          const stored = (await store.loadOne('BedNote', iri)) as Record<string, unknown> | null;
          if (!stored) throw new Error('Note not found');
          await store.upsert(
            'BedNote',
            iri,
            editedNoteDoc(toReferences(stored), text, userName, new Date().toISOString()) as never,
          );
        }),
      removeNote: (iri) =>
        run(async () => {
          await store?.remove('BedNote', iri);
        }),
    }),
    [createEntityIRI, run, store, userName],
  );

  /** the notes of one bed, newest first */
  const notesOfBed = useCallback(
    (patchIri: string | undefined) => (query.data ?? []).filter((n) => n.patchIri === patchIri),
    [query.data],
  );

  return {
    notes: query.data ?? [],
    notesOfBed,
    isLoading: query.isLoading,
    api,
    userName,
    error,
    clearError: () => setError(undefined),
  };
};
