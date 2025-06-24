import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Database from './Database.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Book Server API!');
});
Database();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
