import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: 'Unauthorized user. Please login and try again.',
    });
  }
  try {
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded_token.id;
    next();
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: 'Error in token verification. Please login and try again.',
    });
  }
};

export default authMiddleware;
