import { useState, type FormEvent } from 'react';
import type { Project } from '@workshop/contracts';
import { updateBrief } from '../domain';
import { SectionHead } from '../ui';
export function Brief({
  project,
  onSave,
  onDirty,
}: {
  project: Project;
  onSave: (value: Project) => void;
  onDirty: (dirty: boolean) => void;
}) {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      onSave(
        updateBrief(
          project,
          String(data.get('name')),
          String(data.get('objective')),
          Number(data.get('budget')),
        ),
      );
      setError('');
      setMessage(
        'Brief applied. Earlier estimates are now stale. Use Save project to keep these changes in this browser.',
      );
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <section className="paper-panel">
      <SectionHead
        number="01"
        title="What are you building?"
        detail="Give your project a goal and a budget. You can change both later."
      />
      <form
        className="brief-form"
        onSubmit={submit}
        onChange={() => onDirty(true)}
      >
        <label>
          Project name
          <input
            name="name"
            defaultValue={project.name}
            required
            maxLength={100}
          />
        </label>
        <label>
          What should this help someone do?
          <textarea
            name="objective"
            defaultValue={project.objective}
            required
            maxLength={1500}
            rows={4}
          />
        </label>
        <label>
          Budget ceiling · INR
          <input
            name="budget"
            type="number"
            min="1"
            max="100000000"
            step="1"
            defaultValue={project.budgetInr}
            required
          />
        </label>
        <p className="muted">
          Apply changes, then use Save project. Nothing is uploaded.
        </p>
        {error && <p role="alert">{error}</p>}
        <button className="primary">
          Update brief <span>→</span>
        </button>
        <p role="status">{message}</p>
      </form>
    </section>
  );
}
