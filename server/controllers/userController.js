import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import validator from 'validator';

// login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User doesn't exist!" });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      return res.json({ success: false, message: 'Invalid credentials!' });
    }
    const token = createToken(user._id);
    let newUser = { name: user.name, email: user.email, token: token };
    res.json({ success: true, message: 'Login Successfull!', user: newUser });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Failed to login user!' });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
// register user

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('register api hit!');
  try {
    // checking if user exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: 'User already exists' });
    } else {
      // validating email
      if (!validator.isEmail(email)) {
        return res.json({
          success: false,
          message: 'Please enter a valid email',
        });
      }
      if (password.length < 6) {
        return res.json({
          success: false,
          message: 'Please enter a strong password!',
        });
      }
      // hashing password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
      });
      const user = await newUser.save();
      const token = createToken(user._id);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Failed to register user!' });
  }
};

export { loginUser, registerUser };
