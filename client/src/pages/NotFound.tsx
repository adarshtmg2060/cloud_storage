// import React from 'react';
import { APP_NAME } from "../constants/App";
import Cloud_Icon from "../assets/cloud-icon.svg";
import { FiArrowLeft } from "react-icons/fi";
import Button from "../ui/component/Button/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [firstLogoName, secondLogoName] = APP_NAME.split(" ");

  return (
    <div className="not-found-page min-h-screen flex justify-center items-center bg-white p-4">
      <div className="not-found-container border border-gray-300 bg-white shadow-sm w-full max-w-md rounded-lg p-6 sm:p-8 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl flex items-center justify-center space-x-2 mb-6">
            <img src={Cloud_Icon} className="h-10 w-10" alt="Cloud icon" />
            <span className="text-gray-900">{firstLogoName}</span>
            <span className="font-bold text-gray-900">{secondLogoName}</span>
          </h1>

          <h2 className="text-9xl font-bold text-gray-900 mb-4">404</h2>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Page Not Found
          </h3>
          <p className="text-gray-600 mb-6">
            The page you are looking for doesn't exist or has been moved
          </p>

          <Link to="/" >
            <Button className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition duration-200 px-6 py-3">
              <FiArrowLeft />
              Go Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
