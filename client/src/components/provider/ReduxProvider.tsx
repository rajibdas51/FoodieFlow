'use client';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import LoginPopup from '../LoginPopup/LoginPopup';
function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  //const [showRegister, setShowRegister] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted) {
    return (
      <Provider store={store}>
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        <Navbar setShowLogin={setShowLogin} />
        {children}
        <Footer />
      </Provider>
    );
  }
}

export default ReduxProvider;
