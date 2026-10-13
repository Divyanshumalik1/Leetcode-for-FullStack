// CRUD API
// Run: npm run play -- <this folder> · Tests: npm run t -- <this folder>
import express from 'express';



export function createApp() {

  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => res.json({ ok: true }));

  // Build it here.
  const localStorage = new Map();
  app.use('', router(localStorage));

  return app;
}

function router(localStorage) {

  const router = express.Router();

  router.post('/tasks', (req, res) => {

    const body = req.body;
    const title = body.title.trim();
    const id = crypto.randomUUID();
    const done = body.done ?? false; //the double question mark operator is used to check if the value of body.done is null or undefined. If it is, then done will be set to false. If it is not, then done will be set to the value of body.done.
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    if (typeof done !== 'boolean') {
      res.status(400).json({ error: { message: 'Invalid request' } });
      return;
    }

    if (!title || typeof title !== 'string' || title.length > 200 || title.trim() == '') {
      res.status(400).json({ error: { message: 'Invalid request' } });
      return;
    }

    const task = { id, title, done, createdAt, updatedAt };

    localStorage.set(id, task);
    res.status(201).json(task);

  })

  // router.get('/tasks', (req, res) => {


  // });


  router.get('/tasks/:id', (req, res) => {

    const id = req.params.id;
    const task = localStorage.get(id);

    if (!id || !task) {
      res.status(404).json({ error: { message: 'Task not found' } });
      return;
    }

    res.json(task);
  });


  router.delete('/tasks/:id', (req, res) => {
    const id = req.params.id;
    const task = localStorage.get(id);
    
    if(!id || !task){
      res.status(404).json({ error: { message: 'Task not found' } });
      return;
    }

    localStorage.delete(id);
    res.status(204).send();

  });

  return router;

}
