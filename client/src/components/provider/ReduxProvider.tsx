'use client';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted) {
    return <Provider store={store}>{children}</Provider>;
  }
}

export default ReduxProvider;
