import { useState, type ChangeEvent } from 'react';
import {
  MAX_PROJECT_BYTES,
  parseProjectFile,
  type ProjectFile,
} from '@workshop/contracts';
import { newProject } from '../domain';
export function Projects({
  saved,
  onOpen,
}: {
  saved: ProjectFile[];
  onOpen: (file: ProjectFile) => void;
}) {
  const [error, setError] = useState('');
  const [pending, setPending] = useState<ProjectFile | null>(null);
  const [reading, setReading] = useState(false);
  async function read(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    event.target.value = '';
    if (!selected) return;
    setReading(true);
    setPending(null);
    setError('');
    try {
      if (selected.size > MAX_PROJECT_BYTES)
        throw new Error('Choose a project smaller than 1 MB.');
      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error('The file could not be read.'));
        reader.onabort = () =>
          reject(new Error('Reading the file was cancelled.'));
        reader.readAsText(selected);
      });
      const parsed = parseProjectFile(text);
      setPending({ ...parsed, id: crypto.randomUUID() });
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setReading(false);
    }
  }
  return (
    <section className="paper-panel">
      <header className="section-head">
        <h2>Your projects</h2>
        <p>
          Local to this browser. Exported files let you move projects between
          devices.
        </p>
      </header>
      <div className="project-actions">
        <button className="primary" onClick={() => onOpen(newProject())}>
          New project +
        </button>
        <button onClick={() => onOpen(newProject(true))}>
          Open sample project
        </button>
        <label className="file-picker">
          Import project
          <input
            type="file"
            accept=".json,application/json"
            onChange={read}
            disabled={reading}
          />
        </label>
      </div>
      {reading && <p role="status">Reading and validating project…</p>}
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      {pending && (
        <section className="import-review">
          <h3>Review import: {pending.project.name}</h3>
          <p>
            {pending.parts.length} parts · {pending.estimates.length} estimates
            · revision {pending.project.revision}
          </p>
          <p>
            Opens as a new copy. Existing projects are not replaced. Imported
            results are estimates, not validated physical evidence.
          </p>
          <button
            onClick={() => {
              onOpen(pending);
              setPending(null);
            }}
          >
            Open imported copy
          </button>
          <button onClick={() => setPending(null)}>Cancel import</button>
        </section>
      )}
      <h3 className="library-heading">Saved in this browser</h3>
      {saved.length === 0 ? (
        <p className="muted">
          No saved projects yet. Use Save project in the header to keep your
          work here.
        </p>
      ) : (
        <div className="project-library">
          {saved.map((file) => (
            <button key={file.id} onClick={() => onOpen(file)}>
              <strong>{file.project.name}</strong>
              <span>
                Revision {file.project.revision} · {file.parts.length} parts
              </span>
              <small>Saved {new Date(file.updatedAt).toLocaleString()}</small>
            </button>
          ))}
        </div>
      )}
      <p className="footnote">
        Browser storage is not encrypted. Do not put API keys or other secrets
        into project text. Clearing browser data removes saved projects.
      </p>
    </section>
  );
}
