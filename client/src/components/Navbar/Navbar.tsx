'use client';
import { assets } from '@/assets/frontend_assets/assets';

import Image from 'next/image';
import React, { useState } from 'react';
const menuItems = [
  { name: 'Home', url: '/' },
  { name: 'Menu', url: '/menu' },
  { name: 'Mobile-app', url: '/mobile-app' },
  { name: 'Contact us', url: '/contact-us' },
];
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState('Home');

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
        <ul className='text-[18px] flex flex-row text-gray-800 list-none gap-5 justify-center space-x-8 '>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`cursor-pointer hover:text-orange-500 transition-colors ${
                item.name === activeMenu
                  ? 'text-orange-500 border-b-2 border-b-orange-500 transition-all'
                  : ''
              }`}
              onClick={() => setActiveMenu(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {/* Right icons section */}
        <div className='navbar-right flex-1 flex justify-end items-center gap-10 '>
          <Image
            src={assets.search_icon}
            alt='Search icon'
            width={24}
            height={24}
            className='cursor-pointer'
          />
          <div className='navbar-search-icon flex items-center space-x-4 relative'>
            <Image
              src={assets.basket_icon}
              alt='basket icon'
              width={24}
              height={24}
              className='cursor-pointer'
            />
            <div className='dot absolute min-w-2.5 min-h-2.5 bg-orange-500 rounded-md top-[-8px] left-3'></div>
            <button className='px-4 py-2  text-gray-800 rounded-[20px] border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors'>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
