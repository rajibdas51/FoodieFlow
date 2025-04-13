'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
interface MenuItemType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}
const MenuItemspage = () => {
  const url = 'http://localhost:4000';
  const [menuItems, setMenuItems] = React.useState([]);
  console.log(menuItems);
  const fetchmenuItems = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.status === 200) {
        setMenuItems(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const removeFood = async (id: string) => {
    try {
      const res = await axios.delete(`${url}/api/food/remove`, {
        data: { id: id },
      });
      if (res.status === 200) {
        toast.success('Food item deleted successfully!');
        fetchmenuItems();
      }
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };

  useEffect(() => {
    fetchmenuItems();
  }, [menuItems]);

  return (
    <div>
      <div className='list add flex flex-col'>
        <h1 className='text-2xl font-bold border-b-2 border-gray-700 w-35 mb-6'>
          All Food List
        </h1>
        <div className='list-table'>
          <div className='grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] md:grid-cols-6 title text-lg text-gray-700 font-bold gap-2 py-3 px-4 border-1 border-gray-500'>
            <div className='list-table-format-item border-r-1 border-gray-500'>
              Name
            </div>
            <div className='list-table-format-item'>Description</div>
            <div className='list-table-format-item'>Price</div>
            <div className='list-table-format-item'>Category</div>
            <div className='list-table-format-item'>Image</div>
            <div className='list-table-format-item'>Action</div>
          </div>
          {menuItems.map((item: MenuItemType, index: number) => {
            return (
              <div
                key={index}
                className='grid grid-cols-[0.5fr_2fr_1fr_1fr_0.5fr] md:grid-cols-6 title  text-gray-700  gap-2 py-3 px-4 border-1 border-gray-500'
              >
                <Image
                  src={`${url}/images/` + item.image}
                  alt='food'
                  width={50}
                  height={50}
                  className='w-[50px]'
                />
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p
                  className='cursor-pointer'
                  onClick={() => removeFood(item?._id)}
                >
                  X
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuItemspage;
