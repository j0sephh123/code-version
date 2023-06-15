import express from 'express';
import * as path from 'path';
import mockBlocks from './mockBlocks';
import { connectDb } from './db';

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', async (_req, res) => {
  const db = await connectDb();

  const result = await db.collection('code-versions').insertOne({
    name: 'testing',
  });

  return res.json({ result: result.insertedId });
});

app.post('/snippets', async (req, res) => {
  const db = await connectDb();
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('name not provided');
  }

  // Check if the name already exists in the database
  const existingSnippet = await db.collection('snippets').findOne({ name });

  if (existingSnippet) {
    // If the name exists, return a 404 error
    return res.status(404).send('A snippet with this name already exists');
  }

  // If the name doesn't exist, insert the new snippet
  await db.collection('snippets').insertOne({ name });

  // Return the name of the created snippet
  return res.status(200).json({ name });
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
