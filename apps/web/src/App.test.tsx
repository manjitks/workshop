import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import App from './App';
it('keeps estimates traceable and marks them stale after a brief change', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Feasibility' }));
  await user.click(screen.getByRole('button', { name: /Calculate estimate/ }));
  expect(screen.getByText('Estimated · not measured')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Requirements' }));
  await user.clear(screen.getByLabelText('Project name'));
  await user.type(screen.getByLabelText('Project name'), 'My field station');
  await user.click(screen.getByRole('button', { name: /Update brief/ }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'My field station',
  );
  await user.click(screen.getByRole('button', { name: 'Feasibility' }));
  expect(screen.getByText('Stale · project changed')).toBeInTheDocument();
});
it('lets users remove sample parts and retains unknown delivery costs', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Build' }));
  expect(screen.getByText('₹1,890')).toBeInTheDocument();
  await user.click(screen.getAllByRole('checkbox')[0]);
  expect(screen.getByText('₹1,410')).toBeInTheDocument();
  expect(screen.getByText('Not quoted')).toBeInTheDocument();
});
it('never offers a functioning flash operation without an adapter', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Build' }));
  await user.click(screen.getByRole('button', { name: 'Firmware' }));
  expect(
    screen.getByRole('button', { name: /Flash unavailable/ }),
  ).toBeDisabled();
});
it('shows a useful empty registry result', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /Community tools/ }));
  await user.type(screen.getByRole('searchbox'), 'unknown-tool');
  expect(screen.getByText(/No planned tools match/)).toBeInTheDocument();
});

it('updates component properties and opens the relevant task', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Inspect housing' }));
  expect(
    screen.getByRole('heading', { name: 'Protective housing' }),
  ).toBeInTheDocument();
  expect(screen.getByText('Component fit not verified')).toBeInTheDocument();
  await user.click(
    screen.getByRole('button', { name: /Explore the parts list/ }),
  );
  expect(
    screen.getByRole('heading', { name: 'Plan your parts budget' }),
  ).toBeInTheDocument();
});

it('exposes assembly view selection and supports keyboard component selection', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Assembled' }));
  expect(screen.getByRole('button', { name: 'Assembled' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const lid = screen.getByRole('button', { name: 'Inspect vented lid' });
  lid.focus();
  await user.keyboard('{Enter}');
  expect(
    screen.getByRole('heading', { name: 'Vented lid' }),
  ).toBeInTheDocument();
  expect(lid).toHaveAttribute('aria-pressed', 'true');
});

it('saves a project and reopens it from the local library after remount', async () => {
  const user = userEvent.setup();
  const rendered = render(<App />);
  await user.click(screen.getByRole('button', { name: 'Save project' }));
  expect(screen.getByRole('status')).toHaveTextContent(
    'Saved in this browser.',
  );
  rendered.unmount();
  render(<App />);
  await user.click(screen.getByRole('button', { name: /Your projects/ }));
  const { vi } = await import('vitest');
  vi.spyOn(window, 'confirm').mockReturnValue(true);
  await user.click(
    screen.getByRole('button', { name: /Greenhouse field station.*Revision/ }),
  );
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    'Greenhouse field station',
  );
});

it('retains estimate history when a calculation is repeated', async () => {
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Feasibility' }));
  await user.click(screen.getByRole('button', { name: /Calculate estimate/ }));
  await user.clear(screen.getByLabelText('Battery capacity · Ah'));
  await user.type(screen.getByLabelText('Battery capacity · Ah'), '4');
  await user.click(screen.getByRole('button', { name: /Calculate estimate/ }));
  expect(screen.getByText('Estimate history (2)')).toBeInTheDocument();
});

it('prevents navigation from discarding form edits when the user cancels', async () => {
  const { vi } = await import('vitest');
  vi.spyOn(window, 'confirm').mockReturnValue(false);
  const user = userEvent.setup();
  render(<App />);
  await user.click(screen.getByRole('button', { name: 'Requirements' }));
  await user.type(screen.getByLabelText('Project name'), ' edited');
  await user.click(screen.getByRole('button', { name: 'Build' }));
  expect(
    screen.getByRole('heading', { name: 'What are you building?' }),
  ).toBeInTheDocument();
});
