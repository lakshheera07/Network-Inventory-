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

  const hideNavbarRoutes = [
    '/login',
    '/register'
  ];

  const hideNavbar = hideNavbarRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  const hideFooter = hideFooterRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main>
        <Outlet />
      </main>
      {/* {!hideFooter && <Footer />} */}
    </>
  );
};

export default MainLayout;
