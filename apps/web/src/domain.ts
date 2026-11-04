import type {
  Part,
  PowerInputs,
  PowerResult,
  Project,
  ProjectFile,
} from '@workshop/contracts';

export const initialProject: Project = {
  schemaVersion: 1,
  revision: 1,
  name: 'Greenhouse field station',
  objective:
    'A small, repairable station that records temperature and humidity, without an internet connection.',
  budgetInr: 3000,
};
export const initialParts: Part[] = [
  {
    id: 'controller',
    name: 'Microcontroller board',
    spec: 'Low-power board · exact variant to select',
    quantity: 1,
    unitPriceInr: 480,
    selected: true,
  },
  {
    id: 'sensor',
    name: 'Temperature + humidity sensor',
    spec: 'Digital interface · accuracy unverified',
    quantity: 1,
    unitPriceInr: 350,
    selected: true,
  },
  {
    id: 'battery',
    name: 'Battery + protection module',
    spec: 'Capacity and charging circuit to verify',
    quantity: 1,
    unitPriceInr: 620,
    selected: true,
  },
  {
    id: 'enclosure',
    name: 'Ventilated enclosure',
    spec: 'Concept only · no weatherproof rating',
    quantity: 1,
    unitPriceInr: 280,
    selected: true,
  },
  {
    id: 'hardware',
    name: 'Fasteners + connections',
    spec: 'Illustrative pack · dimensions unknown',
    quantity: 1,
    unitPriceInr: 160,
    selected: true,
  },
];
export function subtotal(parts: readonly Part[]): number {
  return parts
    .filter((p) => p.selected)
    .reduce((sum, p) => sum + p.quantity * p.unitPriceInr, 0);
}
export function updateBrief(
  project: Project,
  name: string,
  objective: string,
  budgetInr: number,
): Project {
  if (
    !name.trim() ||
    !objective.trim() ||
    !Number.isFinite(budgetInr) ||
    budgetInr <= 0 ||
    budgetInr > 100000000
  )
    throw new Error(
      'Enter a name, an objective, and a budget between ₹1 and ₹100,000,000.',
    );
  return {
    ...project,
    name: name.trim(),
    objective: objective.trim(),
    budgetInr,
    revision: project.revision + 1,
  };
}
export function estimateRuntime(
  inputs: PowerInputs,
  projectRevision: number,
): PowerResult {
  const { capacityAh, currentA, usableFraction } = inputs;
  if (
    ![capacityAh, currentA, usableFraction].every(Number.isFinite) ||
    capacityAh <= 0 ||
    currentA <= 0 ||
    usableFraction <= 0 ||
    usableFraction > 1
  )
    throw new Error(
      'Capacity and current must be positive. Usable fraction must be greater than 0 and at most 1.',
    );
  const seconds = ((capacityAh * usableFraction) / currentA) * 3600;
  if (!Number.isFinite(seconds))
    throw new Error('These inputs exceed the numerical range of this model.');
  return {
    inputs: { ...inputs },
    projectRevision,
    seconds,
    modelVersion: 'ideal-runtime/1',
    evidence: 'estimated',
  };
}
export const inr = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);

export function newProject(sample = false): ProjectFile {
  return {
    format: 'open-workshop-project',
    formatVersion: 1,
    id: crypto.randomUUID(),
    project: sample
      ? { ...initialProject }
      : {
          schemaVersion: 1,
          revision: 1,
          name: 'Untitled project',
          objective: 'Describe the problem you want to solve.',
          budgetInr: 3000,
        },
    parts: sample ? initialParts.map((p) => ({ ...p })) : [],
    estimates: [],
    briefReviewed: false,
    sampleProject: sample,
    updatedAt: new Date().toISOString(),
  };
}
