'use client';
import { assets } from '@/assets/admin_assets/assets';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const AddMenuPage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Create object URL only on client-side after component mounts
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreviewUrl(objectUrl);

      // Clean up function to revoke the URL when component unmounts or image changes
      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
  }, [image]);

  return (
    <div className='w-[70%] ml-5 mt-10 text-[#6d6d6d] text-[16px]'>
      <form className='flex flex-col'>
        <div className='add-img-upload flex-col'>
          <p>Upload Product Image</p>
          <label htmlFor='image'>
            <div className='relative  py-3  border-gray-300 rounded-md overflow-hidden'>
              <Image
                src={previewUrl || assets.upload_area}
                alt='Product preview'
                width={100}
                height={100}
                className='w-35 h-25 cursor-pointer '
              />
            </div>
          </label>
          <input
            type='file'
            id='image'
            hidden
            required
            className='border-2'
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
          />
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
          <div className='add-price flex flex-col'>
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
