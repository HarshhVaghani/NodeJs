// MongoDB CRUD Operations Using Mongoose and Express

import express from 'express';
import router from './src/routes/routes.students.js';
import dotenv from 'dotenv'
import { connectDB } from './src/db/db.js';

dotenv.config({
  path:'./.env'
})

const app = express();

const port = process.env.PORT

connectDB();

app.listen(port , (err) => {
  console.log('server start on port 6030');
})