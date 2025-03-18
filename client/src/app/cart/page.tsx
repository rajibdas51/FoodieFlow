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
        {/*-------cart bottom--------*/}
        <div className='mt-[80px] flex  flex-col-reverse md:flex-row  justify-between gap-20  mb-6 lg:mb-10'>
          <div className='w-full md:w-2/3 flex flex-col gap-5 px-2 md:px-2'>
            <h2 className='text-2xl font-bold'>Cart Totals</h2>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-between text-gray-600'>
                <p>Subtotal</p>
                <p>{0}</p>
              </div>
              <hr />
              <div className='flex justify-between text-gray-600'>
                <p>Delivery Fee</p>
                <p>{2}</p>
              </div>
              <hr />

              <div className='flex justify-between text-gray-600'>
                <p>Total</p>
                <p>{0}</p>
              </div>
              <hr />

              <button className='text-white bg-orange-500 w-[200px] py-3 rounded-md cursor-pointer my-4'>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
          <div className=' w-full md:w-1/3 flex flex-col md:items-center px-2'>
            <p className='text-gray-600 text-lg'>
              If you have any promo code, Enter it here
            </p>
            <div className='mt-3 flex flex-row justify-between items-center bg-[#eaeaea] rounded-md'>
              <input
                className='bg-transparent outline-none pl-3 '
                type='text'
                placeholder='Promo Code'
              />
              <button className='w-[150px] py-3 px-[5px] cursor-pointer  bg-black text-white text font-bold rounded-2xl '>
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
