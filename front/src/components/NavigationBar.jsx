import React from "react";
import ButtonComponent from "./ButtonComponent";

const NavigationBar = ({showButtons}) => {
  return (
    <nav className="bg-orange-100 border-gray-200 dark:bg-orange-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">BundleGames</span>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
        {showButtons && (
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-orange-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-orange-600 md:dark:bg-orange-600 dark:border-orange-700">
            <li>
              <ButtonComponent route={"/boardgames"} buttonText={"Boardgames collection"} isLink={true} />
            </li>
            <li>
              <ButtonComponent route={"/search"} buttonText={"New boardgame"} isLink={true} />
            </li>
            <li>
              <ButtonComponent route={"/friends"} buttonText={"Friends"} isLink={true} />
            </li>
            <li>
              <ButtonComponent route={"/login"} buttonText={"Logout"} isLink={true} />
            </li>
          </ul>
        )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
