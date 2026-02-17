const { MongoClient, ServerApiVersion } = require("mongodb");

let dbClient = null;

async function dbConnect() {
  const dbUrl = process.env.DATABASE_HOST;
  if (!dbUrl) {
    console.log("DATABASE_HOST environment variable not set");
    throw new Error("DATABASE_HOST environment variable not set");
  }

  const client = new MongoClient(dbUrl, {
    serverApi: {
      version: ServerApiVersion.v1,
    },
  });

  dbClient = await client.connect();
  console.log("Connected to MongoDB!");
}

function dbCollection(collectionName) {
  if (!dbClient) {
    throw new Error("MongoDB client is not initialized");
  }
  return dbClient.db("umikyodb").collection(collectionName);
}

function collection(table) {
  const col = dbCollection(table);
  if (!col) {
    console.log(`Couldn't find collection of ${table}`);
  }
  return col;
}

async function dbClose() {
  if (dbClient) {
    await dbClient.close();
    dbClient = null;
  }
}

module.exports = { dbConnect, dbClose, dbCollection, collection };
