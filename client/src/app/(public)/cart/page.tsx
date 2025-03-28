'use client';

import Image from 'next/image';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '@/redux/slices/cartSlice';
import { useCart } from '@/hooks/useCart';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cartProducts, subtotal, total, deliveryFee, isEmpty } = useCart();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  // Handle item removal
  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div className='container mx-auto'>
      <div className='cart mt-[100px]'>
        {/* Cart Header */}
        <div className='cart-items px-1'>
          <div className='cart-items-title grid grid-cols-6 gap-4 items-center text-center text-gray-600 font-semibold'>
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />

          {/* Cart Items or Empty Message */}
          {isEmpty ? (
            <div className='text-center py-10'>
              <p className='text-gray-500'>Your cart is empty</p>
            </div>
          ) : (
            cartProducts.map((item) => (
              <div key={item._id}>
                <div className='grid grid-cols-6 gap-4 items-center text-center text-gray-600 font-semibold mb-3 justify-center my-2'>
                  <Image
                    src={item.image}
                    width={100}
                    height={100}
                    alt={item.name}
                    className='rounded-sm'
                  />
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                  <p>{item._id in cartItems ? cartItems[item._id] : 0}</p>
                  <p>
                    $
                    {(
                      (item._id in cartItems ? cartItems[item._id] : 0) *
                      item.price
                    ).toFixed(2)}
                  </p>
                  <p className='text-2l'>
                    <FaTimes
                      onClick={() => handleRemoveItem(item._id)}
                      className='text-orange-600 text-xl cursor-pointer'
                    />
                  </p>
                </div>
                <hr />
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        <div className='mt-[80px] flex flex-col-reverse md:flex-row justify-between gap-20 mb-6 lg:mb-10'>
          <div className='w-full md:w-2/3 flex flex-col gap-5 px-2 md:px-2'>
            <h2 className='text-2xl font-bold'>Cart Totals</h2>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between text-gray-600'>
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <hr />
              <div className='flex justify-between text-gray-600'>
                <p>Delivery Fee</p>
                <p>${deliveryFee.toFixed(2)}</p>
              </div>
              <hr />

              <div className='flex justify-between text-gray-600 font-bold'>
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>
              <hr />

              <button
                className={`text-white bg-orange-500 w-[210px]  py-3 rounded-md  my-4 ${
                  isEmpty ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                disabled={isEmpty}
                onClick={() => router.push('/checkout')}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>

          {/* Promo Code Section */}
          <div className='w-full md:w-1/3 flex flex-col md:items-center px-2'>
            <p className='text-gray-600 text-lg'>
              If you have any promo code, Enter it here
            </p>
            <div className='mt-3 flex flex-row justify-between items-center bg-[#eaeaea] rounded-md'>
              <input
                className='bg-transparent outline-none pl-3 w-full py-3'
                type='text'
                placeholder='Promo Code'
              />
              <button className='w-[150px] py-3 px-[5px] cursor-pointer bg-black text-white font-bold rounded-2xl'>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
