# Technical stack and architecture

Status: initial decision, 2026-11-04. Frontend versions are pinned in package manifests and package-lock.json; backend versions are deferred until implementation.

## Chosen stack

| Layer               | Choice                                                       | Reason                                                                                 |
| ------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| Interface           | React + TypeScript + Vite                                    | Component-based UI, explicit contracts, straightforward local development.             |
| Styling             | CSS variables and ordinary CSS initially                     | Accessible, inspectable design system without an early component-framework dependency. |
| Local API           | Python + FastAPI + Pydantic                                  | Typed API boundary close to scientific Python and engineering tools.                   |
| Local index         | SQLite                                                       | Single-user persistence without requiring a database server.                           |
| Project interchange | Versioned JSON manifest plus artifact directory              | Portable projects independent of our database and UI.                                  |
| Calculations        | Python functions and reviewed domain libraries               | Reproducible numerical work independent of language-model output.                      |
| Integrations        | Versioned adapters around supported CLIs/APIs                | Reuse upstream tools while preserving explicit support boundaries.                     |
| Tests               | Vitest/Testing Library, pytest; browser tests when UI exists | Exercise user behavior, numerical contracts, and failure paths.                        |

## Proposed repository layout

```text
apps/web/                  React interface
services/local_api/        API, sessions, job coordination
packages/project_schema/   Versioned schemas and fixtures
adapters/                  Tool/provider adapters and contract tests
examples/                  Reproducible example project packages
docs/                      Product, architecture, and contribution decisions
```

`apps/web` and `packages/contracts` now exist. Other directories remain planned. See [ADR 001](decisions/001-plugin-boundaries.md) for adapter boundaries and current enforcement.

## Execution boundary

The browser communicates with an authenticated loopback service. The service validates structured requests and delegates jobs to adapters. Adapters declare read/write/device/network permissions, supported tool versions, input/output schemas, timeouts, and cancellation behavior. Use subprocess argument arrays rather than shell interpolation. A subprocess alone is not a sandbox; unsupported isolation requirements must be reported honestly.

Do not embed a general-purpose autonomous shell in the UI. A provider response cannot authorize another tool or access credentials. Local endpoints must validate origins and sessions, even on loopback.

## Persistence

SQLite stores the local index and job metadata. Portable project packages hold manifests and referenced artifacts. Define one authoritative source for each field before implementing synchronization; do not maintain competing editable copies. Credentials are stored separately using an OS credential-store integration, never inside the project package.

Result records include input hashes/revisions, tool and model versions, evidence references, units, assumptions, timestamps, and status. Input changes make dependent results stale. Native CAD, electronics, firmware, and measurement files remain exportable.

## Deferred choices

Desktop packaging, hosted collaboration, distributed execution, and universal plugin installation are deferred. Begin with a browser and a local service; validate the complete workflow before adding distribution complexity. Tool candidates are not installed dependencies or verified integrations.

## Open-source foundations to evaluate

- FreeCAD: https://github.com/FreeCAD/FreeCAD
- KiCad: https://www.kicad.org/
- CalculiX: https://www.calculix.de/
- OpenModelica: https://openmodelica.org/
- PlatformIO: https://docs.platformio.org/
- esptool: https://docs.espressif.com/projects/esptool/
- OpenOCD: https://openocd.org/
- OR-Tools: https://developers.google.com/optimization
- FMI: https://fmi-standard.org/

Evaluate licenses, platform support, installation burden, and reference tests before adopting each integration. Contribute upstream fixes rather than maintaining unnecessary forks.
