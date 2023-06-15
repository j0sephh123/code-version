import express from 'express';
import * as path from 'path';
import mockBlocks from './mockBlocks';
import { connectDb } from './db';
import { ObjectId } from 'mongodb';

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', async (_req, res) => {
  const db = await connectDb();

  // Find all snippets
  const snippets = await db.collection('snippets').find().toArray();

  // For each snippet, count the number of versions
  const snippetsWithVersionCount = await Promise.all(snippets.map(async snippet => {
    const versionCount = await db.collection('versions').countDocuments({ snippetId: snippet._id });
    return { ...snippet, versionCount };
  }));

  return res.json(snippetsWithVersionCount);
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

app.put('/snippets/:id/add-version', async (req, res) => {
  const db = await connectDb();
  const { id } = req.params;
  const { version, status, code, explanation } = req.body;

  // Validate provided data
  if (!version || !status || !code || !explanation) {
    return res.status(400).send('Incomplete version data provided');
  }

  // Validate the provided snippet ID
  let snippet;
  try {
    snippet = await db
      .collection('snippets')
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    return res.status(400).send('Invalid snippet ID provided');
  }

  // If the snippet doesn't exist, return a 404 error
  if (!snippet) {
    return res.status(404).send('Snippet not found');
  }

  // Check if the version already exists
  const existingVersion = await db
    .collection('versions')
    .findOne({ snippetId: new ObjectId(id), version });

  if (existingVersion) {
    return res.status(409).send('This version already exists for the snippet');
  }

  // Add the new version
  const newVersion = {
    snippetId: new ObjectId(id),
    version,
    status,
    code,
    explanation,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection('versions').insertOne(newVersion);

  return res.status(200).json({ versionId: result.insertedId });
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
