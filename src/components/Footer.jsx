import React from "react";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Inventory", href: "/inventory" },
  { name: "Map", href: "/map" },
  { name: "Find Devices", href: "/find-devices" },
  { name: "About Us", href: "/about-us" },
];

const socialLinks = [
  { name: "Twitter", href: "#", iconClass: "fab fa-twitter" },
  { name: "LinkedIn", href: "#", iconClass: "fab fa-linkedin" },
  { name: "GitHub", href: "#", iconClass: "fab fa-github" },
];

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
            {quickLinks.map(link => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-teal-400">{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Contact</h2>
          <p>Email: <a href="mailto:support@networkapp.com" className="text-teal-400">support@networkapp.com</a></p>
          <p>Phone: <span className="text-teal-400">+91 98765 43210</span></p>
          <div className="flex space-x-4 mt-4">
            {socialLinks.map(link => (
              <a key={link.name} href={link.href} className="hover:text-teal-400" aria-label={link.name}>
                <i className={link.iconClass}></i>
              </a>
            ))}
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
