import { useState } from 'react';
import { adapters } from '../registry';
import { Label, SectionHead } from '../ui';
export function Tools() {
  const [query, setQuery] = useState('');
  const filtered = adapters.filter((a) =>
    `${a.name} ${a.capability}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="paper-panel">
      <SectionHead
        number="05"
        title="Community tools"
        detail="An independent adapter for each capability. These integrations are proposed, not installed."
      />
      <label className="search-label">
        Find a tool or capability
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try firmware or FreeCAD"
        />
      </label>
      <div className="tool-list">
        {filtered.map((tool, i) => (
          <article className="tool-row" key={tool.id}>
            <span className="tool-number">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <Label>{tool.capability}</Label>
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <details>
                <summary>Proposed access</summary>
                <p>{tool.permissions.join(' · ')}</p>
                <p>
                  No permissions granted. Runtime integration is not
                  implemented.
                </p>
              </details>
            </div>
            <div className="tool-action">
              <span className="tag">Planned</span>
              <a href={tool.upstream} target="_blank" rel="noreferrer">
                Upstream project ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <p role="status">
          No planned tools match “{query}”. Try a capability such as firmware.
        </p>
      )}
    </section>
  );
}
export function Firmware() {
  return (
    <section className="paper-panel">
      <SectionHead
        number="04"
        title="Prepare your firmware"
        detail="Build, inspect, then flash. Each step has an explicit target."
      />
      <div className="device-grid">
        <div className="device-placeholder">
          <svg
            viewBox="0 0 220 200"
            role="img"
            aria-label="Outline of an unconnected development board"
          >
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="66" y="25" width="88" height="150" rx="6" />
              <rect x="89" y="62" width="42" height="42" />
              <path d="M97 25V10h26v15M97 175v15h26v-15" />
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <path
                  key={i}
                  d={`M53 ${45 + i * 15}h13M154 ${45 + i * 15}h13`}
                />
              ))}
            </g>
          </svg>
          <Label>NO DEVICE CONNECTED</Label>
        </div>
        <div>
          <h3>The target comes first.</h3>
          <p>
            No local device service is running. Board identity, firmware
            compatibility, and recovery support have not been checked.
          </p>
          <ol className="checklist">
            <li>Select an exact board and revision.</li>
            <li>Review source and build dependencies.</li>
            <li>Verify the connected target.</li>
            <li>Confirm the artifact and write operation.</li>
          </ol>
          <button disabled>Flash unavailable · no adapter</button>
          <p className="footnote">
            This prototype does not request USB access or write firmware.
          </p>
        </div>
      </div>
    </section>
  );
}
export function Experiments() {
  return (
    <section className="paper-panel">
      <SectionHead
        number="06"
        title="Plan your first measurement"
        detail="Predictions become useful when we compare them with measurements."
      />
      <div className="experiment-sheet">
        <Label>PROPOSED EXPERIMENT / 001</Label>
        <h3>Measure the current that matters.</h3>
        <p>
          Record battery current during sleep, sensing, and storage. Combine
          each current with the time spent in that mode to estimate a duty-cycle
          average.
        </p>
        <dl className="spec-list">
          <div>
            <dt>Required</dt>
            <dd>A confirmed circuit and suitable measurement setup</dd>
          </div>
          <div>
            <dt>Record</dt>
            <dd>Current, duration, battery voltage, ambient temperature</dd>
          </div>
          <div>
            <dt>Compare</dt>
            <dd>Measured average versus the power-budget assumption</dd>
          </div>
          <div>
            <dt>Evidence</dt>
            <dd>No measurements recorded</dd>
          </div>
        </dl>
        <p className="footnote">
          Procedure draft. Instrument selection and electrical setup require
          review before execution. Measurement import is planned.
        </p>
      </div>
    </section>
  );
}
