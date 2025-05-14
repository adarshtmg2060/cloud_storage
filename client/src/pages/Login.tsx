// import React from 'react';
import { APP_NAME } from "../constants/App";
import Cloud_Icon from "../assets/cloud-icon.svg";
import Input from "../ui/component/Input/Input";
import Button from "../ui/component/Button/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [firstLogoName, secondLogoName] = APP_NAME.split(" ");

  return (
    <div className="login-page min-h-screen flex justify-center items-center bg-white p-4">
      <div className="login-container border border-gray-300 bg-white shadow-sm w-full max-w-md rounded-lg p-6 sm:p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl flex items-center justify-center space-x-2">
            <img src={Cloud_Icon} className="h-10 w-10" alt="Cloud icon" />
            <span className="text-gray-900">{firstLogoName}</span>
            <span className="font-bold text-gray-900">{secondLogoName}</span>
          </h1>
          
          <h3 className="text-center mt-5 text-3xl font-semibold text-gray-900">Sign In</h3>
          <p className="text-center mt-3 text-gray-600">Login to stay connected</p>
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
                Email
              </label>
            </div>
            
            <div className="relative">
              <Input
                type="password"
                name="password"
                id="password"
                placeholder=" "
                className="w-full h-12 px-4 pt-3 pb-1 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-gray-400 peer transition-all"
              />
              <label 
                htmlFor="password" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:left-4 peer-focus:bg-white peer-focus:px-1"
              >
                Password
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                name="remember" 
                id="remember" 
                className="h-4 w-4 text-black rounded border-gray-300 focus:ring-gray-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-gray-700 hover:text-black hover:underline">
              Forgot Password?
            </a>
          </div>

          <div className="mt-6">
            <Button 
              type="submit" 
              className="w-full h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition duration-200"
            >
              Sign In
            </Button>
          </div>

          {/* Social Login Section */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="space-y-3">
            <Button 
              type="button"
              className="w-full h-11 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>

            <Button 
              type="button"
              className="w-full h-11 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <FaFacebook className="text-xl text-blue-600" />
              Continue with Facebook
            </Button>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-gray-700 hover:text-black hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;