import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-900 via-slate-900 to-cyan-900 text-white">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center py-16 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-6 text-cyan-300 drop-shadow">Network Inventory Management System</h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-200 mb-10">
          Our project is designed to revolutionize how enterprises manage their network devices. With real-time tracking, centralized inventory, and smart automation, we make network management seamless, secure, and scalable.
        </p>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-300 mb-4">Business Use Case</h2>
          <p className="text-base text-slate-200 mb-8">
            Enterprises face challenges in managing large-scale networks, including manual errors, lack of visibility, and inefficient device monitoring. Our solution provides a unified platform for IT teams to monitor, update, and secure network assets, reducing downtime and operational costs while improving compliance and scalability.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-indigo-300 mb-4">Meet the Team</h2>
          <div className="flex flex-wrap justify-center gap-8 text-lg font-semibold text-cyan-200">
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-2">👤</span>
              <span>Laksh Heera</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-2">👤</span>
              <span>Megha T S</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-2">👤</span>
              <span>Sunil Kumar</span>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-4 text-center text-sm w-full border-t border-slate-800">
        &copy; {new Date().getFullYear()} Network Inventory Management System. All rights reserved.
      </footer>
    </div>
  );
}
