import userModel from '../models/userModel.js';

// add items to user cart
const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const cartData = user.cartData || {};
    const { itemId } = req.body;

    cartData[itemId] = (cartData[itemId] || 0) + 1;
    await userModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({ success: true, message: 'Added to cart' });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: 'Error occurred while adding to cart',
    });
  }
};

// remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const cartData = user.cartData || {};
    const { itemId } = req.body;

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.userId, { cartData });

    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error occurred while removing item' });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    const cartData = user.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Error fetching cart data' });
  }
};

// sync guest cart → user.cartData
const syncCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    await userModel.findByIdAndUpdate(req.userId, { cartData: cartItems });
    res.json({ success: true, message: 'Cart synced' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Sync failed' });
  }
};

export { addToCart, removeFromCart, getCart, syncCart };
