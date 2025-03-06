'use client';
import ExploreMenu from '@/components/ExploreMenu/ExploreMenu';
import Hero from '@/components/Header/Hero';
import { useState } from 'react';

export default function Home() {
  const [category, setCategory] = useState('all');

  return (
    <div>
      <Hero />
      <ExploreMenu category={category} setCategory={setCategory} />
    </div>
  );
}
