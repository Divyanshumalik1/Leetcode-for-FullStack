import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

// A fresh app (and a fresh, empty store) for every test.
let app;
beforeEach(() => {
  app = createApp();
});

const create = (body) => request(app).post('/tasks').send(body);

describe('POST /tasks', () => {
  it('creates a task and returns 201 with the full task', async () => {
    const res = await create({ title: 'Buy milk' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ title: 'Buy milk', done: false });
    expect(typeof res.body.id).toBe('string');
    expect(Date.parse(res.body.createdAt)).not.toBeNaN();
    expect(res.body.updatedAt).toBe(res.body.createdAt);
  });

  it('gives every task a unique id', async () => {
    const a = await create({ title: 'A' });
    const b = await create({ title: 'B' });
    expect(a.body.id).not.toBe(b.body.id);
  });

  it('accepts done: true on create', async () => {
    const res = await create({ title: 'Already done', done: true });
    expect(res.status).toBe(201);
    expect(res.body.done).toBe(true);
  });

  it('trims the title', async () => {
    const res = await create({ title: '  Walk dog  ' });
    expect(res.body.title).toBe('Walk dog');
  });

  it('ignores fields the client should not set', async () => {
    const res = await create({ title: 'x', id: 'hack', createdAt: '1999-01-01T00:00:00.000Z' });
    expect(res.body.id).not.toBe('hack');
    expect(res.body.createdAt).not.toBe('1999-01-01T00:00:00.000Z');
  });

  it.each([
    ['missing', {}],
    ['empty', { title: '' }],
    ['only spaces', { title: '   ' }],
    ['not a string', { title: 42 }],
    ['too long (201 chars)', { title: 'a'.repeat(201) }],
  ])('returns 400 when the title is %s', async (_label, body) => {
    const res = await create(body);
    expect(res.status).toBe(400);
    expect(typeof res.body.error.message).toBe('string');
  });

  it('accepts a title of exactly 200 characters', async () => {
    const res = await create({ title: 'a'.repeat(200) });
    expect(res.status).toBe(201);
  });

  it('returns 400 when done is not a boolean', async () => {
    const res = await create({ title: 'x', done: 'true' });
    expect(res.status).toBe(400);
  });
});

describe('GET /tasks', () => {
  it('returns an empty list at first', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ data: [] });
  });

  it('lists tasks in creation order', async () => {
    await create({ title: 'first' });
    await create({ title: 'second' });
    const res = await request(app).get('/tasks');
    expect(res.body.data.map((t) => t.title)).toEqual(['first', 'second']);
  });

  it('filters by done', async () => {
    await create({ title: 'open' });
    await create({ title: 'closed', done: true });
    const done = await request(app).get('/tasks?done=true');
    const open = await request(app).get('/tasks?done=false');
    expect(done.body.data.map((t) => t.title)).toEqual(['closed']);
    expect(open.body.data.map((t) => t.title)).toEqual(['open']);
  });

  it('returns 400 for an invalid done filter', async () => {
    const res = await request(app).get('/tasks?done=maybe');
    expect(res.status).toBe(400);
  });
});

describe('GET /tasks/:id', () => {
  it('returns the task', async () => {
    const { body: task } = await create({ title: 'Read' });
    const res = await request(app).get(`/tasks/${task.id}`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(task);
  });

  it('returns 404 for an unknown id', async () => {
    const res = await request(app).get('/tasks/does-not-exist');
    expect(res.status).toBe(404);
    expect(typeof res.body.error.message).toBe('string');
  });
});

describe('PATCH /tasks/:id', () => {
  afterEach(() => vi.useRealTimers());

  it('updates done and title, and bumps updatedAt only', async () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date('2026-01-01T10:00:00.000Z'));
    const { body: task } = await create({ title: 'Old' });

    vi.setSystemTime(new Date('2026-01-01T11:00:00.000Z'));
    const res = await request(app).patch(`/tasks/${task.id}`).send({ title: '  New  ', done: true });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: task.id, title: 'New', done: true, createdAt: task.createdAt });
    expect(res.body.updatedAt).toBe('2026-01-01T11:00:00.000Z');

    const again = await request(app).get(`/tasks/${task.id}`);
    expect(again.body).toEqual(res.body);
  });

  it('updates only the fields that were sent', async () => {
    const { body: task } = await create({ title: 'Keep me' });
    const res = await request(app).patch(`/tasks/${task.id}`).send({ done: true });
    expect(res.body.title).toBe('Keep me');
    expect(res.body.done).toBe(true);
  });

  it('never changes the id', async () => {
    const { body: task } = await create({ title: 'x' });
    const res = await request(app).patch(`/tasks/${task.id}`).send({ id: 'hack', done: true });
    expect(res.body.id).toBe(task.id);
  });

  it('returns 400 when there is nothing to update', async () => {
    const { body: task } = await create({ title: 'x' });
    const res = await request(app).patch(`/tasks/${task.id}`).send({});
    expect(res.status).toBe(400);
  });

  it('validates the same way as create', async () => {
    const { body: task } = await create({ title: 'x' });
    const badTitle = await request(app).patch(`/tasks/${task.id}`).send({ title: '   ' });
    const badDone = await request(app).patch(`/tasks/${task.id}`).send({ done: 'yes' });
    expect(badTitle.status).toBe(400);
    expect(badDone.status).toBe(400);
  });

  it('returns 404 for an unknown id', async () => {
    const res = await request(app).patch('/tasks/nope').send({ done: true });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /tasks/:id', () => {
  it('deletes the task and returns 204 with no body', async () => {
    const { body: task } = await create({ title: 'Bye' });
    const res = await request(app).delete(`/tasks/${task.id}`);
    expect(res.status).toBe(204);
    expect(res.text).toBe('');

    const after = await request(app).get(`/tasks/${task.id}`);
    expect(after.status).toBe(404);
  });

  it('returns 404 the second time', async () => {
    const { body: task } = await create({ title: 'Bye' });
    await request(app).delete(`/tasks/${task.id}`);
    const res = await request(app).delete(`/tasks/${task.id}`);
    expect(res.status).toBe(404);
  });
});

describe('errors', () => {
  it('returns 400 JSON for malformed JSON instead of crashing', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Content-Type', 'application/json')
      .send('{"title": "oops"');
    expect(res.status).toBe(400);
    expect(typeof res.body.error.message).toBe('string');
  });

  it('returns 404 JSON for unknown routes', async () => {
    const res = await request(app).get('/nothing-here');
    expect(res.status).toBe(404);
    expect(typeof res.body.error.message).toBe('string');
  });

  it('keeps each app instance separate', async () => {
    await create({ title: 'only in this app' });
    const other = await request(createApp()).get('/tasks');
    expect(other.body.data).toEqual([]);
  });
});