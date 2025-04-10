'use client';
import AppDownload from '@/components/AppDownload/AppDownload';
import ExploreMenu from '@/components/ExploreMenu/ExploreMenu';
import FoodDisplay from '@/components/FoodDisplay/FoodDisplay';
import Hero from '@/components/Hero/Hero';
import { useState } from 'react';

export default function Home() {
  const [category, setCategory] = useState('All');

  return (
    <div>
      <Hero />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
}
