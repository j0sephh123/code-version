import express from 'express';
import * as path from 'path';
import mockBlocks from './mockBlocks';
import { connectDb } from './db';
import { ObjectId } from 'mongodb';

const app = express();

app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// all snippets
// @fe
app.get('/api', async (_req, res) => {
  const db = await connectDb();

  // Find all snippets
  const snippets = await db.collection('snippets').find().toArray();

  // For each snippet, count the number of versions
  const snippetsWithVersionCount = await Promise.all(
    snippets.map(async (snippet) => {
      const versionCount = await db
        .collection('versions')
        .countDocuments({ snippetId: snippet._id });
      return { ...snippet, versionCount };
    })
  );

  console.log(snippetsWithVersionCount);

  return res.json(snippetsWithVersionCount);
});

// one snippet
// @fe
app.get('/api/snippets/:id', async (req, res) => {
  const db = await connectDb();
  const { id } = req.params;

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

  // Find all versions related to this snippet
  const versions = await db
    .collection('versions')
    .find({ snippetId: new ObjectId(id) })
    .toArray();

  return res.json({ snippet, versions });
});

// create a snippet
// @fe
app.post('/api/snippets', async (req, res) => {
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

// add a version to a snippet
// @insomnia
app.put('/api/snippets/:id/add-version', async (req, res) => {
  const db = await connectDb();
  const { id } = req.params;
  const { version, status, code, explanation, title } = req.body;

  // Validate provided data
  if (!version || !status || !code || !explanation || !title) {
    return res.status(400).send('Incomplete version data provided');
  }

  // Check if the version is less than or equal to 0
  if (version <= 0) {
    return res.status(400).send('Version must be greater than 0');
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

  // Find the highest existing version number for this snippet
  const maxExistingVersion = await db
    .collection('versions')
    .find({ snippetId: new ObjectId(id) })
    .sort({ version: -1 })
    .limit(1)
    .toArray();

  const maxVersionNumber = maxExistingVersion[0]
    ? maxExistingVersion[0].version
    : 0;

  // Check if the provided version is exactly one more than the max existing version
  if (version !== maxVersionNumber + 1) {
    return res
      .status(400)
      .send('Version must be exactly one more than the latest version');
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

// delete last version from a snippet
// @insomnia
app.delete('/api/snippets/:id/:versionId', async (req, res) => {
  const db = await connectDb();
  const { id, versionId } = req.params;

  // Validate the provided snippet ID and version ID
  let snippet, version;
  try {
    snippet = await db
      .collection('snippets')
      .findOne({ _id: new ObjectId(id) });
    version = await db
      .collection('versions')
      .findOne({ _id: new ObjectId(versionId) });
  } catch (error) {
    return res.status(400).send('Invalid snippet ID or version ID provided');
  }

  // If the snippet or version doesn't exist, return a 404 error
  if (!snippet || !version) {
    return res.status(404).send('Snippet or version not found');
  }

  // Check if the version belongs to the snippet
  if (!version.snippetId.equals(snippet._id)) {
    return res.status(400).send('The version does not belong to the snippet');
  }

  // Find the highest existing version number for this snippet
  const maxExistingVersion = await db
    .collection('versions')
    .find({ snippetId: new ObjectId(id) })
    .sort({ version: -1 })
    .limit(1)
    .toArray();

  const maxVersionNumber = maxExistingVersion[0]
    ? maxExistingVersion[0].version
    : 0;

  // Check if the provided version is the highest version
  if (version.version !== maxVersionNumber) {
    return res.status(400).send('Only the highest version can be deleted');
  }

  // Delete the version
  await db.collection('versions').deleteOne({ _id: new ObjectId(versionId) });

  return res.status(200).send('Version deleted');
});

// clear db
app.delete('/clear-db', async (_req, res) => {
  const db = await connectDb();

  // Delete all documents from the snippets collection
  await db.collection('snippets').deleteMany({});

  // Delete all documents from the versions collection
  await db.collection('versions').deleteMany({});

  return res.status(200).send('Database cleared');
});

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
