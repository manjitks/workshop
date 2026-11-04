import { useCallback, useEffect, useState } from 'react';
import type {
  Part,
  PowerResult,
  Project,
  ProjectFile,
} from '@workshop/contracts';
import { newProject } from './domain';
import { browserProjectRepository } from './storage';

export function useWorkspace() {
  const [file, setFile] = useState(() => newProject(true));
  const [saved, setSaved] = useState<ProjectFile[]>([]);
  const [dirty, setDirty] = useState(true);
  const [draftDirty, setDraftDirty] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    try {
      setSaved(browserProjectRepository(window.localStorage).list());
    } catch {
      setError(
        'Saved projects could not be read. Nothing was overwritten. Check browser storage permissions or export your current work.',
      );
    }
  }, []);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty || draftDirty) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty, draftDirty]);
  const change = useCallback(
    (mutate: (previous: ProjectFile) => ProjectFile) => {
      setFile((previous) => ({
        ...mutate(previous),
        updatedAt: new Date().toISOString(),
      }));
      setDirty(true);
      setMessage('');
    },
    [],
  );
  function save() {
    try {
      if (draftDirty)
        throw new Error('Apply your form changes before saving the project.');
      const repository = browserProjectRepository(window.localStorage);
      const current = repository
        .list()
        .find((project) => project.id === file.id);
      const known = saved.find((project) => project.id === file.id);
      if (current && current.updatedAt !== known?.updatedAt)
        throw new Error(
          'This project changed in another tab. Export your work, then reopen the saved version before overwriting it.',
        );
      repository.save(file);
      setSaved(repository.list());
      setDirty(false);
      setError('');
      setMessage(
        'Saved in this browser. Export a backup before clearing browser data.',
      );
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : 'Could not save. Export a backup instead.',
      );
    }
  }
  function replace(next: ProjectFile) {
    setFile(next);
    setDirty(true);
    setDraftDirty(false);
    setMessage('Project opened. Save a local copy or export a backup.');
    setError('');
  }
  return {
    file,
    saved,
    dirty,
    draftDirty,
    setDraftDirty,
    message,
    setMessage,
    error,
    setError,
    save,
    replace,
    updateProject: (project: Project) => {
      change((previous) => ({ ...previous, project, briefReviewed: true }));
      setDraftDirty(false);
    },
    updateParts: (parts: Part[]) =>
      change((previous) => ({
        ...previous,
        parts,
        project: {
          ...previous.project,
          revision: previous.project.revision + 1,
        },
      })),
    addEstimate: (estimate: PowerResult) => {
      if (file.estimates.length >= 100) {
        setError(
          'This project has 100 recorded estimates. Start a new project to continue; history was preserved.',
        );
        return;
      }
      change((previous) => ({
        ...previous,
        estimates: [...previous.estimates, estimate],
      }));
      setDraftDirty(false);
    },
  };
}
