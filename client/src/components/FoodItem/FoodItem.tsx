import { assets } from '@/assets/frontend_assets/assets';
import { RootState } from '@/redux/store';
import { addToCart, removeFromCart } from '@/redux/slices/cartSlice';
import Image from 'next/image';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface FoodItemProps {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating?: number;
  numReviews?: number;
  countInStock?: number;
}

const FoodItem: React.FC<FoodItemProps> = ({
  _id,
  name,
  description,
  image,
  price,
}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const itemCount = cartItems[_id] || 0;
  const url =
    process.env.NEXT_PUBLIC_API_URL || 'https://foodieflow.onrender.com';
  // handleAddToCart function
  const handleAddToCart = () => {
    dispatch(addToCart(_id));
  };

  // handleRemoveFromCart function
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(_id));
  };
  console.log(url + '/images/' + image);
  return (
    <div className='w-[100%] rounded-[15px] shadow-md transition duration-300 ease-in-out transform hover:scale-105 px-4 md:px-0'>
      <div className='relative'>
        <Image
          className='w-full rounded-t-[20px] md:rounded-t-2xl'
          src={url + '/images/' + image}
          alt={name}
          width={500}
          height={300}
          quality={100}
        />
        {!itemCount ? (
          <Image
            src={assets.add_icon_white}
            onClick={handleAddToCart}
            width={100}
            height={100}
            alt=''
            quality={100}
            className='w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-[50%]'
          />
        ) : (
          <div className='absolute bottom-[15px] right-[15px] flex items-center gap-[10px] p-[6px] rounded-[50px] bg-white justify-center'>
            <Image
              src={assets.remove_icon_red}
              onClick={handleRemoveFromCart}
              width={100}
              height={100}
              alt=''
              quality={100}
              className='w-[30px] cursor-pointer'
            />
            <p>{itemCount}</p>
            <Image
              src={assets.add_icon_green}
              onClick={handleAddToCart}
              width={100}
              height={100}
              alt=''
              quality={100}
              className='w-[30px] cursor-pointer'
            />
          </div>
        )}
      </div>
      <div className='p-5'>
        <div className='flex justify-between items-center mb-3'>
          <p className='text-xl font-bold'>{name}</p>
          <Image
            className='w-[70px]'
            src={assets.rating_starts}
            alt=''
            width={100}
            height={100}
          />
        </div>
        <p className='text-gray-800 text-lg'>{description}</p>
        <p className='text-[22px] font-bold my-2 text-orange-500'>${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
