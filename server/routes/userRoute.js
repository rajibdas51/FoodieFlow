import express from 'express';
import { loginUser, registerUser } from '../controllers/userController';

const useRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

export default userRouter;
