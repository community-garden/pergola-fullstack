import { Suspense, lazy, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
    Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { MDEditorMarkdown } from '@graviola/edb-markdown-renderer';
import '@uiw/react-md-editor/markdown-editor.css';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSanitize from 'rehype-sanitize';
import type { BedNoteInfo } from '../../api/bedNotes';
import { useDateFnsLocale } from '../../hooks/useDateFnsLocale';

/** the editor is only needed once a note is written: load it lazily like Graviola does */
const MDEditor = lazy(() => import('@uiw/react-md-editor'));

const REHYPE_PLUGINS = [rehypeSanitize, [rehypeExternalLinks, { target: '_blank' }]] as never;

export interface BedNotesApiLike {
  addNote: (text: string) => Promise<void>;
  updateNote: (iri: string, text: string) => Promise<void>;
  removeNote: (iri: string) => Promise<void>;
}

export interface BedNotesPanelProps {
  /** notes of the bed, newest first */
  notes: BedNoteInfo[];
  api: BedNotesApiLike;
}

const MetaLine = ({ note }: { note: BedNoteInfo }) => {
  const { t } = useTranslation('garden');
  const locale = useDateFnsLocale();
  const when = (iso?: string) => (iso ? format(new Date(iso), 'P p', { locale }) : '');
  const written = [when(note.createdAt), note.createdBy].filter(Boolean).join(' · ');
  const edited = note.modifiedAt
    ? t('bedNotes.edited', { date: when(note.modifiedAt), name: note.modifiedBy ?? '–' })
    : '';
  return (
    <Typography variant="caption" color="text.secondary" data-testid="bed-note-meta">
      {[written, edited].filter(Boolean).join(' · ')}
    </Typography>
  );
};

const Editor = ({
  value,
  onChange,
  testId,
}: {
  value: string;
  onChange: (v: string) => void;
  testId: string;
}) => (
  <Box data-color-mode="light" data-testid={testId}>
    <Suspense fallback={null}>
    <MDEditor
      value={value}
      onChange={(v?: string) => onChange(v ?? '')}
      preview="edit"
      height={160}
      visibleDragbar={false}
      textareaProps={{ 'aria-label': testId } as never}
    />
    </Suspense>
  </Box>
);

/**
 * Markdown notes of one bed, newest first: write a new one, edit or delete the existing
 * ones (everybody may). Pure presentation — notes and writes come in as props.
 */
export const BedNotesPanel = ({ notes, api }: BedNotesPanelProps) => {
  const { t } = useTranslation('garden');
  const [draft, setDraft] = useState('');
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<{ iri: string; text: string }>();

  const run = async (write: () => Promise<void>) => {
    setSaving(true);
    try {
      await write();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack spacing={1.5} sx={{ p: 1.5, height: '100%', overflowY: 'auto', overflowX: 'hidden', bgcolor: 'background.paper' }} data-testid="bed-notes">
      <Typography variant="subtitle1">{t('bedNotes.title')}</Typography>
      {
        <>
          <Editor value={draft} onChange={setDraft} testId="bed-note-new" />
          <Box>
            <Button
              variant="contained"
              size="small"
              disabled={saving || draft.trim() === ''}
              onClick={() =>
                void run(async () => {
                  await api.addNote(draft.trim());
                  setDraft('');
                })
              }
              data-testid="bed-note-save-new"
            >
              {t('bedNotes.save')}
            </Button>
          </Box>

          {notes.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              {t('bedNotes.empty')}
            </Typography>
          )}
          {notes.map((note) => (
            <Paper key={note.iri} variant="outlined" sx={{ p: 1.5 }} data-testid="bed-note" data-iri={note.iri}>
              {editing?.iri === note.iri ? (
                <Stack spacing={1}>
                  <Editor
                    value={editing.text}
                    onChange={(text) => setEditing({ iri: note.iri, text })}
                    testId="bed-note-edit"
                  />
                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant="contained"
                      disabled={saving || editing.text.trim() === ''}
                      onClick={() =>
                        void run(async () => {
                          await api.updateNote(note.iri, editing.text.trim());
                          setEditing(undefined);
                        })
                      }
                      data-testid="bed-note-save-edit"
                    >
                      {t('bedNotes.save')}
                    </Button>
                    <Button size="small" onClick={() => setEditing(undefined)}>
                      {t('bedNotes.cancel')}
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <>
                  <Box data-color-mode="light" sx={{ '& .wmde-markdown': { bgcolor: 'transparent', fontSize: '0.9rem' } }}>
                    <MDEditorMarkdown source={note.text} rehypePlugins={REHYPE_PLUGINS} />
                  </Box>
                  <Stack direction="row" alignItems="center" sx={{ mt: 0.5 }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <MetaLine note={note} />
                    </Box>
                    <Tooltip title={t('bedNotes.edit')}>
                      <IconButton
                        size="small"
                        aria-label={t('bedNotes.edit')}
                        onClick={() => setEditing({ iri: note.iri, text: note.text })}
                        data-testid="bed-note-edit-button"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t('bedNotes.delete')}>
                      <IconButton
                        size="small"
                        aria-label={t('bedNotes.delete')}
                        onClick={() => {
                          if (window.confirm(t('bedNotes.confirmDelete'))) void run(() => api.removeNote(note.iri));
                        }}
                        data-testid="bed-note-delete"
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </>
              )}
            </Paper>
          ))}
        </>
      }
    </Stack>
  );
};
