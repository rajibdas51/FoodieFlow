import React from 'react';
import { menu_list } from '@/assets/frontend_assets/assets';
import Image from 'next/image';
const ExploreMenu = () => {
  return (
    <div>
      <div
        className='container mx-auto flex flex-col gap:20px mt-[40px] lg:-mt-15 '
        id='explore-menu'
      >
        <div className='flex flex-col items-center justify-center my-10'>
          <h1 className='text-gray-800 font-bold text-2xl  lg:text-5xl'>
            Explore Menu
          </h1>
          <p className='px-2 text-center py-3 lg:max-w-[60%] md:pt-6 text-gray-700 items-center justify-center'>
            Explore our menu and discover delicious dishes for every craving.
            From appetizers to desserts, order your favorites with ease!
          </p>
        </div>

        <div className='explore-menu-list flex justify-between items-center gap-7 my-5 overflow-x-scroll scrollbar-hide '>
          {menu_list.map((menu, index) => {
            return (
              <div key={index} className='items-center justify-center'>
                <div className=' items-center justify-center'>
                  <Image
                    src={menu.menu_image}
                    width={100}
                    height={100}
                    alt={menu.menu_name}
                    objectFit='contain'
                    quality={100}
                    className='md:w-[7.5vw] min-w-[80px] w-[15vw] cursor-pointer rounded-md'
                  />
                </div>
                <div className=' flex items-center justify-center py-3'>
                  <h2 className='items-center text-gray-600 font-semibold'>
                    {menu.menu_name}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
        <hr className='my-2 h-[2px] bg-gray-400 border-none' />
      </div>
    </div>
  );
};

export default ExploreMenu;
