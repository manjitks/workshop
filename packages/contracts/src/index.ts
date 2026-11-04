/** Transport-only contracts. No React, database, or device dependencies. */
export type Capability =
  | 'cad.preview'
  | 'physics.estimate'
  | 'parts.search'
  | 'firmware.build'
  | 'device.flash';
export type Permission =
  'project.read' | 'project.write' | 'network' | 'device.write';
export interface AdapterManifest {
  id: string;
  contractVersion: 1;
  name: string;
  capability: Capability;
  permissions: readonly Permission[];
  availability: 'planned' | 'ready' | 'unavailable';
  upstream: string;
  description: string;
}
export interface Project {
  schemaVersion: 1;
  revision: number;
  name: string;
  objective: string;
  budgetInr: number;
}
export interface Part {
  id: string;
  name: string;
  spec: string;
  quantity: number;
  unitPriceInr: number;
  selected: boolean;
  priceSource?: 'illustrative' | 'manual';
}
export interface PowerInputs {
  capacityAh: number;
  currentA: number;
  usableFraction: number;
}
export interface PowerResult {
  modelVersion: 'ideal-runtime/1';
  projectRevision: number;
  inputs: PowerInputs;
  seconds: number;
  evidence: 'estimated';
}
/** A future adapter implements this without depending on a UI or storage engine. */
export interface Adapter<I, O> {
  manifest: AdapterManifest;
  execute(
    input: I,
    context: { signal: AbortSignal; grantedPermissions: readonly Permission[] },
  ): Promise<O>;
}

export {
  projectFileSchema,
  partSchema,
  parseProjectFile,
  MAX_PROJECT_BYTES,
} from './project-file';
export type { ProjectFile } from './project-file';
