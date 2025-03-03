import { assets } from '@/assets/frontend_assets/assets';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <div className='container my-[50px] py-6  bg-amber-500'>
      <div className=' flex justify-between items-center  border-b-2 '>
        {/* Logo section */}
        <div className='flex-1'>
          <h1 className='text-xl font-bold py-6'>FoodieFlow</h1>
        </div>

        {/* Navigation links - centered */}
        <ul className='flex flex-row gap-4 justify-center space-x-8 py-6'>
          <li className='cursor-pointer hover:text-orange-500 transition-colors'>
            Home
          </li>
          <li className='cursor-pointer hover:text-orange-500 transition-colors'>
            Menu
          </li>
          <li className='cursor-pointer hover:text-orange-500 transition-colors'>
            Mobile-app
          </li>
          <li className='cursor-pointer hover:text-orange-500 transition-colors'>
            Contact us
          </li>
        </ul>

        {/* Right icons section */}
        <div className='navbar-right flex-1 flex justify-end items-center space-x-4'>
          <Image
            src={assets.search_icon}
            alt='Search icon'
            width={24}
            height={24}
            className='cursor-pointer'
          />
          <div className='navbar-search-icon flex items-center space-x-4'>
            <Image
              src={assets.basket_icon}
              alt='basket icon'
              width={24}
              height={24}
              className='cursor-pointer'
            />
            <div className='dot'></div>
            <button className='px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors'>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
