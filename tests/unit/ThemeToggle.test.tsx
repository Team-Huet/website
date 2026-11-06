import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ThemeToggle } from '@/components/ui/ThemeToggle/ThemeToggle';

const theme = vi.hoisted(() => ({ resolvedTheme: 'dark', setTheme: vi.fn() }));
vi.mock('next-themes', () => ({ useTheme: () => theme }));

describe('controle de tema', () => {
  it.each([
    ['dark', 'light'],
    ['light', 'dark'],
  ])('alterna de %s para %s com clique', async (current, expected) => {
    theme.resolvedTheme = current;
    render(<ThemeToggle label="Alternar tema" />);
    await userEvent.click(
      screen.getByRole('button', { name: 'Alternar tema' }),
    );
    expect(theme.setTheme).toHaveBeenCalledExactlyOnceWith(expected);
  });

  it('é acionável por teclado e preserva o nome traduzido', async () => {
    theme.resolvedTheme = 'light';
    const user = userEvent.setup();
    render(<ThemeToggle label="Switch theme" />);
    await user.tab();
    expect(screen.getByRole('button', { name: 'Switch theme' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(theme.setTheme).toHaveBeenCalledExactlyOnceWith('dark');
  });
});
