// {{TITLE}}
// Run: npm run play -- <this folder> · Tests: npm run t -- <this folder>
import express from 'express';

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ ok: true }));

  // Build it here.

  return app;
}
