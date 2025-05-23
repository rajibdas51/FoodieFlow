import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  addToCart,
  getCart,
  removeFromCart,
  syncCart,
} from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.get('/get', authMiddleware, getCart);
cartRouter.delete('/remove', authMiddleware, removeFromCart);
cartRouter.post('/sync', authMiddleware, syncCart);

export default cartRouter;
