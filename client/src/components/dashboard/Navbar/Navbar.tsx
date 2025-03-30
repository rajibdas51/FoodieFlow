import { assets } from '@/assets/admin_assets/assets';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <div>
      <div className=' flex justify-between items-center bg-red shadow-md p-4'>
        <Image
          src={assets.logo}
          alt='Logo'
          width={100}
          height={100}
          quality={100}
          className='w-36'
        />
        <Image
          src={assets.profile_image}
          alt='Logo'
          width={50}
          height={50}
          className=''
          quality={100}
        />
      </div>
    </div>
  );
};

export default Navbar;
