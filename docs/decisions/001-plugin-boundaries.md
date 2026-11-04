# ADR 001: independent capabilities, explicit integration

Accepted direction, 2026-11-04.

## Decision

Plug-and-play means a stable contract with replaceable implementations, not arbitrary downloaded code with full machine access. UI features, scientific models, provider connectors, and device adapters must have separate responsibilities. Prefer a modular local application over premature distributed services.

`packages/contracts` contains transport interfaces and Zod project-file validation, independent of UI and persistence. Adapter interfaces do not implement execution, adapter runtime validation, or isolation. Python boundary validation belongs to the next phase.

## Required adapter contract before execution is introduced

- Unique identifier, adapter version, contract version, capability, supported OS/tool versions, license and upstream attribution.
- Validated input/output schemas and explicit units; schema migrations are deliberate and versioned.
- Declared permissions checked by the host, not merely trusted because an adapter declares them.
- Health/discovery operation separate from execution; discovery must not install or mutate anything.
- Structured progress/results, timeout, cancellation, cleanup, bounded logs, and retry semantics.
- Evidence provenance and input revision/hash in every engineering result.
- Explicit unsupported/unavailable responses. Failure of one adapter must not disable unrelated capabilities.
- Contract tests and a reference fixture. Numerical adapters also need independent reference cases.

## Host responsibilities

The host owns permission grants, session authentication, origin validation, job lifecycle, process isolation policy, and credential access. UI components never receive raw provider keys. Model output and imported packages cannot authorize capability use. Device writes require target- and artifact-bound user confirmation.

Adapters must not import other adapters' internals. Shared algorithms belong in reviewed domain packages. Cross-capability coordination goes through the host and versioned contracts. Avoid global singletons, import-time side effects, circular dependencies, and silent fallbacks.

## Current enforcement

TypeScript strict checks, separate UI/domain/contracts modules, feature render error boundaries, numerical and interaction tests, and no privileged browser operations. All external adapters are currently listed as planned. Browser-local project saving and runtime project validation are implemented. Runtime sandboxing, hot installation, backend authentication, SQLite storage, and permission enforcement are not implemented.

## Next enforcement milestones

Implement runtime schemas, a single adapter runner, cancellation/timeout contract tests, authenticated loopback API tests, and security review before enabling third-party execution. Add CI and protected review requirements when the public repository and maintainers are established.
