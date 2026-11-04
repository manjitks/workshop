# Shared project context

Read this first. It is the handoff document for humans and AI contributors.

## Current state

- Project name: Open Workshop (working name).
- Stage: phase-one local workspace implemented; see `docs/PHASE_1.md`.
- Implemented: interactive sample, new projects, browser saves/library, validated import/export, manual part estimates, ideal-runtime estimates with history and staleness, unsaved-edit protection, and automated verification.
- CI workflow is defined but not run on GitHub. External adapters, backend, SQLite, and deployment are not implemented.
- Frontend dependencies installed and pinned in package manifests and package-lock.json.
- Repository publication and license selection: pending; do not claim an approved release license.

## Established direction

We are creating a community-extensible engineering workbench. It connects requirements, scientific checks, design tools, constrained shopping, firmware, and measured evidence. Local ownership and portable project files are foundational.

Chosen stack: React + TypeScript + Vite; Python + FastAPI; SQLite; versioned JSON manifests. See `docs/TECH_STACK.md` for boundaries and rationale.

First end-to-end example: a battery-powered greenhouse temperature/humidity monitor, initially targeting one board family. The exact board and component list are not chosen.

## Repository map

- `VISION.md`: purpose, scope, principles, and first milestone.
- `AGENTS.md`: mandatory contributor and AI rules.
- `CONTRIBUTING.md`: contribution process and review expectations.
- `docs/TECH_STACK.md`: architecture decision and proposed structure.
- `docs/UI_DESIGN.md`: UI specification and first-screen wireframe.

## Next implementation steps

1. Add the authenticated local API and SQLite repository behind the existing storage boundary.
2. Implement a permission-aware adapter runner with cancellation, timeouts, and contract tests.
3. Integrate one real engineering tool and select the first reviewed board/component set.
4. Extend the ideal-runtime model using documented duty cycles and measured data.
5. Add a supplier adapter with explicit request disclosure and secure credential handling.
6. Complete mobile/assistive-technology audit and public-release governance.

## Open decisions

- Core software license and separate policies for contributed hardware/data/documentation.
- Supported OS matrix, exact tool versions, and first board.
- Governance, maintainers, private security-reporting channel, and public repository.
- Reviewed reference models and data sources for the first project.

## Handoff rule

Record completed changes and verification honestly. Do not promote planned functionality to implemented status without runnable evidence. Keep this file short; put rationale in the corresponding design document.
