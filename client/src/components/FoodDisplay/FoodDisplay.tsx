import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { fetchFoodList } from '@/redux/slices/foodSlice';
import FoodItem from '../FoodItem/FoodItem';

interface FoodDisplayProps {
  category?: string;
}

const FoodDisplay: React.FC<FoodDisplayProps> = ({ category }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { foodList, loading, error } = useSelector(
    (state: RootState) => state.food
  );

  useEffect(() => {
    dispatch(fetchFoodList());
  }, [dispatch]);

  if (loading) return <div className='text-center'>Loading Food Items...</div>;
  if (error) return <div className='text-center'>Error: {error}</div>;

  // Filter foods based on category if needed
  const filteredFoods =
    category && category !== 'All'
      ? foodList.filter((food) => food.category === category)
      : foodList;

  return (
    <div className='mt-20 mb-12 mx-auto' id='food-display'>
      <div className='container mx-auto'>
        <h2 className='text-3xl font-bold text-center lg:text-5xl pt-10'>
          Top dishes near you
        </h2>

        {filteredFoods.length === 0 ? (
          <p className='text-center mt-8'>
            No food items found in this category.
          </p>
        ) : (
          <div className='grid grid-cols-1 gap-4 mx-auto items-center justify-center sm:grid-cols-2 lg:grid-cols-4 mt-16'>
            {filteredFoods?.map((food, index) => (
              <FoodItem
                key={food._id || index}
                id={food._id}
                name={food.name}
                description={food.description}
                price={food.price}
                image={food.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
