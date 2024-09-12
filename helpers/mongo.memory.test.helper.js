import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../app.js';

let mongoServer;
let server;

export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  server = app.listen();
};
export const clearData = async () => {
  await mongoose.connection.db.dropDatabase();
};

export const disconnect = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  server.close();
};
