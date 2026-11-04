import { useState, type FormEvent } from 'react';
import { partSchema, type Part, type Project } from '@workshop/contracts';
import { inr, subtotal } from '../domain';
import { Label, SectionHead } from '../ui';
export function Parts({
  project,
  parts,
  onChange,
  onDirty,
}: {
  project: Project;
  parts: Part[];
  onChange: (parts: Part[]) => void;
  onDirty: (dirty: boolean) => void;
}) {
  const total = subtotal(parts);
  const [error, setError] = useState('');
  function addPart(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (parts.length >= 200) {
      setError('A project can contain at most 200 parts.');
      return;
    }
    const parsed = partSchema.safeParse({
      id: crypto.randomUUID(),
      name: data.get('name'),
      spec: data.get('spec'),
      quantity: Number(data.get('quantity')),
      unitPriceInr: Number(data.get('price')),
      selected: true,
      priceSource: 'manual',
    });
    if (!parsed.success) {
      setError(
        'Enter a part name, a whole positive quantity, and a valid nonnegative unit price.',
      );
      return;
    }
    onChange([...parts, parsed.data]);
    onDirty(false);
    form.reset();
    setError('');
  }
  return (
    <section className="paper-panel">
      <SectionHead
        number="03"
        title="Plan your parts budget"
        detail="Compare sample prices and your own estimates. Shipping and tax remain separate unknowns."
      />
      <div className="budget-bar">
        <div>
          <Label>SELECTED PARTS</Label>
          <strong>{inr(total)}</strong>
        </div>
        <div>
          <Label>BUDGET CEILING</Label>
          <strong>{inr(project.budgetInr)}</strong>
        </div>
        <div>
          <Label>DELIVERY + TAX</Label>
          <strong>Not quoted</strong>
        </div>
      </div>
      <p
        className={total > project.budgetInr ? 'warning' : 'muted'}
        role="status"
      >
        {total > project.budgetInr
          ? `Parts exceed your budget by ${inr(total - project.budgetInr)}.`
          : `${inr(project.budgetInr - total)} remaining before unquoted costs.`}{' '}
        Final total is incomplete.
      </p>
      <div className="parts-list">
        {parts.map((part, i) => (
          <label className="part-row" key={part.id}>
            <input
              type="checkbox"
              checked={part.selected}
              onChange={() =>
                onChange(
                  parts.map((p) =>
                    p.id === part.id ? { ...p, selected: !p.selected } : p,
                  ),
                )
              }
            />
            <span className="part-index">0{i + 1}</span>
            <span className="part-description">
              <strong>{part.name}</strong>
              <small>{part.spec}</small>
              <small>
                Compatibility unconfirmed ·{' '}
                {part.priceSource === 'manual'
                  ? 'your estimate, not a verified quote'
                  : 'sample price'}
              </small>
            </span>
            <span className="part-price">
              {part.quantity} × {inr(part.unitPriceInr)}
            </span>
          </label>
        ))}
      </div>
      {parts.length === 0 && (
        <p className="muted">
          No parts yet. Add a component and your estimated price below.
        </p>
      )}
      <details className="source-notes">
        <summary>Add a part estimate</summary>
        <form
          className="part-form"
          onSubmit={addPart}
          onChange={() => onDirty(true)}
        >
          <label>
            Part name
            <input name="name" required maxLength={100} />
          </label>
          <label>
            Specification
            <input name="spec" maxLength={500} />
          </label>
          <label>
            Quantity
            <input
              name="quantity"
              type="number"
              min="1"
              max="10000"
              step="1"
              defaultValue="1"
              required
            />
          </label>
          <label>
            Unit price · INR
            <input
              name="price"
              type="number"
              min="0"
              max="100000000"
              step="0.01"
              required
            />
          </label>
          <button className="primary">Add part</button>
          {error && <p role="alert">{error}</p>}
        </form>
      </details>
      <p className="footnote">
        No live search, store connection, or purchase. Deselect items you
        already own to explore the subtotal.
      </p>
    </section>
  );
}
