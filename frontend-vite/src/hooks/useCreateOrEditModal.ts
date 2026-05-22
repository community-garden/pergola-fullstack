import { useGraviolaModal, MODAL_EDIT_ENTITY } from "@graviola/edb-state-hooks";
import { useCallback } from "react";

export const useCreateOrEditModal = () => {
  const editModal = useGraviolaModal(MODAL_EDIT_ENTITY);
  return useCallback((id: string, typeIRI: string, defaultData?: any) => {
    void editModal.show({ entityIRI: id, typeIRI, data: defaultData, disableLoad: true });
  }, [editModal]);
};
