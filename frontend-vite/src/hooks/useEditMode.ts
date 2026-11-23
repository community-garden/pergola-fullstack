import { useCallback, useState } from 'react';

/**
 * Edit mode for planners: off by default, deliberately not persisted — every
 * visit starts read-only, so a stray click or drag cannot change a plan.
 */
export const useEditMode = (initial = false) => {
  const [editMode, setEditMode] = useState(initial);
  const toggleEditMode = useCallback(() => setEditMode((v) => !v), []);
  return { editMode, setEditMode, toggleEditMode };
};
