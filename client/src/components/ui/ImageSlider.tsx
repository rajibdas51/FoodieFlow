'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';

const images: string[] = [
  '/food-one.png',
  '/food-two.png',
  '/food-three.png',
  '/food-four.png',
];

export default function ImageSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      pagination={{ clickable: true, el: '.swiper-pagination' }}
      autoplay={{ delay: 3000 }}
      loop
      className='rounded-xl'
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <div className='relative w-full h-[300px] md:h-[400px] lg:h-[400px] flex items-center justify-center'>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              layout='fill'
              objectFit='contain'
              quality={100}
              className='rounded-xl '
            />
          </div>
        </SwiperSlide>
      ))}
      <div className='swiper-button-next text-white'></div>
      <div className='swiper-button-prev text-white'></div>
      <div className='swiper-pagination'></div>
    </Swiper>
  );
}
