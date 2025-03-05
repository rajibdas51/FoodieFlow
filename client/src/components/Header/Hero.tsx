import React from 'react';
import ImageSlider from '../ui/ImageSlider';

const Hero = () => {
  return (
    <div className='header h-[38vw] my-8 mx-auto relative'>
      <div className='hero-bg absolute -top-34 right-0 w-[73%] h-full bg-[url("/hero-bg.png")] bg-cover z-[-1]'></div>
      <div className='container flex flex-row md:mx-auto mx-2 gap-4 items-center justify-center py-auto lg:pt-15'>
        <div className='md:w-1/2 flex flex-col'>
          <h2 className='font-[900] text-gray-800 text-4xl md:text-[4.8vw] mt-10'>
            Order your
          </h2>
          <h2 className='font-[900] text-gray-800 text-4xl md:text-[4.8vw] md:-mt-4'>
            favourite food here
          </h2>
          <p className='text-black md:text-[1.1vw] my-2'>
            Craving something delicious? Explore our menu, choose your favorite
            dishes, and get them delivered hot and fresh right to your doorstep.
            Fast, easy, and hassle-free!
          </p>
          <button className='w-max px-4 py-2 mt-8 text-2xl font-bold text-gray-800 rounded-[20px] border border-orange-500 hover:bg-orange-500 hover:text-white transition-colors'>
            Order Now
          </button>
        </div>
        {/* image slider */}
        <div className='md:w-1/2 px-8'>
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

export default Hero;
