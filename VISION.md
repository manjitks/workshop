# Open Workshop

> An open-source engineering workbench that helps people turn ideas into buildable, testable, repairable projects.

Status: founding vision with a local UI prototype and a simple analytical runtime estimate. External engineering tools, live sourcing, simulation, and device integrations are not implemented.

## Our aim

Make the open-source engineering ecosystem accessible through one coherent workflow. People should be able to describe a problem, set their constraints, discover appropriate tools, examine scientific evidence, design a solution, source parts, build firmware, assemble a prototype, and share what they learn.

Communities must be able to run, inspect, extend, and maintain the system independently of its original creators.

## The complete journey

1. Describe the intended outcome, budget, available materials, tools, location, and operating conditions.
2. Find relevant openly licensed designs and supported community tools.
3. Check physical bounds, units, assumptions, component compatibility, and feasibility.
4. Create editable mechanical, electronic, and firmware artifacts.
5. Compare parts baskets against budget, availability, delivery, and technical constraints.
6. Assemble the project and use guided firmware building, flashing, and diagnostics.
7. Measure real behavior and compare it with predictions.
8. Optionally publish a reproducible project package with evidence, limitations, and attribution.

## Core capabilities

### Community tool registry

Connect established tools rather than rebuilding them. Candidate integrations include FreeCAD, KiCad, CalculiX, OpenModelica, Jupyter, PlatformIO, esptool, OpenOCD, and OR-Tools. Each adapter must declare versions, supported platforms, licenses, permissions, and verified capabilities. Discovery is broad; supported integration claims require tests.

### Scientific feasibility

Use explicit equations, validated models, reference data, and measured results. Every parameter must carry units, provenance, applicable conditions, and uncertainty where known. Distinguish estimates, simulation, and physical validation. Never claim simulation proves a device is safe or effective in the real world.

### Constraint-aware sourcing

Generate reviewable shopping lists with quantities, technical requirements, price timestamps, and known delivery costs. Account for existing inventory, pack sizes, and substitutions. Unknown costs remain unknown. Support provider keys, available public search, imported catalogs, and manual quotes without promising universal free coverage.

### Firmware assistance

Track board variants, pin assignments, dependencies, source revisions, and build artifacts. Guide users through supported flashing tools, verification, diagnostics, and recovery. Confirm target hardware and write/erase operations before execution. Offer backups and rollback only where actually supported.

### Connected project evidence

Connect requirements, designs, calculations, purchases, firmware, and measurements. A changed component must mark dependent checks as stale. Preserve failures and limitations alongside successful results.

## Privacy and ownership

- Default to local project storage and local execution where practical.
- Make external providers optional and disclose what leaves the machine.
- Keep credentials out of prompts, logs, exports, and shared project files.
- Separate public engineering artifacts from private addresses, budgets, and purchase history.
- Preserve native tool formats and provide complete portable exports.
- Require deliberate user action for purchases, device writes, and publication.

## Initial technical direction

- UI: React, TypeScript, and Vite.
- Local API and engineering adapters: Python and FastAPI.
- Local project index: SQLite.
- Portable interchange: versioned JSON manifests plus native design and evidence files.
- Solver and device integrations: isolated adapters with explicit permissions and structured results.
- First distribution: browser UI connected to a local service. Desktop packaging can follow after validating the workflow.

Frontend dependencies are installed and pinned. Backend, storage, and external integrations remain architectural plans.

## First complete project

A battery-powered greenhouse temperature and humidity monitor:

Requirements → power estimate → component basket → enclosure → firmware → guided flashing → measurements → revised estimate.

Start with one supported board family and a small documented component set. A successful first milestone is an independent contributor reproducing the project and returning measurements linked to its exact revision.

## Community principles

- Evidence before confidence; unknowns must remain visible.
- Accessible interfaces, understandable language, and reproducible instructions.
- Credit upstream communities and contribute fixes back where practical.
- Review licenses for software, models, datasets, firmware, and documentation separately.
- Welcome contributors across engineering, software, testing, documentation, translation, and practical making.
- Keep the core independently runnable and avoid mandatory proprietary services.

## What we are not promising

We are not starting with universal hardware support, automatic engineering certification, a universal physics solver, autonomous purchasing, or guaranteed product availability. We are building a dependable foundation that a community can expand.

## Success measures

Measure independently reproduced builds, traceable results, useful repairs, accessible workflows, and maintained integrations. A growing tool list alone is not success.
