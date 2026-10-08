import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../server/app.js';

describe({{TITLE_JS}}, () => {
  it('responds to the health check', async () => {
    const res = await request(createApp()).get('/api/health');
    expect(res.status).toBe(200);
  });

  it.todo('core feature 1 — API');
});
