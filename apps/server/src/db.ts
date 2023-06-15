// packages/db/src/mongoDbConnector.ts
import { MongoClient, Db } from 'mongodb';

const connectionString =
  process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017';

const client = new MongoClient(connectionString);
let db: Db | null = null;

export const connectDb = async (): Promise<Db> => {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME || 'code-versions-db-dev');
  }

  return db;
};
