import { assets } from '@/assets/frontend_assets/assets';
import Image from 'next/image';
import React from 'react';

const AppDownload = () => {
  return (
    <div
      className='m-auto my-[100px] lg:my-[130px] text-center '
      id='app-download'
    >
      <h3 className='text-3xl lg:text-6xl font-bold tracking-light '>
        For Better Experience Download
      </h3>
      <h3 className='text-3xl lg:text-6xl font-bold tracking-light pt-3'>
        <span className='inline-block text-orange-500'>FoodieFlow</span> App
      </h3>
      <div className='flex justify-center space-x-5 py-5 '>
        <Image
          src={assets.play_store}
          alt='Play Store'
          width={100}
          height={100}
          quality={100}
          className='w-[150px] max-w-[180px] cursor-pointer'
        />
        <Image
          src={assets.app_store}
          alt='Play Store'
          width={100}
          height={100}
          quality={100}
          className='w-[150px] max-w-[180px] cursor-pointer'
        />
      </div>
    </div>
  );
};

export default AppDownload;
