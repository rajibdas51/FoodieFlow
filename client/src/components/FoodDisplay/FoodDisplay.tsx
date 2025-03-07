import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';

const FoodDisplay: React.FC<string> = ({ category }) => {
  const foodList = useSelector((state: RootState) => state.food.foodList);

  return (
    <div className='food-display ' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {foodList.map((food, index) => (
          <div key={index}>
            <Image src={food.image} alt={food.name} width={200} height={200} />
            <h2>{food.name}</h2>
            <p>{food.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
