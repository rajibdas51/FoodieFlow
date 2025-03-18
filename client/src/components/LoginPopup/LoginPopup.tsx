import { assets } from '@/assets/frontend_assets/assets';
import Image from 'next/image';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAuthModal, setAuthModalView } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';

const LoginPopup: React.FC = () => {
  const dispatch = useDispatch();
  const { authModalView } = useSelector((state: RootState) => state.auth);

  const handleCloseModal = () => {
    dispatch(toggleAuthModal(false));
  };

  const switchToLogin = () => {
    dispatch(setAuthModalView('login'));
  };

  const switchToSignup = () => {
    dispatch(setAuthModalView('signup'));
  };

  return (
    <div className='login-popup fixed inset-0 bg-[#00000090] flex w-full h-full z-[100]'>
      <form
        action=''
        className='login-popup-container bg-white rounded-md place-self-center items-center justify-center mx-auto w-[330px] text-[#808080] flex flex-col gap-6 py-8 px-3 relative animate-fade-in'
      >
        <div className='login-popup-title'>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {authModalView === 'signup' ? 'Sign Up' : 'Login'}
          </h2>
          <Image
            onClick={handleCloseModal}
            width={100}
            height={100}
            src={assets.cross_icon}
            alt=''
            className='absolute top-3 right-3 w-5 cursor-pointer'
          />
        </div>
        <div className='w-full flex flex-col items-center justify-center mx-auto gap-6'>
          {authModalView === 'signup' && (
            <input
              type='text'
              name='name'
              id='name'
              className='w-6/7 mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
              placeholder='Your Name'
              required
            />
          )}
          <input
            type='email'
            name='email'
            placeholder='Your email'
            id='email'
            required
            className='w-6/7 mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            id='password'
            required
            className='w-6/7 mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
          />
          {authModalView === 'signup' && (
            <input
              type='phone'
              name='phone'
              placeholder='Your Phone'
              id='phone'
              required
              className='w-6/7 mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500'
            />
          )}
          <button className='bg-orange-500 text-white py-2 px-4 rounded-md cursor-pointer'>
            {authModalView === 'signup' ? 'Create Account' : 'Login'}
          </button>
        </div>
        <div className='login-popup-condition flex flex-col gap-3 items-center justify-center mx-auto'>
          <div className='flex flex-row gap-3'>
            <input type='checkbox' required className='accent-orange-500' />
            <p className=''>
              By continuing, I agree to the terms of use & privacy policy.
            </p>
          </div>
          {authModalView === 'signup' ? (
            <div className='flex md:flex-row gap-3'>
              <p>Already have an account? </p>
              <button
                type='button'
                className='font-semibold text-orange-500 cursor-pointer'
                onClick={switchToLogin}
              >
                {'    '} Login here
              </button>
            </div>
          ) : (
            <div className='flex md:flex-row gap-3'>
              <p>Don&apos;t have an account? </p>
              <button
                type='button'
                className='font-semibold text-orange-500 cursor-pointer'
                onClick={switchToSignup}
              >
                {'    '} Sign Up here
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPopup;
