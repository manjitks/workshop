import { useState } from 'react';
import type { Project } from '@workshop/contracts';
import { inr } from '../domain';
import { AssemblyDrawing, type ComponentId } from './AssemblyDrawing';
const components: Record<
  ComponentId,
  {
    name: string;
    type: string;
    description: string;
    checks: string[];
    action: string;
    destination: string;
  }
> = {
  lid: {
    name: 'Vented lid',
    type: 'Mechanical / 01',
    description:
      'Allows air to reach the sensor while covering the electronics.',
    checks: ['Vent dimensions not defined', 'Ingress protection not assessed'],
    action: 'Review requirements',
    destination: 'brief',
  },
  sensor: {
    name: 'Sensor board',
    type: 'Electronics / 02',
    description:
      'The sensing and control layer. Choose a board and sensor after defining accuracy and power requirements.',
    checks: ['Exact board not selected', 'Current draw not measured'],
    action: 'Estimate power needs',
    destination: 'evidence',
  },
  housing: {
    name: 'Protective housing',
    type: 'Mechanical / 03',
    description:
      'Holds the electronics and battery. Mounting and connector openings depend on the selected components.',
    checks: ['Component fit not verified', 'Material not selected'],
    action: 'Explore the parts list',
    destination: 'parts',
  },
};
export function Bench({
  project,
  navigate,
  hasEstimate,
  briefReviewed,
  sampleProject,
}: {
  project: Project;
  navigate: (id: string) => void;
  hasEstimate: boolean;
  briefReviewed: boolean;
  sampleProject: boolean;
}) {
  const [selected, setSelected] = useState<ComponentId>('sensor');
  const [exploded, setExploded] = useState(true);
  const item = components[selected];
  if (!sampleProject)
    return (
      <section className="paper-panel">
        <span className="kicker">YOUR PROJECT</span>
        <h2>Start with the problem.</h2>
        <p>{project.objective}</p>
        <div className="empty-design">
          <h3>No design attached yet</h3>
          <p>
            Set your requirements, explore a power estimate, and add your own
            part estimates. CAD import and design generation are planned.
          </p>
          <button
            className="primary"
            onClick={() => navigate(briefReviewed ? 'evidence' : 'brief')}
          >
            {briefReviewed ? 'Explore feasibility' : 'Set requirements'} →
          </button>
        </div>
      </section>
    );

  return (
    <div className="design-workspace">
      <header className="workspace-heading">
        <div>
          <span className="kicker">DESIGN WORKSPACE</span>
          <h2>Meet your first prototype.</h2>
          <p>Select a component to explore what it needs.</p>
        </div>
        <span className="draft-label">
          <span />
          Concept stage
        </span>
      </header>
      <div className="studio">
        <section className="viewport" aria-label="Assembly explorer">
          <div className="viewport-toolbar">
            <span className="viewport-title">
              Field station <span>/ Assembly</span>
            </span>
            <div className="view-toggle" aria-label="Assembly view">
              <button aria-pressed={exploded} onClick={() => setExploded(true)}>
                Exploded
              </button>
              <button
                aria-pressed={!exploded}
                onClick={() => setExploded(false)}
              >
                Assembled
              </button>
            </div>
          </div>
          <div className="viewport-canvas">
            <span className="canvas-badge">
              Interactive illustration · not CAD
            </span>
            <AssemblyDrawing
              selected={selected}
              onSelect={setSelected}
              exploded={exploded}
            />
            <span className="canvas-hint">Click a part to inspect it</span>
          </div>
          <div className="component-selector" aria-label="Assembly components">
            {(Object.keys(components) as ComponentId[]).map((id, index) => (
              <button
                key={id}
                aria-pressed={selected === id}
                onClick={() => setSelected(id)}
              >
                <span>0{index + 1}</span>
                {components[id].name}
              </button>
            ))}
          </div>
        </section>
        <aside className="component-inspector" aria-label="Component inspector">
          <div className="inspector-label">
            INSPECTOR <span>Properties</span>
          </div>
          <div className="inspector-content" key={selected}>
            <div className="component-glyph" aria-hidden="true">
              {selected === 'sensor' ? '▦' : selected === 'lid' ? '▱' : '⬡'}
            </div>
            <span className="kicker">{item.type}</span>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="inspector-divider" />
            <h4>Before you build</h4>
            <ul>
              {item.checks.map((check) => (
                <li key={check}>
                  <span aria-hidden="true">○</span>
                  {check}
                </li>
              ))}
            </ul>
            <button
              className="primary"
              onClick={() => navigate(item.destination)}
            >
              {item.action}
              <span aria-hidden="true">→</span>
            </button>
            <p className="inspector-note">
              Concept geometry only. No dimensions or compatibility have been
              validated.
            </p>
          </div>
        </aside>
      </div>
      <section className="workspace-bottom">
        <div className="next-task">
          <span className="task-marker" aria-hidden="true">
            ↗
          </span>
          <div>
            <span className="kicker">CONTINUE YOUR PROJECT</span>
            <h3>
              {briefReviewed
                ? 'Put your power assumptions to the test.'
                : 'Give this idea a clear set of requirements.'}
            </h3>
            <button
              className="inline-action"
              onClick={() => navigate(briefReviewed ? 'evidence' : 'brief')}
            >
              {briefReviewed
                ? 'Open power estimate'
                : 'Set project requirements'}{' '}
              →
            </button>
          </div>
        </div>
        <div className="project-snapshot">
          <span>
            Budget ceiling<strong>{inr(project.budgetInr)}</strong>
          </span>
          <span>
            Power estimate
            <strong>{hasEstimate ? 'Available' : 'Not yet calculated'}</strong>
          </span>
        </div>
      </section>
    </div>
  );
}
