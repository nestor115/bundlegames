import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/Auth.jsx";
import logo from "../media/logo.png";
const NavigationBar = ({ showButtons }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-orange-100 border-gray-200 dark:bg-orange-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <img src={logo} alt="BundleGames Logo" className="h-16 w-auto mr-2" />
          <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
            BundleGames
          </span>
        </div>
        {showButtons && (
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-orange-500"
            aria-expanded={isOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        )}
        <div
          className={`w-full md:w-auto md:block ${isOpen ? "block" : "hidden"}`}
          id="navbar-default"
        >
          {showButtons && (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-orange-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-orange-500 md:dark:bg-orange-600 dark:border-orange-700">
              <li className="border-2 mt-2 border-orange-600 rounded-xl">
                <button className=" text-xl block py-2 px-3 text-gray-900 rounded hover:bg-orange-200 md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-gray-700 dark:hover:bg-orange-600 dark:hover:text-white md:dark:hover:bg-transparent">
                  <Link to="/boardgames">Boardgames collection</Link>
                </button>
              </li>
              <li className="border-2 mt-2 border-orange-600 rounded-xl">
                <button className="text-xl block py-2 px-3 text-gray-900 rounded hover:bg-orange-200 md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-gray-700 dark:hover:bg-orange-600 dark:hover:text-white md:dark:hover:bg-transparent">
                  <Link to="/search">Search a new game</Link>
                </button>
              </li>
              <li className="border-2 mt-2 border-orange-600 rounded-xl">
                <button className="text-xl block py-2 px-3 text-gray-900 rounded hover:bg-orange-200 md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-gray-700 dark:hover:bg-orange-600 dark:hover:text-white md:dark:hover:bg-transparent">
                  <Link to="/friends">Friends</Link>
                </button>
              </li>
              <li className="border-2 mt-2 border-orange-600 rounded-xl">
                <button
                  onClick={() => logout()}
                  className="text-xl block py-2 px-3 text-gray-900 rounded hover:bg-orange-200 md:hover:bg-transparent md:border-0 md:hover:text-orange-700 md:p-0 dark:text-white md:dark:hover:text-gray-700 dark:hover:bg-orange-600 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
