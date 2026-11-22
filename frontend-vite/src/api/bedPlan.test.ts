import { describe, expect, test } from 'bun:test';
import { shapeFromWkt } from '../components/bed-planner/bedLayout';
import type { BedPlacement } from '../components/bed-planner/types';
import { lastSegment } from '../utils/iri';
import { placementDoc } from './bedPlan';

const planting = 'https://ontology.semantic-desk.top/garden#Planting/abc';

describe('placementDoc', () => {
  test('a single plant links the planting only and has no shape', () => {
    const p: BedPlacement = { iri: 'urn:p/1', plantingIri: planting, x: 120, y: 45 };
    const doc = placementDoc(p) as Record<string, unknown>;
    expect(doc['@id']).toBe('urn:p/1');
    expect(doc['@type']).toBe('https://ontology.semantic-desk.top/garden#PlantPlacement');
    expect(doc.planting).toEqual({ '@id': planting, '@type': 'https://ontology.semantic-desk.top/garden#Planting' });
    expect(doc.x).toBe(120);
    expect(doc.y).toBe(45);
    expect(doc.shape).toBeUndefined();
  });

  test('a row stores its shape as WKT that reads back the same', () => {
    const shape = { kind: 'line' as const, points: [{ x: 10, y: 20 }, { x: 200, y: 25 }] };
    const p: BedPlacement = { iri: 'urn:p/2', plantingIri: planting, x: 10, y: 20, shape, spacing: 20 };
    const doc = placementDoc(p) as Record<string, unknown>;
    expect(doc.shape).toBe('LINESTRING (10 20, 200 25)');
    expect(doc.spacing).toBe(20);
    expect(shapeFromWkt(doc.shape as string)).toEqual(shape);
  });

  test('keeps fields of the stored document that the planner does not know', () => {
    const p: BedPlacement = { iri: 'urn:p/3', plantingIri: planting, x: 1, y: 2 };
    const doc = placementDoc(p, { name: 'Knoblauch 3', notes: 'am Rand', x: 99 }) as Record<string, unknown>;
    expect(doc.name).toBe('Knoblauch 3');
    expect(doc.notes).toBe('am Rand');
    expect(doc.x).toBe(1);
  });
});

describe('lastSegment', () => {
  test('takes the last part of both bed namespaces', () => {
    expect(lastSegment('https://ontology.semantic-desk.top/garden#Patch/8vfrdlxuyq9')).toBe('8vfrdlxuyq9');
    expect(lastSegment('https://data.semantic-desk.top/garden/Patch/folientunnel-beet')).toBe('folientunnel-beet');
  });
});
