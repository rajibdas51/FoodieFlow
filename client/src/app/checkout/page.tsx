'use client';
import { useCart } from '@/hooks/useCart';
import React from 'react';

const CheckoutPage = () => {
  const { subtotal, total, deliveryFee, isEmpty } = useCart();
  return (
    <div className='mx-auto'>
      <h1 className='text-6xl text-gray-800 font-bold text-center my-6'>
        Checkout
      </h1>
      <form className='place-order container mx-auto flex flex-col md:flex-row justify-between py-10 px-2'>
        <div className='place-order-left w-full md:max-w-1/3'>
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
                className='mb-3 mt-2 p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
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
                className='mb-3 mt-2 p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
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
              className='mb-3 mt-2 p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
              type='email'
              name=''
              id=''
              placeholder='Email address'
              required
            />
          </div>
          <div className='my-3'>
            <label htmlFor='email' className='text-gray-600 font-semibold'>
              Phone <span className='text-red-500'>*</span>
            </label>
            <input
              className='mb-3 mt-2 p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
              type='phone'
              name='phone'
              id='phone'
              placeholder='PHone number'
              required
            />
          </div>

          <div className='my-3'>
            <label
              htmlFor='country'
              className='text-gray-600 font-semibold pb-2'
            >
              Country/Region <span className='text-red-500'>*</span>
            </label>
            <select
              name='country'
              id='country'
              className='mb-3 mt-3 p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
              required
              defaultValue='Bangladesh'
            >
              <option value='Bangladesh'>Bangladesh</option>
              <option value='India'>India</option>
              <option value='Pakistan'>Pakistan</option>
              <option value='United States'>United States</option>
              <option value='United Kingdom'>United Kingdom</option>
              <option value='Canada'>Canada</option>
              <option value='Australia'>Australia</option>
              <option value='Germany'>Germany</option>
              <option value='France'>France</option>
              <option value='Italy'>Italy</option>
              <option value='Japan'>Japan</option>
              <option value='China'>China</option>
              <option value='South Korea'>South Korea</option>
              <option value='Singapore'>Singapore</option>
              <option value='Malaysia'>Malaysia</option>
              <option value='Indonesia'>Indonesia</option>
              <option value='Thailand'>Thailand</option>
              <option value='Vietnam'>Vietnam</option>
              <option value='Saudi Arabia'>Saudi Arabia</option>
              <option value='UAE'>UAE</option>
            </select>
          </div>
          <div>
            <label htmlFor='street' className='text-gray-600 font-semibold'>
              Street address<span className='text-red-500'>*</span>
            </label>
            <input
              className='mb-3 mt-2  p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
              type='text'
              name=''
              id=''
              placeholder='Street'
            />
          </div>
          <div className='flex flex-row gap-4 py-3'>
            <div>
              <label htmlFor='city' className='text-gray-600 font-semibold'>
                City<span className='text-red-500'>*</span>
              </label>
              <input
                className='mb-3 mt-2 p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
                type='text'
                placeholder='City'
                required
              />
            </div>
            <div>
              <label htmlFor='name' className='text-gray-600 font-semibold'>
                State
              </label>
              <input
                className='mb-3 mt-2  p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
                type='text'
                placeholder='State'
                required
              />
            </div>
          </div>

          <div className='multi-fields'>
            <label htmlFor='name' className='text-gray-600 font-semibold'>
              State
            </label>
            <input
              className='mb-3 mt-2  p-[10px] rounded-md w-full outline-orange-500 border-[#c5c5c5] border-1'
              type='text'
              placeholder='Zip code'
            />
          </div>
        </div>
        <div className='place-order-right w-full  md:w-1/2'>
          <div className='w-full  flex flex-col gap-5 px-2 md:px-2'>
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
