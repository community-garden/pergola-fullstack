import { useGraviolaModal, MODAL_EDIT_ENTITY } from "@graviola/edb-state-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { SEASON_QUERY_KEY } from "../api/season";

/**
 * Opens the Graviola edit dialog. The returned promise resolves after the
 * entity was saved and rejects when the dialog is cancelled.
 *
 * After saving, the season queries (beds, plantings, plants with their
 * icons and images, feature names) are refetched, so the map and the
 * timeline show the change right away.
 */
export const useCreateOrEditModal = () => {
  const editModal = useGraviolaModal(MODAL_EDIT_ENTITY);
  const queryClient = useQueryClient();
  return useCallback(
    async (id: string, typeIRI: string, defaultData?: any) => {
      const result = await editModal.show({ entityIRI: id, typeIRI, data: defaultData, disableLoad: Boolean(defaultData) });
      void queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEY });
      return result;
    },
    [editModal, queryClient],
  );
};
