import { describe, expect, it } from 'bun:test';
import { byNewest, editedNoteDoc, newNoteDoc, type BedNoteInfo } from './bedNotes';

const G = 'https://ontology.semantic-desk.top/garden#';

describe('newNoteDoc', () => {
  it('links the bed only and stamps date and author', () => {
    const doc = newNoteDoc('n1', 'p1', 'Reihen dünn säen', 'Alex', '2026-11-22T10:00:00.000Z');
    expect(doc.patch).toEqual({ '@id': 'p1', '@type': `${G}Patch` });
    expect(doc['@type']).toBe(`${G}BedNote`);
    expect(doc.createdAt).toBe('2026-11-22T10:00:00.000Z');
    expect(doc.createdBy).toBe('Alex');
    expect('modifiedAt' in doc).toBe(false);
  });

  it('leaves the author out without a login', () => {
    const doc = newNoteDoc('n1', 'p1', 'x', undefined, '2026-11-22T10:00:00.000Z');
    expect('createdBy' in doc).toBe(false);
  });
});

describe('editedNoteDoc', () => {
  const stored = {
    '@id': 'n1',
    '@type': `${G}BedNote`,
    patch: { '@id': 'p1' },
    text: 'alt',
    createdAt: '2026-11-22T10:00:00.000Z',
    createdBy: 'Alex',
    extra: 'bleibt',
  };

  it('keeps creation and unknown fields, sets the change', () => {
    const doc = editedNoteDoc(stored, 'neu', 'Kim', '2026-11-23T08:00:00.000Z');
    expect(doc.text).toBe('neu');
    expect(doc.createdAt).toBe(stored.createdAt);
    expect(doc.createdBy).toBe('Alex');
    expect(doc.modifiedAt).toBe('2026-11-23T08:00:00.000Z');
    expect(doc.modifiedBy).toBe('Kim');
    expect((doc as Record<string, unknown>).extra).toBe('bleibt');
    expect(doc.patch).toEqual({ '@id': 'p1' });
  });
});

describe('byNewest', () => {
  it('sorts the newest first, undated last', () => {
    const n = (iri: string, createdAt?: string): BedNoteInfo => ({ iri, patchIri: 'p', text: 't', createdAt });
    const sorted = [n('old', '2026-01-01'), n('none'), n('new', '2026-06-01')].sort(byNewest);
    expect(sorted.map((x) => x.iri)).toEqual(['new', 'old', 'none']);
  });
});
