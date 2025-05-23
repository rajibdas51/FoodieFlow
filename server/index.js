import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
// Set up CORS with your Vercel frontend URL
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    allowedHeaders: ['Content-Type', 'token'],
  })
);

// db connection
connectDB();

// api endpoint
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/users', userRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
  res.send('API working.');
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
