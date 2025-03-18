'use client';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '@/redux/slices/cartSlice';
const CartPage = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { foodList } = useSelector((state: RootState) => state.food);
  const dispatch = useDispatch();
  return (
    <div className='container mx-auto'>
      <div className='cart mt-[100px]'>
        <div className='cart-items'>
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
          {foodList.map((item, index) => {
            {
              if (cartItems[item._id] > 0) {
                return (
                  <div>
                    <div
                      className='cart-items-title cart-items-item cart-items-title grid grid-cols-6 gap-4 items-center text-center text-gray-600 font-semibold mb-3  justify-center my-2'
                      key={index}
                    >
                      <Image
                        src={item.image}
                        width={100}
                        height={100}
                        alt={item.name}
                        className='rounded-sm'
                      />
                      <p>{item.name}</p>
                      <p>${item.price}</p>
                      <p>{cartItems[item._id]}</p>
                      <p>{item.price * cartItems[item._id]}</p>
                      <p className='text-2l'>
                        <FaTimes
                          onClick={() => dispatch(removeFromCart(item._id))}
                          className='text-orange-600 text-xl cursor-pointer'
                        />{' '}
                      </p>
                    </div>
                    <hr />
                  </div>
                );
              }
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
