'use client';
import { useCart } from '@/hooks/useCart';
import React from 'react';

const CheckoutPage = () => {
  const { subtotal, total, deliveryFee, isEmpty } = useCart();
  return (
    <div className='mx-auto'>
      <form className='place-order container mx-auto flex flex-row justify-between'>
        <div className='place-order-left w-full max-w-1/3'>
          <h2 className='text-3xl font-bold mb-12'>Delivery Information</h2>
          <div className='flex flex-row gap-4'>
            <div>
              <label
                htmlFor='first name'
                className='text-gray-600 font-semibold'
              >
                First name<span className='text-red-500'>*</span>
              </label>
              <input
                className='mb-3 p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
                type='text'
                placeholder='First name'
                required
              />
            </div>
            <div>
              <label htmlFor='name' className='text-gray-600 font-semibold'>
                Last name<span className='text-red-500'>*</span>
              </label>
              <input
                className='mb-3 p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
                type='text'
                placeholder='Last name'
                required
              />
            </div>
          </div>
          <div className='my-3'>
            <label htmlFor='email' className='text-gray-600 font-semibold'>
              Email address <span className='text-red-500'>*</span>
            </label>
            <input
              className='mb-3 p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
              type='email'
              name=''
              id=''
              placeholder='Email address'
              required
            />
          </div>
          <div className='my-3'>
            <label htmlFor='email' className='text-gray-600 font-semibold'>
              Country/Region <span className='text-red-500'>*</span>
            </label>
          </div>

          <input type='text' name='' id='' placeholder='Street' />
          <div className='multi-fields'>
            <input type='text' placeholder='City' />
            <input type='text' placeholder='State' />
          </div>
          <div className='multi-fields'>
            <input type='text' placeholder='Zip code' />
            <input type='text' placeholder='Country' />
          </div>
          <input type='text' name='' id='' placeholder='Phone' />
        </div>
        <div className='place-order-right w-1/2'>
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
                className={`text-white bg-orange-500 w-[210px]  py-3 rounded-md cursor-pointer my-4 ${
                  isEmpty ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={isEmpty}
              >
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
