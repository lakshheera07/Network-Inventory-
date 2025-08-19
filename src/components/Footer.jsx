import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-0 w-full fixed bottom-0 left-0 z-50">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand / Logo */}
        <div>
          <h1 className="text-xl font-bold text-white mb-4">
            Network Inventory
          </h1>
          <p className="text-sm">
            Efficiently manage and monitor all your network devices from a single dashboard.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-teal-400">Home</a></li>
            <li><a href="/inventory" className="hover:text-teal-400">Inventory</a></li>
            <li><a href="/map" className="hover:text-teal-400">Map</a></li>
            <li><a href="/find-devices" className="hover:text-teal-400">Find Devices</a></li>
            <li><a href="/about-us" className="hover:text-teal-400">About Us</a></li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact</h2>
          <p>Email: <a href="mailto:support@networkapp.com" className="text-teal-400">support@networkapp.com</a></p>
          <p>Phone: <span className="text-teal-400">+91 98765 43210</span></p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-teal-400" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-teal-400" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="hover:text-teal-400" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-4 pt-2 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Network Inventory. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
