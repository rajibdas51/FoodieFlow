import React, { useState } from 'react';
import ExploreMenu from '../components/ExploreMenu/ExploreMenu';

const SomePage = () => {
  const [category, setCategory] = useState<string>('');

  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory} />
      {/* Other components */}
    </div>
  );
};

export default SomePage;
