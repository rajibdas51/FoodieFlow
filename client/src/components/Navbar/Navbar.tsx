'use client';
import { assets } from '@/assets/frontend_assets/assets';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAuthModal } from '@/redux/slices/authSlice';
import { usePathname, useRouter } from 'next/navigation';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '@/hooks/useCart';
import { RootState } from '@/redux/store';
const menuItems = [
  { name: 'Home', url: '/' },
  { name: 'Menu', url: '/menu' },
  { name: 'Mobile-app', url: '/mobile-app' },
  { name: 'Contact us', url: '/contact-us' },
];

const Navbar = () => {
  const dispatch = useDispatch();

  const [activeMenu, setActiveMenu] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const { isEmpty } = useCart();
  const ishome = path === '/' ? true : false;
  const { user } = useSelector((state: RootState) => state.auth);

  // Handle scroll event to make navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const openAuthModal = () => {
    dispatch(toggleAuthModal(true));
  };

  return (
    <div
      className={`w-full ${
        isSticky || !ishome
          ? 'fixed top-0 left-0 right-0 shadow-md z-30 bg-white transition-all '
          : ' '
      } `}
    >
      <div
        className={`container mx-auto ${
          isSticky
            ? 'bg-white hover:text-orange-500 '
            : 'bg-white md:bg-transparent'
        }`}
      >
        <div
          className={` ${
            isSticky ? 'py-2' : 'py-4'
          } flex justify-between items-center`}
        >
          {/* Hamburger menu - only on mobile */}
          <div className='md:hidden flex pl-2 w-1/5'>
            <button onClick={toggleMobileMenu} className='focus:outline-none'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div>

          {/* Logo section - centered on mobile */}
          <div className='flex justify-center w-1/3 md:justify-start'>
            <Image
              src={assets.logo}
              alt='FoodieFlow logo'
              width={0}
              height={0}
              className='md:w-50 w-35 cursor-pointer'
              quality={100}
              onClick={() => router.push('/')}
            />
          </div>

          {/* Navigation links - desktop */}
          <ul className='hidden lg:flex text-[18px] flex-row text-gray-800 list-none gap-5 justify-center space-x-8'>
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={` ${
                  !isSticky && item.name === activeMenu && ishome
                    ? ' hover:text-orange-500 border-b-2 border-b-orange-500 transition-all  cursor-pointer'
                    : 'text-gray-800 hover:text-orange-500   transition-all  cursor-pointer'
                } 
                   ${
                     isSticky && item.name === activeMenu && ishome
                       ? '   hover:text-orange-500 text-gray-800 transition-all border-b-2  border-b-orange-500 cursor-pointer'
                       : 'text-gray-800 hover:text-gray-100  transition-all  cursor-pointer'
                   } 
                ${
                  !isSticky && item.name === activeMenu && ishome
                    ? '   hover:text-white text-white transition-all border-b-2  border-b-white cursor-pointer'
                    : 'text-gray-800 hover:text-gray-100  transition-all  cursor-pointer'
                } 

                  ${
                    !isSticky && item.name !== activeMenu && ishome
                      ? '   hover:text-white hover:border-b-white hover:border-b-2  transition-all   cursor-pointer'
                      : 'text-gray-800 hover:text-gray-100  transition-all  cursor-pointer'
                  }
                   ${
                     !isSticky && item.name !== activeMenu && !ishome
                       ? '   hover:text-orange-500 text-black transition-all hover:border-b-2  hover:border-b-orange-500 cursor-pointer'
                       : 'text-gray-800 hover:text-orange-500  transition-all  cursor-pointer'
                   } 

                    ${
                      !isSticky && item.name === activeMenu && !ishome
                        ? '   hover:text-orange-500 text-orange-500 transition-all border-b-2  border-b-orange-500 cursor-pointer'
                        : 'text-gray-800 hover:text-orange-500  transition-all  cursor-pointer'
                    } 
                      ${
                        isSticky && item.name !== activeMenu && !ishome
                          ? '   hover:text-orange-500 text-gray-800 transition-all hover:border-b-2  hover:border-b-orange-500 cursor-pointer'
                          : 'text-gray-800 hover:text-orange-500  transition-all  cursor-pointer'
                      } 
                        ${
                          isSticky && item.name === activeMenu && !ishome
                            ? '   text-orange-500  transition-all border-b-2  border-b-orange-500 cursor-pointer'
                            : 'text-gray-800 hover:text-orange-500  transition-all  cursor-pointer'
                        } 

                `}
                onClick={() => setActiveMenu(item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>

          {/* Right icons section */}
          <div className='navbar-right flex-1 flex justify-end items-center gap-3 md:gap-6 lg:gap-10 pr-2'>
            <FaSearch
              className={`${
                !isSticky && ishome ? 'text-white' : 'text-orange-500'
              } cursor-pointer text-2xl `}
            />
            <div className='navbar-search-icon flex items-center space-x-4 relative'>
              <FaShoppingCart
                className={`${
                  !isSticky && ishome ? 'text-white' : 'text-orange-500'
                } cursor-pointer text-2xl `}
                onClick={() => router.push('/cart')}
              />
              <div
                className={`${
                  isEmpty ? 'hidden' : 'inline-block'
                } dot absolute min-w-2.5 min-h-2.5 ${
                  isSticky ? 'bg-orange-500' : 'bg-red-600'
                } rounded-md top-[-8px] left-3`}
              ></div>
              {!user && (
                <button
                  onClick={openAuthModal}
                  className={`px-4 py-2 font-bold text-gray-800 rounded-[20px] bg-white 
                 ${
                   !isSticky && ishome
                     ? 'md:hover:bg-red-500 outline-none'
                     : 'md:hover:bg-orange-500 border-orange-500'
                 }  hover:bg-orange-500 hover:text-white transition-colors border-2 0 cursor-pointer`}
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - sliding panel */}
      <div
        className={`md:hidden fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex justify-between items-center p-4 border-b'>
          <div className=''>
            <Image
              src={assets.logo}
              alt='FoodieFlow logo'
              width={0}
              height={0}
              className='md:w-50 w-35'
              quality={100}
            />
          </div>
          <button onClick={toggleMobileMenu} className='focus:outline-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <ul className='p-4'>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`py-3 cursor-pointer ${
                item.name === activeMenu
                  ? 'text-orange-500 font-semibold'
                  : 'text-gray-800'
              }`}
              onClick={() => {
                setActiveMenu(item.name);
                setMobileMenuOpen(false);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Very transparent overlay when mobile menu is open */}
      <div
        className={`md:hidden fixed inset-0 bg-black transition-opacity duration-300 ease-in-out z-40 ${
          mobileMenuOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      ></div>
    </div>
  );
};

export default Navbar;
