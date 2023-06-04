/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';
import mockBlocks from './mockBlocks';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.json(mockBlocks);
});

app.get('/api/code-versions/:id', (req, res) => {
  const id = req.params.id;

  // TODO obviously fix will be fixed
  const codeBlock = mockBlocks.find(block => block.id === id);

  res.json(codeBlock);
});


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
