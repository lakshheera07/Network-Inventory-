import React from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const LoginLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const isRequestAccess = location.pathname === '/request-access';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-600 to-blue-400">
      <header className="text-center py-10 px-4 bg-white/10 text-blue-100 shadow-md">
        <h1 className="text-4xl font-bold tracking-wide text-white mb-2">NetStore</h1>
        <p className="text-lg font-light">Empowering seamless network access and management for all users and admins.</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center bg-[#f4f8fb] bg-[url('/src/assests/Network-BG.png')] bg-cover bg-center">
        {isHome ? (
          <div className="bg-white rounded-2xl shadow-lg border border-blue-400 p-10 text-center max-w-md w-full animate-fadeIn">
            <h2 className="text-blue-700 text-2xl font-semibold mb-2">Welcome to NetStore</h2>
            <p className="text-indigo-900 text-base">To continue, please login or raise a network access request.</p>
            <div className="flex gap-4 justify-center mt-8">
              <button
                onClick={() => navigate('/login')}
                className="bg-cyan-500 text-white rounded-md px-6 py-2 text-base font-medium shadow-md hover:bg-blue-700 hover:scale-105 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/request-access')}
                className="bg-cyan-500 text-white rounded-md px-6 py-2 text-base font-medium shadow-md hover:bg-blue-700 hover:scale-105 transition"
              >
                Request Access
              </button>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      <footer className="text-center py-5 bg-gradient-to-r from-blue-800 to-blue-400 text-white text-sm tracking-wide shadow-inner">
        &copy; {new Date().getFullYear()} NetStore. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginLayout;