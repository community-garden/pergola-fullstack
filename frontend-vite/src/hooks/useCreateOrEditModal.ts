import NiceModal from "@ebay/nice-modal-react";
import { useAdbContext, useModalRegistry } from "@graviola/edb-state-hooks";
import { useCallback } from "react";

export const useCreateOrEditModal = () => {
  const { components: { EditEntityModal } } = useAdbContext();
  const { registerModal } = useModalRegistry(NiceModal);
  return useCallback((id: string, typeIRI: string, defaultData?: any) => {
    const modalID = `edit-${typeIRI}-${id}`;
    registerModal(modalID, EditEntityModal as any);
    NiceModal.show(modalID, {
      entityIRI: id,
      typeIRI,
      data: defaultData,
      disableLoad: true,
    });
  }, [registerModal]);
};
