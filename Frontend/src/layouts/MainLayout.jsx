import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const location = useLocation();
  const hideFooterRoutes = [
    '/inventory/add',
    '/inventory/update',
    '/inventory/delete',
  ];
  const hideFooter = hideFooterRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* {!hideFooter && <Footer />} */}
    </>
  );
};

export default MainLayout;
