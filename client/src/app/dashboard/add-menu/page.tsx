import { assets } from '@/assets/admin_assets/assets';
import Image from 'next/image';
import React from 'react';

const AddMenuPage = () => {
  return (
    <div className='w-[70%] ml-5 mt-10 text-[#6d6d6d] text-[16px]'>
      <form className='flex flex-col'>
        <div className='add-img-upload flex-col'>
          <p>Upload Product Image</p>
          <label htmlFor='image'>
            <Image src={assets.upload_area} alt='' />
          </label>
          <input type='file' id='image' hidden required className='border-2 ' />
        </div>
        <div className='add-product-name flex flex-col my-5'>
          <p>Product name</p>
          <input
            type='text'
            name='name'
            placeholder='type here'
            className='w-6/7 mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-none focus:ring-1 focus:ring-orange-500'
          />
        </div>
        <div className='add-product-description flex flex-col '>
          <p>Product Description</p>
          <textarea
            name='description'
            placeholder='type here'
            id=''
            rows={6}
            aria-placeholder='Write description here'
            className='w-6/7 mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-none focus:ring-1 focus:ring-orange-500'
          />
        </div>
        <div className='add-category-price'>
          <div className='add-category flex flex-col my-5'>
            <p>Product category</p>
            <select
              name='category'
              className='w-6/7 mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-none focus:ring-1 focus:ring-orange-500'
            >
              <option value='Salad'>Salad</option>
              <option value='Rolls'>Rolls</option>
              <option value='Deserts'>Deserts</option>
              <option value='Sandwich'>Sandwich</option>
              <option value='Cake'>Cake</option>
              <option value='Pure Veg'>Pure Veg</option>
              <option value='Pasta'>Pasta</option>
              <option value='Noddles'>Noddles</option>
            </select>
          </div>
          <div className='add-price felx flex-col'>
            <p>Product price</p>
            <input
              type='Number'
              name='price'
              placeholder='$20'
              className='w-6/7 mt-1 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:border-none focus:ring-1 focus:ring-orange-500'
            />
          </div>
        </div>
        <button
          type='submit'
          className='my-5 w-[10%] bg-orange-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-orange-600'
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddMenuPage;
