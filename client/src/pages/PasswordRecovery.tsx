// import React from 'react';
import { APP_NAME } from "../constants/App";
import Cloud_Icon from "../assets/cloud-icon.svg";
import Input from "../ui/component/Input/Input";
import Button from "../ui/component/Button/Button";

const PasswordRecovery = () => {
  const [firstLogoName, secondLogoName] = APP_NAME.split(" ");

  return (
    <div className="recovery-page min-h-screen flex justify-center items-center bg-white p-4">
      <div className="recovery-container border border-gray-300 bg-white shadow-sm w-full max-w-md rounded-lg p-6 sm:p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl flex items-center justify-center space-x-2">
            <img src={Cloud_Icon} className="h-10 w-10" alt="Cloud icon" />
            <span className="text-gray-900">{firstLogoName}</span>
            <span className="font-bold text-gray-900">{secondLogoName}</span>
          </h1>
          
          <h3 className="text-center mt-5 text-3xl font-semibold text-gray-900">Reset Password</h3>
          <p className="text-center mt-3 text-gray-600">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form className="mt-6">
          <div className="space-y-6">
            <div className="relative">
              <Input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                className="w-full h-12 px-4 pt-3 pb-1 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-gray-400 peer transition-all"
              />
              <label 
                htmlFor="email" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:left-4 peer-focus:bg-white peer-focus:px-1"
              >
                Email Address
              </label>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition duration-200"
            >
              Send Reset Link
            </Button>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Remember your password?{" "}
            <a href="#" className="text-gray-700 hover:text-black hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;