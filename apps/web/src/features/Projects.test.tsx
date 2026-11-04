import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { Projects } from './Projects';
import { newProject } from '../domain';

it('reviews a valid imported project and assigns a new identity', async () => {
  const user = userEvent.setup();
  const onOpen = vi.fn();
  const original = newProject(true);
  render(<Projects saved={[]} onOpen={onOpen} />);
  await user.upload(
    screen.getByLabelText('Import project'),
    new File([JSON.stringify(original)], 'project.json', {
      type: 'application/json',
    }),
  );
  expect(
    await screen.findByRole('heading', { name: /Review import/ }),
  ).toBeInTheDocument();
  expect(onOpen).not.toHaveBeenCalled();
  await user.click(screen.getByRole('button', { name: 'Open imported copy' }));
  expect(onOpen.mock.calls[0][0].id).not.toBe(original.id);
  expect(onOpen.mock.calls[0][0].project).toEqual(original.project);
});
it('rejects an invalid file without changing the active project', async () => {
  const user = userEvent.setup();
  const onOpen = vi.fn();
  render(<Projects saved={[]} onOpen={onOpen} />);
  await user.upload(
    screen.getByLabelText('Import project'),
    new File(['{"formatVersion":99}'], 'bad.json', {
      type: 'application/json',
    }),
  );
  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Unsupported or invalid',
  );
  expect(onOpen).not.toHaveBeenCalled();
});
