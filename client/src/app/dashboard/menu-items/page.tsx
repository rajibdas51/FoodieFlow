'use client';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaTrash, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface MenuItemType {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const MenuItemsPage = () => {
  const url = 'http://localhost:4000';
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/food/list`);
      if (res.status === 200) {
        setMenuItems(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching menu items:', error);
      toast.error('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const removeFood = async (id: string) => {
    try {
      const res = await axios.delete(`${url}/api/food/remove`, {
        data: { id },
      });
      if (res.status === 200) {
        toast.success('Food item deleted successfully!');
        fetchMenuItems();
      }
    } catch (error) {
      toast.error('Error deleting food item!');
      console.error('Error deleting food item:', error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const filteredItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='w-full mx-auto px-0 sm:px-0 lg:px-0 py-8'>
      <div className='bg-white rounded-lg shadow-lg p-4 sm:py-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
          <h1 className='text-xl sm:text-2xl font-bold text-gray-800 border-b-2 border-indigo-600 pb-2'>
            All Food Items
          </h1>

          <div className='relative w-full sm:w-64'>
            <input
              type='text'
              placeholder='Search food or category...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
            />
            <FaSearch className='absolute left-3 top-3 text-gray-400' />
          </div>
        </div>

        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500'></div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className='text-center py-10'>
            <p className='text-gray-500 text-lg'>No food items found.</p>
          </div>
        ) : (
          <>
            {/* Table for medium and larger screens */}
            <div className='hidden md:block overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Image
                    </th>
                    <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Name
                    </th>
                    <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Description
                    </th>
                    <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Price
                    </th>
                    <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Category
                    </th>
                    <th className='py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className='bg-white divide-y divide-gray-200'>
                  {filteredItems.map((item) => (
                    <tr
                      key={item._id}
                      className='hover:bg-gray-50 transition-colors duration-200'
                    >
                      <td className='py-4 px-4 whitespace-nowrap'>
                        <div className='h-12 w-12 rounded-md overflow-hidden bg-gray-100'>
                          <Image
                            src={`${url}/images/${item.image}`}
                            alt={item.name}
                            width={60}
                            height={60}
                            className='h-full w-full object-cover'
                          />
                        </div>
                      </td>
                      <td className='py-4 px-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          {item.name}
                        </div>
                      </td>
                      <td className='py-4 px-4'>
                        <div className='text-sm text-gray-500 max-w-xs truncate'>
                          {item.description.length > 60
                            ? `${item.description.substring(0, 60)}...`
                            : item.description}
                        </div>
                      </td>
                      <td className='py-4 px-4 whitespace-nowrap'>
                        <div className='text-sm font-semibold text-green-600'>
                          ${item.price.toFixed(2)}
                        </div>
                      </td>
                      <td className='py-4 px-4 whitespace-nowrap'>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800'>
                          {item.category}
                        </span>
                      </td>
                      <td className='py-4 px-4 whitespace-nowrap'>
                        <button
                          onClick={() => removeFood(item._id)}
                          className='text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none cursor-pointer'
                          aria-label='Delete item'
                        >
                          <FaTrash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card layout for small screens */}
            <div className='md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  className='bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200'
                >
                  <div className='p-4 flex items-start space-x-4'>
                    <div className='h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-100'>
                      <Image
                        src={`${url}/images/${item.image}`}
                        alt={item.name}
                        width={64}
                        height={64}
                        className='h-full w-full object-cover'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <div className='flex justify-between items-start'>
                        <h3 className='text-sm font-medium text-gray-900 truncate'>
                          {item.name}
                        </h3>
                        <div className='ml-2'>
                          <button
                            onClick={() => removeFood(item._id)}
                            className='text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none cursor-pointer'
                            aria-label='Delete item'
                          >
                            <FaTrash size={16} />
                          </button>
                        </div>
                      </div>
                      <div className='mt-1 text-xs text-gray-500 line-clamp-2'>
                        {item.description}
                      </div>
                      <div className='mt-2 flex items-center justify-between'>
                        <span className='px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800'>
                          {item.category}
                        </span>
                        <div className='text-sm font-semibold text-green-600'>
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className='mt-4 text-right text-sm text-gray-500'>
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}{' '}
          found
        </div>
      </div>
    </div>
  );
};

export default MenuItemsPage;
