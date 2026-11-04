# Phase 1 — local project workspace

Status: implemented and locally verified. This is the application foundation, not completion of the physical greenhouse-monitor milestone in VISION.md.

## Delivered

- Interactive sample assembly with component inspection and keyboard selection.
- New projects with an honest empty-design state.
- Editable project brief and budget, with revision tracking.
- Ideal battery runtime estimate with recorded inputs, model version, retained history, and stale-result indicators.
- Sample parts selection and manual part estimates with explicit provenance labels.
- Browser-local project save and library reopening through a replaceable repository interface.
- Versioned JSON export and validated import with review, file-size limits, and new-copy semantics.
- Unknown-field/version rejection, duplicate ID checks, and numerical consistency checks on imported results.
- Protection against leaving unapplied form edits, visible storage errors, and detection of previously saved changes from another tab before overwrite.
- Shared contribution rules, architecture decisions, schema artifact, lockfile, tests, formatter, PR template, and a CI workflow definition.

## Verify it yourself

1. Run `npm ci` and `npm run dev`.
2. Open the sample and select different assembly components.
3. Apply a brief edit; calculate an estimate in Feasibility.
4. Change an input and calculate again; inspect the retained history.
5. Modify the brief or selected parts; confirm the previous estimate is stale.
6. Add a manual part estimate. Its price must be labeled as your estimate.
7. Save project. Refresh, go to Your projects, and reopen the saved entry.
8. Export. Use Import project, inspect the review, then open the imported copy.
9. Try invalid JSON: show an error without replacing the current project.
10. Try a new project: do not display the greenhouse illustration as its own design.

## Verification evidence

Production TypeScript/build checks, domain checks, repository failure tests, and UI interaction tests run locally. Desktop browser inspection and a real local save were verified. Unit tests isolate browser storage because Node 25 exposes a different global Storage implementation. A comprehensive mobile/screen-reader audit and hosted CI execution have not been completed.

## Scope limits

No backend, SQLite service, cloud account, CAD generation, real solver adapter, supplier API, device access, or firmware flashing. No API-key entry. The local browser repository is unencrypted and origin-specific; clearing browser data removes projects. Exports are backups and may contain private text and budget information.

Up to 20 saved projects, 200 parts per project, 100 retained estimates, and 1 MB per imported project. Unsupported versions are rejected rather than guessed. Early unversioned prototype note exports are not supported by this v1 importer.

The cross-tab check detects changes already saved before the current save; it is not an atomic multi-user transaction. Collaborative editing and conflict merging belong to a later storage implementation.

## Phase 2

Authenticated local FastAPI service, SQLite repository, a tested adapter runner with permissions/cancellation/timeouts, one real tool integration, and a reviewed first hardware configuration. Public release also needs license selection, maintainers, private security reporting, and branch protection.
