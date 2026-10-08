// {{TITLE}} — server
import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (req, res) => res.json({ ok: true }));

  // Build the API here.

  return app;
}
