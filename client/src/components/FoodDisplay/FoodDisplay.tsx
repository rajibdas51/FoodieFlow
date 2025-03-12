import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

import FoodItem from '../FoodItem/FoodItem';

interface FoodDisplayProps {
  category?: string;
}

const FoodDisplay: React.FC<FoodDisplayProps> = ({ category }) => {
  const foodList = useSelector((state: RootState) => state.food.foodList);

  return (
    <div className='mt-20 mb-12 mx-auto' id='food-display'>
      <div className='container mx-auto'>
        <h2 className='text-3xl font-bold text-center lg:text-5xl pt-10'>
          Top dishes near you
        </h2>
        <div className='grid grid-cols-1 gap-4 mx-auto items-center justify-center sm:grid-cols-2 lg:grid-cols-4 mt-16'>
          {foodList.map((food, index) => {
            if (category === 'All' || category === food.category) {
              return <FoodItem key={index} {...food} image={food.image.src} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
