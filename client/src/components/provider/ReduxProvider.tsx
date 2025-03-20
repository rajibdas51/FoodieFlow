'use client';

import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import LoginPopup from '@/components/LoginPopup/LoginPopup';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

// Inner component to access Redux state
const AuthModalRenderer = ({ children }: { children: React.ReactNode }) => {
  const { showAuthModal } = useSelector((state: RootState) => state.auth);

  return (
    <>
      {children}
      {showAuthModal && <LoginPopup />}
    </>
  );
};

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Navbar />
      <AuthModalRenderer>{children}</AuthModalRenderer>
      <Footer />
    </Provider>
  );
};

export default ReduxProvider;
