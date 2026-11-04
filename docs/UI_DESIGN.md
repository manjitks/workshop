# UI design: a guided engineering workspace

Status: revised local React prototype. This specification supersedes the original field-notebook layout.

## User need

A newcomer should understand what to do next without knowing the tools, engineering terminology, or entire project lifecycle. Experienced contributors should still be able to inspect assumptions and move between steps.

## Navigation and hierarchy

Four primary sections: Overview, Requirements, Feasibility, and Build. Build contains Parts & budget, Firmware, and Test plan. Community tools is a separate utility destination.

The compact header identifies the project and offers notes export. The overview is an interactive concept workspace with a selectable assembly, exploded/assembled views, and a contextual component inspector. A next-action strip connects exploration to requirements and estimates. The SVG is an illustration, not CAD. No decorative statistics, oversized brand statements, or repeated prototype banners.

Technical explanations belong beside the relevant operation or in expandable details. Sample-project labeling remains visible. Save state is disclosed in navigation. Explicit browser-local saving and portable exports are available; neither is advertised as encrypted storage.

## Visual and accessibility rules

Use a quiet, high-contrast workspace with readable sans-serif text, generous control targets, modest surface borders, and blue interaction emphasis on neutral white and cool-gray surfaces. There should be one visually dominant action per task. On small screens, navigation moves above content, panels stack, and the build plan precedes the illustration.

Use native buttons, inputs, labels, and disclosures; visible keyboard focus; a skip link; text alongside status; and reduced-motion support. Do not depend on hover, animation, color, or tiny technical annotations to communicate required information.

## Implemented interactions

- Requirements edits the session brief and increments project revision.
- Feasibility calculates ideal runtime from explicit inputs and displays its assumptions and exact input snapshot. A project revision change marks previous results stale.
- Parts allows selecting illustrative items and recalculates subtotal. Delivery and tax remain unquoted, not zero.
- Firmware explains prerequisites and keeps flashing unavailable without an adapter.
- Tools searches planned integrations with upstream links and proposed permission details.
- Export downloads a private versioned project file. Import validates and reviews a new copy before opening it.

The overview advances its suggested action after a brief update. This is workflow guidance, not a claim that engineering requirements have been validated.

## Remaining UX work

Browser-local persistence, import review, and guards against discarding unapplied edits are implemented. The SQLite service, real adapter progress/cancellation, and validated hardware selection remain planned. Mobile and assistive-technology testing need broader coverage. Real user testing is needed before calling this workflow validated.

## Verification

The production build and domain/interaction tests pass. Desktop layout has been visually inspected in Chrome. Responsive CSS exists, but a full mobile browser and screen-reader audit has not been completed.

## Interactive assembly

Component selection works by pointer or keyboard and updates the inspector with requirements and a relevant navigation action. Exploded/assembled transitions respect reduced motion. These views do not calculate physical fit. SVG controls and an equivalent labeled component selector expose selection state to assistive technology.
