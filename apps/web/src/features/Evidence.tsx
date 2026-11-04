import { useState, type FormEvent } from 'react';
import type { PowerResult, Project } from '@workshop/contracts';
import { estimateRuntime } from '../domain';
import { Label, SectionHead } from '../ui';
export function Evidence({
  project,
  result,
  onResult,
  onDirty,
  history,
}: {
  project: Project;
  result: PowerResult | null;
  onResult: (r: PowerResult) => void;
  onDirty: (dirty: boolean) => void;
  history: PowerResult[];
}) {
  const [error, setError] = useState('');
  function calculate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    try {
      onResult(
        estimateRuntime(
          {
            capacityAh: Number(d.get('capacity')),
            currentA: Number(d.get('current')) / 1000,
            usableFraction: Number(d.get('usable')) / 100,
          },
          project.revision,
        ),
      );
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  }
  return (
    <section className="paper-panel">
      <SectionHead
        number="02"
        title="Estimate battery runtime"
        detail="See how capacity and average current affect an ideal runtime estimate."
      />
      <div className="evidence-grid">
        <form
          onSubmit={calculate}
          onChange={() => onDirty(true)}
          className="brief-form"
        >
          <Label>INPUTS / HYPOTHETICAL DEFAULTS</Label>
          <label>
            Battery capacity · Ah
            <input
              name="capacity"
              type="number"
              step="any"
              min="0.001"
              defaultValue={result?.inputs.capacityAh ?? 2}
              required
            />
          </label>
          <label>
            Average battery current · mA
            <input
              name="current"
              type="number"
              step="any"
              min="0.001"
              defaultValue={(result?.inputs.currentA ?? 0.02) * 1000}
              required
            />
          </label>
          <label>
            Usable capacity · %
            <input
              name="usable"
              type="number"
              step="any"
              min="0.01"
              max="100"
              defaultValue={(result?.inputs.usableFraction ?? 0.8) * 100}
              required
            />
          </label>
          <button className="primary">
            Calculate estimate <span>→</span>
          </button>
          {error && <p role="alert">{error}</p>}
        </form>
        <div className="result-sheet" aria-live="polite">
          <Label>IDEAL RUNTIME / MODEL v1</Label>
          {result ? (
            <>
              <span className="tag">
                {result.projectRevision === project.revision
                  ? 'Estimated · not measured'
                  : 'Stale · project changed'}
              </span>
              <div className="big-result">
                {(result.seconds / 3600).toLocaleString(undefined, {
                  maximumFractionDigits: 1,
                })}
                <span>hours</span>
              </div>
              <p>
                For {result.inputs.capacityAh} Ah ×{' '}
                {result.inputs.usableFraction * 100}% ÷{' '}
                {result.inputs.currentA * 1000} mA
              </p>
              <p className="muted">
                Project revision {result.projectRevision} ·{' '}
                {result.modelVersion}
              </p>
            </>
          ) : (
            <>
              <div className="big-result">
                —<span>not calculated</span>
              </div>
              <p>Set the inputs to create a reproducible estimate.</p>
            </>
          )}
          <div className="formula">t = Q × usable fraction / I</div>
          <p>
            Capacity in Ah, current in A, time in hours. The calculation uses
            the definition of ampere-hour; it is not a simulation.
          </p>
        </div>
      </div>
      {history.length > 1 && (
        <details className="source-notes">
          <summary>Estimate history ({history.length})</summary>
          <ol>
            {history.map((entry, index) => (
              <li key={index}>
                Run {index + 1} ·{' '}
                {(entry.seconds / 3600).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}{' '}
                hours · {entry.inputs.capacityAh} Ah / {entry.inputs.currentA} A
                × {entry.inputs.usableFraction} usable · revision{' '}
                {entry.projectRevision}{' '}
                {entry.projectRevision !== project.revision
                  ? '(stale)'
                  : '(estimated)'}
              </li>
            ))}
          </ol>
        </details>
      )}
      <details className="source-notes">
        <summary>Assumptions & limitations</summary>
        <p>
          Constant average current measured at the battery. Capacity applies at
          the assumed operating conditions. Defaults are illustrative, not
          component specifications. Temperature, aging, self-discharge, peak
          loads, conversion losses, and discharge-rate effects are not modeled.
          Measure actual current and consult the chosen battery’s datasheet
          before using this estimate for a design decision.
        </p>
        <p>
          No external dataset or solver was used. Input changes take effect only
          when you press Calculate; the result always displays the exact inputs
          it used.
        </p>
      </details>
    </section>
  );
}
