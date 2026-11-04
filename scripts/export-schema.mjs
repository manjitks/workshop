import { writeFile } from 'node:fs/promises';
import { z } from 'zod';
import { projectFileSchema } from '../packages/contracts/src/project-file.ts';
const schema = z.toJSONSchema(projectFileSchema);
schema.$id = 'urn:open-workshop:project:1';
schema.description =
  'Portable project format v1. Runtime validation additionally checks unique part IDs, result/input consistency, and revision ordering. No secrets or device permissions belong in this file.';
await writeFile(
  new URL('../schemas/project-v1.schema.json', import.meta.url),
  `${JSON.stringify(schema, null, 2)}\n`,
);
