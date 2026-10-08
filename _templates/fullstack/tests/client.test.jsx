// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../client/App.jsx';

afterEach(() => vi.unstubAllGlobals());

describe({{TITLE_JS}}, () => {
  it('shows the API status', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => Promise.resolve({ ok: true }) }));
    render(<App />);
    expect(await screen.findByText(/server up/)).toBeInTheDocument();
  });

  it.todo('core feature 1 — UI');
});
