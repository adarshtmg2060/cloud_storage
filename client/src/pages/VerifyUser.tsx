import React from 'react';
import { APP_NAME } from "../constants/App";
import Cloud_Icon from "../assets/cloud-icon.svg";
import { FiCheckCircle } from "react-icons/fi";
import Button from "../ui/component/Button/Button";

const VerifyUser = () => {
  const [firstLogoName, secondLogoName] = APP_NAME.split(" ");
  const [isVerified, setIsVerified] = React.useState(false);

  // This would typically come from your verification logic
  React.useEffect(() => {
    // Simulate verification
    const timer = setTimeout(() => {
      setIsVerified(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="verify-page min-h-screen flex justify-center items-center bg-white p-4">
      <div className="verify-container border border-gray-300 bg-white shadow-sm w-full max-w-md rounded-lg p-6 sm:p-8 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl flex items-center justify-center space-x-2 mb-6">
            <img src={Cloud_Icon} className="h-10 w-10" alt="Cloud icon" />
            <span className="text-gray-900">{firstLogoName}</span>
            <span className="font-bold text-gray-900">{secondLogoName}</span>
          </h1>
          
          {isVerified ? (
            <>
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <FiCheckCircle className="text-green-600 text-4xl" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Email Verified!</h3>
              <p className="text-gray-600 mb-6">
                Your email address has been successfully verified.
              </p>
              <Button 
                className="w-full bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition duration-200 py-3"
              >
                Continue to Dashboard
              </Button>
            </>
          ) : (
            <>
              <div className="animate-pulse bg-gray-100 p-4 rounded-full mb-4 w-16 h-16"></div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Verifying Email...</h3>
              <p className="text-gray-600">
                Please wait while we verify your email address
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyUser;