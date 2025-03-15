import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/assets/frontend_assets/assets';
import {
  FaFacebook,
  FaInbox,
  FaInstagram,
  FaPhone,
  FaYoutube,
} from 'react-icons/fa';
import { FaLocationDot, FaX } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className='bg-gray-800 border-t'>
      <div className='container  mx-auto px-6 md:px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5  justify-center gap-8'>
        <div className=' mx-auto'>
          <Link href='/' className=' pb-4'>
            <Image
              src={assets.logo}
              alt='FoodieFlow Logo'
              width={150}
              height={40}
            />
          </Link>

          <p className='text-gray-300 text-[17px] max-w-md mt-5'>
            Welcome to FoodieFlow, your ultimate food ordering destination. We
            connect food lovers with their favorite local restaurants, offering
            a seamless ordering experience with real-time tracking and swift
            delivery. From street food to fine dining, discover the perfect meal
            for every moment, all at your fingertips.
          </p>

          <div className='flex flex-row items-center space-x-4 pt-3'>
            <Link href='https://facebook.com' className=''>
              <FaFacebook className='text-gray-300 hover:text-blue-500 text-3xl ' />
            </Link>
            <Link href='https://instagram.com' className=''>
              <FaInstagram className='text-gray-300 hover:text-red-500 text-3xl' />
            </Link>
            <Link href='https://twitter.com' className=''>
              <FaX className='text-gray-300 hover:text-black text-3xl' />
            </Link>
            <Link href='https://linkedin.com' className=''>
              <FaYoutube className='text-gray-300 hover:text-red-500 text-3xl' />
            </Link>
          </div>
        </div>
        <div id='our-menus' className='md:mx-auto'>
          <h3 className='font-semibold text-xl mb-4 text-gray-300 '>
            Our Menus
          </h3>
          <div className='w-[60px] border-b-3 border-orange-500 items-start mt-1 mb-4'></div>
          <ul className='space-y-2 text'>
            <li>
              <Link
                href='#explore-menu'
                className='text-gray-300 hover:text-white'
              >
                Salad
              </Link>
            </li>
            <li>
              <Link
                href='#explore-menu'
                className='text-gray-300 hover:text-white'
              >
                Rolls
              </Link>
            </li>
            <li>
              <Link
                href='#explore-menu'
                className='text-gray-300 hover:text-white'
              >
                Deserts
              </Link>
            </li>
            <li>
              <Link
                href='#explore-menu'
                className='text-gray-300 hover:text-white'
              >
                Sandwich
              </Link>
            </li>
            <li>
              <Link
                href='#explore-menu'
                className='text-gray-300 hover:text-white'
              >
                Cake
              </Link>
            </li>
            <li>
              <Link
                href='#explore-menu'
                className='text-gray-300 hover:text-white'
              >
                Pure Veg
              </Link>
            </li>
            <li>
              <Link
                href='#explore-menu'
                className='text-gray-300 hover:text-white'
              >
                Pasta
              </Link>
            </li>
            <li>
              <Link
                href='#explore-menu'
                className='text-gray-300 hover:text-white'
              >
                Noodles
              </Link>
            </li>
          </ul>
        </div>
        <div className='md:mx-auto'>
          <h3 className='font-semibold text-xl mb-4 text-gray-300 '>
            Quick Links
          </h3>
          <div className='w-[60px] border-b-3 border-orange-500 items-start mt-1 mb-4'></div>
          <ul className='space-y-2 text'>
            <li>
              <Link href='/menu' className='text-gray-300 hover:text-white'>
                Menu
              </Link>
            </li>
            <li>
              <Link
                href='/galleries'
                className='text-gray-300 hover:text-white'
              >
                Galleries
              </Link>
            </li>
            <li>
              <Link
                href='/mobile-app'
                className='text-gray-300 hover:text-white'
              >
                Mobile-app
              </Link>
            </li>
            <li>
              <Link href='/about' className='text-gray-300 hover:text-white'>
                About Us
              </Link>
            </li>
            <li>
              <Link href='/contact' className='text-gray-300 hover:text-white'>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className=' md:mx-auto'>
          <div>
            <h3 className='font-semibold mb-4 text-gray-300 text-xl'>
              Contact Us
            </h3>
            <div className='w-1/4 border-b-3 border-orange-500 items-start mt-1 mb-4'></div>
            <div className='flex flex-row items-center space-x-2 gap-2'>
              <FaLocationDot className='text-orange-500 text-2xl' />
              <div>
                <p className='text-gray-300'>
                  House 114, 3rd Floor, Road 12, Block E
                </p>
                <p className='text-gray-300'> Banani, Dhaka 1212</p>
              </div>
            </div>
            <div className='flex flex-row items-center space-x-2  gap-2 pt-2'>
              <FaPhone className='text-orange-500 text-2xl' />
              <div>
                <p className='text-gray-300'>+8801712345678</p>
                <p className='text-gray-300'> +8801712345678 </p>
              </div>
            </div>
            <div className='flex flex-row items-center space-x-2 gap-2 pt-2'>
              <FaInbox className='text-orange-500 text-2xl' />
              <div className=''>
                <p className='text-gray-300'>services@foodieflow.com</p>
                <p className='text-gray-300'> info@foodor.com </p>
              </div>
            </div>
          </div>
        </div>
        <div className=' md:mx-auto'>
          <div>
            <h3 className='font-semibold text-xl mb-4 text-gray-300 '>
              Newsletter
            </h3>
            <div className='w-[60px] border-b-3 border-orange-500 items-start mt-1 mb-4'></div>
            <p className='text-gray-300'>
              Subscribe to our newsletter and get the latest updates on new
              menus, offers, and more.
            </p>
            <form className='mt-4'>
              <input
                type='email'
                placeholder='Enter your email'
                className='w-full bg-gray-900 text-gray-300 p-2 rounded'
              />
              <button className='bg-orange-500 text-white w-full mt-2 p-2 rounded'>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='text-gray-400 text-center justify-center items-center py-4 bg-gray-900'>
        Copyright © 2025 FoodieFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
