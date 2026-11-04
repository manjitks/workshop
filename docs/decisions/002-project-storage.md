# ADR 002: versioned projects and replaceable local storage

Phase 1 adds Zod runtime validation to the shared contracts package. It remains independent of React, storage, and devices; it now has one runtime dependency. The generated JSON Schema describes structural constraints. Runtime validation also checks result arithmetic, duplicate IDs, and revision consistency.

The portable ProjectFile is authoritative for a saved project. UI state is a working copy until Save project. A ProjectRepository port abstracts persistence. The browser implementation uses origin-local Web Storage only for project data, never credentials. This is a deliberate interim implementation before the planned SQLite local service, not an architectural replacement for it.

Imports are limited to 1 MB, validated before review, and assigned a new identity. They cannot carry executable adapter code, permissions, or arbitrary extra fields. Unknown versions fail clearly. Prior unversioned demo exports have no implicit migration.

Saving validates again. Storage failures remain visible. Damaged data is not silently reset. Changing project inputs increments the revision; existing results remain available but become stale. Recalculation appends a result rather than overwriting evidence. Explicit retention limits stop further additions rather than silently deleting history.

Export includes the project brief, budget, parts, and estimate history. It is a private project backup, not a sanitized public sharing operation. Avoid secrets in free text. Browser storage is not encrypted and is not a backup.

Future repositories must preserve these semantics, provide atomic conflict checks where supported, and pass the same contract tests. Remote synchronization must not be introduced as an invisible side effect.
