import { describe, expect, it } from 'vitest';
import { parseProjectFile } from '@workshop/contracts';
import { newProject } from './domain';
import { estimateRuntime } from './domain';
import { browserProjectRepository } from './storage';

describe('project file boundary', () => {
  it('round-trips project data and evidence', () => {
    const file = newProject(true);
    file.estimates.push(
      estimateRuntime(
        { capacityAh: 2, currentA: 0.02, usableFraction: 0.8 },
        1,
      ),
    );
    expect(parseProjectFile(JSON.stringify(file))).toEqual(file);
  });
  it('rejects unknown versions and unknown fields rather than silently dropping data', () => {
    expect(() =>
      parseProjectFile(JSON.stringify({ ...newProject(), formatVersion: 99 })),
    ).toThrow();
    expect(() =>
      parseProjectFile(
        JSON.stringify({ ...newProject(), apiKey: 'never-store-this' }),
      ),
    ).toThrow();
  });
  it('rejects negative costs, duplicate parts, and tampered scientific outputs', () => {
    const file = newProject(true);
    file.parts[0].unitPriceInr = -1;
    expect(() => parseProjectFile(JSON.stringify(file))).toThrow();
    file.parts[0].unitPriceInr = 1;
    file.parts.push({ ...file.parts[0] });
    expect(() => parseProjectFile(JSON.stringify(file))).toThrow();
    file.parts.pop();
    file.estimates = [
      {
        ...estimateRuntime(
          { capacityAh: 1, currentA: 1, usableFraction: 1 },
          1,
        ),
        seconds: 999,
      },
    ];
    expect(() => parseProjectFile(JSON.stringify(file))).toThrow();
  });
  it('rejects huge, malformed, or future-revision evidence', () => {
    expect(() => parseProjectFile('x'.repeat(1000001))).toThrow(/limit/);
    expect(() => parseProjectFile('{')).toThrow(/JSON/);
    const file = newProject();
    file.estimates = [
      estimateRuntime({ capacityAh: 1, currentA: 1, usableFraction: 1 }, 2),
    ];
    expect(() => parseProjectFile(JSON.stringify(file))).toThrow();
  });
});
describe('replaceable project repository', () => {
  it('saves and reopens independent projects', () => {
    const repository = browserProjectRepository(localStorage);
    const a = newProject();
    const b = newProject(true);
    repository.save(a);
    repository.save(b);
    expect(repository.list()).toHaveLength(2);
    expect(repository.list().find((p) => p.id === a.id)).toEqual(a);
  });
  it('preserves damaged storage rather than silently replacing it', () => {
    const key = 'open-workshop:project:v1:damaged';
    localStorage.setItem(key, 'broken');
    expect(() => browserProjectRepository(localStorage).list()).toThrow();
    expect(localStorage.getItem(key)).toBe('broken');
  });
  it('surfaces quota failures', () => {
    const storage = {
      length: 0,
      key: () => null,
      getItem: () => null,
      setItem: () => {
        throw new Error('Quota exceeded');
      },
    } as unknown as Storage;
    expect(() => browserProjectRepository(storage).save(newProject())).toThrow(
      'Quota exceeded',
    );
  });
});
