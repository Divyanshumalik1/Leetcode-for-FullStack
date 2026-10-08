import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

// One test per row of the API contract, plus the edge cases and failure modes in README.md.
describe({{TITLE_JS}}, () => {
  it('responds to the health check', async () => {
    const res = await request(createApp()).get('/health');
    expect(res.status).toBe(200);
  });

  it.todo('happy path');
  it.todo('rejects invalid input with 400');
  it.todo('handles concurrent requests correctly');
});
