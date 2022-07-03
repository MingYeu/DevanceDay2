import { MongoClient } from "mongodb";
import nextConnect from "next-connect";

const { MONGO_URI, MONGO_DB } = process.env;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function database(req, res, next) {  
  await client.connect();

  req.dbClient = client;
  req.db = client.db(MONGO_DB);

  return next();
}

const middleware = nextConnect();
middleware.use(database);

export default middleware;
