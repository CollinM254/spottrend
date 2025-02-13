import React from "react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useThemeContext } from "../Context/themeContext";
import Tooltip from "@mui/material/Tooltip";
import "./Header.css"; // Assuming your CSS is in this file
import { Link } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";

const Header = ({ toShow = true }) => {
  const { state } = useAuth();
  const { isDarkTheme, toggleTheme } = useThemeContext();
  const { user, logout } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);

  // const handleLogout = () => {
  //     setShowConfirmation(true);
  // };

  const confirmLogout = () => {
    logout();
    setShowConfirmation(false);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
  };

  const renderAuthButton = () => {
    if (state.isAuthenticated) {
      // User is authenticated, show Logout button
      return (
        <a href="/">
          <div
            className="cursor-pointer bg-gray-300 p-2 rounded-full"
            onClick={logout}
          >
            <span className="hidden sm:inline">👋 </span>
            <span role="img" aria-label="Logout">
              Logout
            </span>
          </div>
        </a>
      );
    } else {
      // User is not authenticated, show Login button
      return (
        <a href="/login">
          <div className="cursor-pointer bg-gray-300 p-2 rounded-full">
            <span className="hidden sm:inline">👤 </span>
            <span role="img" aria-label="Login">
              Login
            </span>
          </div>
        </a>
      );
    }
  };

  return (
    <>
      <div>
        <div className="neon-banner">
          <span className="neon-text">
            WE ARE OPEN, WELCOME TO OUR WEBSITE, ENJOY OUR DISCOUNTED PRICES
          </span>
        </div>
      </div>
      <header className="bg-white text-black p-4 px-8 flex items-center justify-between border-b">
        {/* Neon light */}

        <a href="/">
          <h1 className="text-2xl md:text-4xl font-semibold">
            <img
              src="https://res.cloudinary.com/dtszhuotx/image/upload/v1736449315/bg_r2hvja.png"
              alt=""
              style={{ height: "80px", width: "80px" }}
            />{" "}
          </h1>
        </a>

        <div className="hidden md:flex items-center space-x-4">
          <div className="cursor-pointer">
            <a href="/products">Men</a>
          </div>
          <div className="cursor-pointer">
            <a href="/products">Women</a>
          </div>
        </div>

        {/* contacts */}

        <div className="flex items-center space-x-4">
        <div className="">
            <div className="text-green color-green">
              <Link to="https://wa.me/254741854304">
                <WhatsAppIcon className="text-green-600 " /> or{" "}
                <AddIcCallIcon className="text-blue-600" />
              </Link>
            </div>
            <div className="text-green color-green">
              <Link to="https://wa.me/254741854304" className="text-green-600 ">
              0741854304
              </Link>
            </div>
            <div>
              <Link to="tel:+254741854304" className="text-blue-600">
                {" "}
                0741854304
              </Link>
            </div>
          </div>
          <div className="hidden sm:block">
            <Tooltip title="Switch Theme">
              <button
                className="cursor-pointer bg-gray-300 p-2 rounded-full"
                onClick={toggleTheme}
              >
                {isDarkTheme ? "☀️" : "🌙"}
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Visit Cart">
              <a href="/cart">
                <div className="cursor-pointer bg-gray-300 p-2 rounded-full">
                  <span role="img" aria-label="Cart">
                    🛒
                  </span>
                </div>
              </a>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Check Account">
              <a href="/myaccount">
                <div className="cursor-pointer bg-gray-300 p-2 rounded-full">
                  <span role="img" aria-label="myAccount">
                    👤
                  </span>
                </div>
              </a>
            </Tooltip>
          </div>

          {/* Conditionally render Login/Logout button */}
          {!toShow ? null : renderAuthButton()}

          {/* Confirmation dialog */}
          {showConfirmation && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-4 rounded-md">
                <p>
                  {user
                    ? `${user.username}, are you sure you want to logout?`
                    : "Are you sure you want to logout?"}
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    className="mr-4 bg-gray-300 p-2 rounded-full"
                    onClick={confirmLogout}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-gray-300 p-2 rounded-full"
                    onClick={cancelLogout}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
