import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

// Load environment variables from a .env file if needed
const MONGODB_URI = process.env.MONGODB_URI;
           
const DB_NAME = 'streamcheck';

let client;
let db;

async function connectDB() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);

    try {
      await client.connect();
      db = client.db(DB_NAME);
      console.log(`✅ Connected to MongoDB database: ${DB_NAME}`);
    } catch (err) {
      console.error('❌ Error al conectar a MongoDB:', err);
      process.exit(1);
    }
  }

  return db;
}

export default connectDB;