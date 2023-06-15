import express from 'express';
import * as path from 'path';
import mockBlocks from './mockBlocks';
import { connectDb } from './db';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', async (_req, res) => {
  const db = await connectDb();

  const result = await db.collection('code-versions').insertOne({
    name: 'testing',
  });

  return res.json({ result: result.insertedId });
});

app.get('/api', (req, res) => {
  res.json(mockBlocks);
});

app.get('/api/code-versions/:id', (req, res) => {
  const id = req.params.id;

  const codeBlock = mockBlocks.find((block) => block.id === id);

  res.json(codeBlock);
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
