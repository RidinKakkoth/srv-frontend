import React from "react";

const Navbar = ({ userName, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white px-4 py-2 flex items-center justify-between">
      <div className="text-lg font-bold">My App</div>
      <div className="flex items-center space-x-4">

        <button
          className="relative p-2 rounded-full hover:bg-blue-700 focus:outline-none"
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11c0-3.148-1.64-5.677-4.5-6.32M9 21h6M9 5.68C6.14 6.323 4.5 8.852 4.5 12v2.158c0 .538-.214 1.054-.595 1.437L3 17h5m6 0a3 3 0 11-6 0"
            />
          </svg>

          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        <span className="text-sm font-medium">{userName}</span>


        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
