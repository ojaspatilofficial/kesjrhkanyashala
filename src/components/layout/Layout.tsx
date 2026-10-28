import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import NoticeTicker from './NoticeTicker';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
};

const Layout: React.FC = () => (
  <>
    <ScrollToTop />
    <div className="flex flex-col min-h-screen bg-brand-light text-slate-800 antialiased">
      <NoticeTicker />
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  </>
);

export default Layout;
