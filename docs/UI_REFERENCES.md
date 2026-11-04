# UI reference study

Status: reference direction applied to a neutral/blue interactive assembly workspace.

The current green-tinted dashboard has not met the user's visual or usability expectations. The revised direction prioritizes the artifact and contextual inspection.

## Comparable engineering applications

### Onshape

Reference: https://cad.onshape.com/help/Content/Home/user_interface_basics.htm

The documented interface separates a document panel, central graphics area, and workflow-specific toolbars. Tool groups collapse with available space; selection and errors have explicit visual treatment.

Lesson for Open Workshop: make the active artifact the main working area, with stable navigation and contextual properties. Do not reproduce the full density of an expert CAD interface for newcomers.

### Arduino Cloud Editor

Reference: https://docs.arduino.cc/arduino-cloud/guides/editor/

The editor brings code, compilation, board selection, upload, and serial monitoring into a task-oriented workspace. Its documented interface separates editing from device controls and output.

Lesson: firmware should have an identifiable target, a clear operation area, and inspectable output. Do not imitate functioning device controls before our adapter exists.

### Wokwi

Reference: https://docs.wokwi.com/guides/diagram-editor

The diagram editor supports direct component placement, selection, wiring, and context-dependent editing, with keyboard equivalents for many operations.

Lesson: select a component and reveal its specification, sourcing, and firmware consequences nearby. A component workspace is more relevant than decorative overview cards.

## Proposed direction, not implemented

- Neutral white and cool-gray work surfaces; dark slate typography.
- A single blue interaction accent; green reserved for verified success, amber for unresolved conditions, red for errors. Always pair color with text.
- Compact project header, left project/artifact navigation, central task workspace, contextual inspector when relevant.
- Optional output drawer for calculations and future adapter jobs.
- New projects begin with guided requirements; established projects open the active artifact.
- Reduce marketing-style headings, repeated status chips, tinted surfaces, and decorative cards.
- Start with one complete screen: selecting a component, inspecting its requirements, and understanding the next available action.

This is our synthesis of the references, not a claim that any reference uses the proposed exact palette or that their entire product is open source. Inspiration does not authorize copying branding, assets, or proprietary code.

## Evaluation before another broad redesign

Check whether a newcomer can identify the current task, primary action, selected object, and missing information within one screen. Review a concrete desktop and mobile composition before propagating the visual system across all features. Preserve contrast, keyboard access, and truthful implementation states.
