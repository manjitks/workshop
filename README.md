# Open Workshop

A local engineering workspace for developing an idea, examining assumptions, planning parts, and preserving evidence.

**Phase 1 is implemented:** interactive sample assembly, new projects, project library, local saves, validated import/export, power estimates with history, and manual parts budgeting. Real CAD, physics tools, live sourcing, and device integrations are the next phase. Public release licensing and governance are still pending.

## Run

Use Node.js 22.12 or newer and npm:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally http://127.0.0.1:5173.

Apply form edits, then click **Save project** to persist in this browser. Use **Your projects** to reopen saved work or import a file. Export backups before clearing browser data. Browser storage is unencrypted; do not enter API keys or other secrets. No project data is uploaded.

## Check

```sh
npm run check         # strict TypeScript, production build, tests
npm run format:check  # contributor formatting
npm run schema        # regenerate the structural JSON Schema
```

## Documentation

- [Vision](VISION.md)
- [Phase 1 scope, verification, and next milestone](docs/PHASE_1.md)
- [Shared contributor context](CONTEXT.md)
- [Rules for humans and AI](AGENTS.md)
- [Contributing](CONTRIBUTING.md)
- [Technical stack](docs/TECH_STACK.md)
- [UI design](docs/UI_DESIGN.md)
- [Adapter boundaries](docs/decisions/001-plugin-boundaries.md)
- [Project format and storage](docs/decisions/002-project-storage.md)
- [Project v1 JSON Schema](schemas/project-v1.schema.json)

## Structure

`packages/contracts` contains transport types and runtime schemas with no UI/storage dependency. `apps/web/src/domain.ts` contains numerical rules and project creation. `storage.ts` exposes a replaceable repository. UI features consume these contracts; they do not execute external tools. The CI definition runs checks after publication to GitHub; it has not been executed on a hosted runner yet.
