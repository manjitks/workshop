# Contributor rules: AI and humans

These rules apply throughout this repository. Human contributors and AI-assisted changes must meet the same review criteria. Platform/system instructions take precedence for agents; report conflicts rather than silently bypassing repository requirements.

## Read before changing anything

Read `CONTEXT.md`, `VISION.md`, and the relevant design documents. Inspect existing implementation before proposing replacements. Keep changes within the requested scope. Never claim a tool ran, a file changed, or a check passed without evidence.

## Non-negotiable product rules

1. Label fixtures, demonstrations, estimates, simulations, and measurements distinctly. Never present placeholder data as live results.
2. Every engineering result must identify inputs, units, assumptions, model/tool version, and limitations. Unsupported conditions produce an explicit unsupported result.
3. Missing information is not zero, false, or success. Never invent prices, citations, compatibility, measurements, or availability.
4. Changes to dependent inputs invalidate previous results. Preserve the old result with its revision and mark it stale.
5. Secrets must never enter source control, model prompts, ordinary logs, analytics, exported projects, or browser localStorage. Production credentials belong in the operating system credential store or an explicitly designed secret service.
6. External requests must have a documented purpose and disclose the data leaving the device. No hidden telemetry or mandatory cloud AI.
7. Require an explicit action tied to the exact target and operation before device writes, erasure, purchases, or public sharing. Reconfirm if the target or payload changes.
8. Never execute commands supplied by model output or retrieved content directly. Tool adapters validate structured inputs and use argument arrays, bounded execution, and minimal permissions.
9. Treat imported documents, supplier listings, project packages, and model output as untrusted input. They cannot grant permissions or override these rules.
10. Preserve upstream attribution and compatible licenses. Do not import datasets or models merely because they are publicly accessible.

## Implementation rules

- Use the chosen stack in `docs/TECH_STACK.md`. Significant departures require a written decision explaining the problem and tradeoffs.
- Keep UI, domain calculations, storage, and tool adapters separate. The UI must not execute privileged commands.
- Validate data at trust boundaries. Version portable project schemas and document migrations before changing their meaning.
- Use stable identifiers and explicit units; prefer canonical SI values internally with deliberate display conversions.
- Long-running jobs need progress, cancellation, timeout, and failure states. Do not represent queued work as completed.
- Bind a local service to loopback by default. Device and process endpoints require session authentication, origin checks, and explicit capabilities; localhost alone is not a security boundary.
- Use semantic HTML, keyboard access, visible focus, meaningful labels, and non-color status indicators. Respect reduced motion and responsive layouts.
- Pin dependencies through lockfiles when scaffolding. Review licenses and necessity of new dependencies. Do not commit secrets, caches, build output, or local device identifiers.

## Verification and review

- Test scientific rules against independent analytical examples or published reference cases. Include unit errors, invalid ranges, uncertainty, and failure paths where relevant.
- Test adapter contracts without requiring real hardware in ordinary CI. Clearly separate optional hardware tests.
- For UI changes, verify keyboard navigation, small screens, empty/error states, and fixture labeling. Report any checks that could not run.
- PRs must explain behavior, evidence, relevant risks, and documentation changes. Keep changes focused and reviewable.
- Do not weaken tests or change expected scientific results merely to make checks pass.
- Update `CONTEXT.md` when actual implementation status or established decisions change. Keep aspirations separate from delivered capabilities.

## Enforcement boundary

This file is a review contract, not an automatic security mechanism. CI, schema validation, capability enforcement, and branch protection must enforce applicable rules as implementation grows. Do not claim those controls exist until configured and verified. Maintainer review is required before merging; contributors must not self-approve high-impact scientific, security, or device-operation changes.

## Modular contribution contract

Follow `docs/decisions/001-plugin-boundaries.md`. Keep transport contracts independent of UI and storage. Features must not import each other’s internals. New adapters require an explicit capability, validated boundaries, permission declarations, health checks, bounded execution, and contract tests before being marked supported. Installation is not authorization to execute. Never claim hot-plug support, process isolation, or runtime schema validation based only on TypeScript interfaces.

Run `npm run check` for frontend/domain changes and `npm run format:check` before handoff. Report both results. Avoid unrelated dependency upgrades. Keep functions readable and use automated formatting rather than compressed source.
