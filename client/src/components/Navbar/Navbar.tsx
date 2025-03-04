import { assets } from '@/assets/frontend_assets/assets';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <div className='container  mx-auto '>
      <div className='py-5 flex justify-between items-center  border-b-2 '>
        {/* Logo section */}
        <div className='flex-1'>
          <Image
            src={assets.logo}
            alt='FoodieFlow logo'
            width={0}
            height={0}
            className='w-50'
            quality={100}
          />
        </div>

        {/* Navigation links - centered */}
        <ul className='flex flex-row gap-4 justify-center space-x-8 py-10'>
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
