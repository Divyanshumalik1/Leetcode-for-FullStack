// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

// Turn every Requirement, UI state and Accessibility line in README.md into a test.
// Query like a user would: getByRole, getByLabelText, getByText.
describe({{TITLE_JS}}, () => {
  it('renders', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it.todo('requirement 1');
  it.todo('works with the keyboard only');
});
