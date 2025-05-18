import { APP_NAME } from "../constants/App";
import Cloud_Icon from "../assets/cloud-icon.svg";
import Input from "../ui/component/Input/Input";
import Button from "../ui/component/Button/Button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const SignUp = () => {
  const [firstLogoName, secondLogoName] = APP_NAME.split(" ");

  return (
    <div className="signup-page min-h-screen flex justify-center items-center bg-white p-4">
      <div className="signup-container border border-gray-300 bg-white shadow-sm w-full max-w-4xl rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column - Branding/Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gray-50 p-8">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl flex items-center justify-center space-x-2 mb-4">
              <img src={Cloud_Icon} className="h-12 w-12" alt="Cloud icon" />
              <span className="text-gray-900">{firstLogoName}</span>
              <span className="font-bold text-gray-900">{secondLogoName}</span>
            </h1>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Welcome!</h3>
            <p className="text-gray-600 text-center max-w-md">
              Join our community and get access to exclusive features and content.
            </p>
          </div>
          <div className="mt-8 w-full max-w-xs">
            <img 
              src="https://illustrations.popsy.co/amber/digital-nomad.svg" 
              alt="Sign up illustration"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="p-6 sm:p-8">
          <div className="lg:hidden flex flex-col items-center mb-6">
            <h1 className="text-3xl flex items-center justify-center space-x-2">
              <img src={Cloud_Icon} className="h-10 w-10" alt="Cloud icon" />
              <span className="text-gray-900">{firstLogoName}</span>
              <span className="font-bold text-gray-900">{secondLogoName}</span>
            </h1>
          </div>

          <h3 className="text-2xl font-semibold text-gray-900 mb-1">Create Account</h3>
          <p className="text-gray-600 mb-6">Join us to get started</p>

          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder=" "
                  className="w-full h-12 px-4 pt-3 pb-1 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-gray-400 peer transition-all"
                />
                <label 
                  htmlFor="username" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:left-4 peer-focus:bg-white peer-focus:px-1"
                >
                  Username
                </label>
              </div>

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

              <div className="relative">
                <Input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder=" "
                  className="w-full h-12 px-4 pt-3 pb-1 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-gray-400 peer transition-all"
                />
                <label 
                  htmlFor="phone" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:left-4 peer-focus:bg-white peer-focus:px-1"
                >
                  Phone Number
                </label>
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <input 
                type="checkbox" 
                name="terms" 
                id="terms" 
                className="h-4 w-4 text-black rounded border-gray-300 focus:ring-gray-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="text-gray-700 hover:underline">Terms</a> and <a href="#" className="text-gray-700 hover:underline">Privacy Policy</a>
              </label>
            </div>

            <div className="mt-6">
              <Button 
                type="submit" 
                className="w-full h-11 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition duration-200"
              >
                Sign Up
              </Button>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button 
                type="button"
                className="w-full h-11 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <FcGoogle />
                <span className="hidden sm:inline text-sm">Sign up with Google</span>
                <span className="sm:hidden">Google</span>
              </Button>

              <Button 
                type="button"
                className="w-full h-11 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <FaFacebook className=" text-blue-600" />
                <span className="hidden sm:inline text-sm">Sign up with Facebook</span>
                <span className="sm:hidden">Facebook</span>
              </Button>
            </div>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-gray-700 hover:text-black hover:underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;