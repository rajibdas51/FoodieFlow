import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import foodRouter from './routes/foodRoute.js';
dotenv.config();

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoint
app.use('/api/food', foodRouter);
app.get('/', (req, res) => {
  res.send('API working.');
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
