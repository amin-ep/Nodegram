import app from './app.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';
config({ path: './config.env' });

const DB = process.env.DATABASE;
const port = process.env.PORT || 3000;

mongoose.connect(DB).catch(err => console.log(err));

app.listen(port, () => {
  console.log(process.env.NODE_ENV);
  console.log(`App is running on port:${port}`);
});
