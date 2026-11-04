import { describe, expect, it } from 'vitest';
import {
  estimateRuntime,
  initialParts,
  initialProject,
  subtotal,
  updateBrief,
} from './domain';
describe('independent domain rules', () => {
  it('matches the analytical case: 1 Ah at 1 A lasts 3600 seconds', () => {
    expect(
      estimateRuntime({ capacityAh: 1, currentA: 1, usableFraction: 1 }, 1)
        .seconds,
    ).toBe(3600);
  });
  it('applies usable capacity and copies provenance inputs', () => {
    const inputs = { capacityAh: 2, currentA: 0.02, usableFraction: 0.8 };
    const result = estimateRuntime(inputs, 3);
    inputs.capacityAh = 4;
    expect(result.seconds).toBe(288000);
    expect(result.inputs.capacityAh).toBe(2);
    expect(result.projectRevision).toBe(3);
  });
  it.each([0, -1, NaN, Infinity])('rejects invalid current %s', (currentA) => {
    expect(() =>
      estimateRuntime({ capacityAh: 2, currentA, usableFraction: 0.8 }, 1),
    ).toThrow();
  });
  it('rejects capacity fractions outside the model', () => {
    expect(() =>
      estimateRuntime({ capacityAh: 2, currentA: 1, usableFraction: 1.2 }, 1),
    ).toThrow();
  });
  it('omits unselected parts without mutating inventory', () => {
    expect(subtotal(initialParts)).toBe(1890);
    expect(subtotal(initialParts.map((p) => ({ ...p, selected: false })))).toBe(
      0,
    );
    expect(initialParts.every((p) => p.selected)).toBe(true);
  });
  it('updates revision and rejects missing budget or objective', () => {
    expect(
      updateBrief(initialProject, 'New', 'Build something', 2000).revision,
    ).toBe(2);
    expect(() => updateBrief(initialProject, 'New', '', 2000)).toThrow();
    expect(() => updateBrief(initialProject, 'New', 'Build', NaN)).toThrow();
  });
});
