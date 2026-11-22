import { useCallback } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import {
  MODAL_EDIT_ENTITY,
  useAdbContext,
  useCRUDWithQueryClient,
  useDispatchIntent,
  useGraviolaModal,
  useTypeIRIFromEntity,
} from '@graviola/edb-state-hooks';
import type { EntityDetailModalProps } from '@graviola/semantic-jsonform-types';
import { queryOptionMixinBasedOnEntity } from '@graviola/edb-ui-utils';
import { EntityDetailDialog } from './EntityDetailDialog';

const ORIGIN = { source: 'pergola:EntityDetailModal' };

type LoaderProps = Omit<EntityDetailModalProps, 'onClose' | 'typeIRI'> & {
  typeIRI?: string;
  onClose: () => void;
};

/** Loads the entity once its type is known; "Edit" opens Graviola's edit dialog on top. */
const EntityDetailLoader = ({
  classIRI,
  entityIRI,
  data: defaultData,
  disableLoad,
  readonly,
  disableInlineEditing,
  onClose,
}: Omit<LoaderProps, 'typeIRI'> & { classIRI: string }) => {
  const { typeIRIToTypeName } = useAdbContext();
  const typeName = typeIRIToTypeName(classIRI);
  const dispatchIntent = useDispatchIntent();
  const editModal = useGraviolaModal(MODAL_EDIT_ENTITY);

  const { loadQuery } = useCRUDWithQueryClient({
    entityIRI,
    typeIRI: classIRI,
    loadQueryKey: 'show',
    queryOptions: {
      enabled: !disableLoad,
      refetchOnMount: disableLoad ? false : 'always',
      refetchOnWindowFocus: !disableLoad,
      ...queryOptionMixinBasedOnEntity(defaultData),
    },
  });
  const data = (loadQuery.data?.document ?? defaultData) as Record<string, unknown> | undefined;

  const edit = useCallback(() => {
    if (disableInlineEditing) {
      void dispatchIntent({ kind: 'edit-entity', typeName, entityIRI, origin: ORIGIN });
      return;
    }
    editModal
      .show({ entityIRI, typeIRI: classIRI, data, disableLoad: true }, { origin: ORIGIN })
      .catch(() => undefined); // cancelled
  }, [classIRI, data, disableInlineEditing, dispatchIntent, editModal, entityIRI, typeName]);

  return (
    <EntityDetailDialog
      entityIRI={entityIRI}
      typeIRI={classIRI}
      typeName={typeName}
      data={data}
      onClose={onClose}
      onEdit={readonly ? undefined : edit}
    />
  );
};

const EntityDetailTypeResolver = ({ typeIRI, entityIRI, disableLoad, onClose, ...rest }: LoaderProps) => {
  const classIRI = useTypeIRIFromEntity(entityIRI, typeIRI, disableLoad) as string | undefined;
  // the dialog shows its skeleton until the type is resolved
  if (!classIRI) return <EntityDetailDialog entityIRI={entityIRI} onClose={onClose} />;
  return (
    <EntityDetailLoader
      classIRI={classIRI}
      entityIRI={entityIRI}
      disableLoad={disableLoad}
      onClose={onClose}
      {...rest}
    />
  );
};

/**
 * Pergola's detail modal, registered as Graviola's `MODAL_ENTITY_DETAIL`
 * (GraviolaProvider): the same contract as Graviola's `EntityDetailModal`, but
 * rendered by `EntityDetailDialog` — no large side image, just the card with
 * the image on top.
 */
export const PergolaEntityDetailModal = NiceModal.create(
  ({ onClose: onCloseFromProps, ...props }: EntityDetailModalProps) => {
    const modal = useModal();
    const close = useCallback(() => {
      if (onCloseFromProps) onCloseFromProps();
      else void modal.remove();
    }, [modal, onCloseFromProps]);

    if (!modal.visible) return null;
    return <EntityDetailTypeResolver {...props} onClose={close} />;
  },
);
