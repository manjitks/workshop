import { z } from 'zod';

const shortText = z.string().trim().min(1).max(100);
export const projectSchema = z.strictObject({
  schemaVersion: z.literal(1),
  revision: z.number().int().min(1).max(Number.MAX_SAFE_INTEGER),
  name: shortText,
  objective: z.string().trim().min(1).max(1500),
  budgetInr: z.number().min(1).max(100000000),
});
export const partSchema = z.strictObject({
  id: z.string().min(1).max(100),
  name: shortText,
  spec: z.string().max(500),
  quantity: z.number().int().min(1).max(10000),
  unitPriceInr: z.number().min(0).max(100000000),
  selected: z.boolean(),
  priceSource: z.enum(['illustrative', 'manual']).optional(),
});
export const powerResultSchema = z
  .strictObject({
    modelVersion: z.literal('ideal-runtime/1'),
    projectRevision: z.number().int().min(1),
    inputs: z.strictObject({
      capacityAh: z.number().positive(),
      currentA: z.number().positive(),
      usableFraction: z.number().positive().max(1),
    }),
    seconds: z.number().positive(),
    evidence: z.literal('estimated'),
  })
  .refine((result) => {
    const expected =
      ((result.inputs.capacityAh * result.inputs.usableFraction) /
        result.inputs.currentA) *
      3600;
    return (
      Number.isFinite(expected) &&
      Math.abs(result.seconds - expected) <= Math.max(1e-8, expected * 1e-10)
    );
  }, 'Runtime result does not match its recorded inputs.');
export const projectFileSchema = z
  .strictObject({
    format: z.literal('open-workshop-project'),
    formatVersion: z.literal(1),
    id: z.string().uuid(),
    project: projectSchema,
    parts: z.array(partSchema).max(200),
    estimates: z.array(powerResultSchema).max(100),
    briefReviewed: z.boolean(),
    sampleProject: z.boolean(),
    updatedAt: z.string().datetime(),
  })
  .superRefine((file, ctx) => {
    if (new Set(file.parts.map((p) => p.id)).size !== file.parts.length)
      ctx.addIssue({
        code: 'custom',
        message: 'Duplicate component identifiers.',
      });
    if (file.estimates.some((r) => r.projectRevision > file.project.revision))
      ctx.addIssue({
        code: 'custom',
        message: 'An estimate refers to a future project revision.',
      });
  });
export type ProjectFile = z.infer<typeof projectFileSchema>;
export const MAX_PROJECT_BYTES = 1_000_000;
export function parseProjectFile(text: string): ProjectFile {
  if (new TextEncoder().encode(text).length > MAX_PROJECT_BYTES)
    throw new Error('Project exceeds the 1 MB limit.');
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    throw new Error('This file is not valid JSON.');
  }
  const result = projectFileSchema.safeParse(value);
  if (!result.success)
    throw new Error(
      'Unsupported or invalid project file. Expected Open Workshop format version 1 with valid inputs and results.',
    );
  return result.data;
}
