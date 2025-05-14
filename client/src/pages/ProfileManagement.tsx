import React from 'react';
import { APP_NAME } from "../constants/App";
import Cloud_Icon from "../assets/cloud-icon.svg";
import { FiUser, FiSave, FiLogOut } from "react-icons/fi";
import Input from "../ui/component/Input/Input";
import Button from "../ui/component/Button/Button";

const ProfileManagement = () => {
  const [firstLogoName, secondLogoName] = APP_NAME.split(" ");
  const [user, setUser] = React.useState({
    name: "John Doe",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle profile update logic
  };

  return (
    <div className="profile-page min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 mb-8">
          <img src={Cloud_Icon} className="h-8 w-8" alt="Cloud icon" />
          <h1 className="text-xl font-semibold">
            <span>{firstLogoName}</span>
            <span className="font-bold">{secondLogoName}</span>
          </h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Profile Settings</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-200 rounded-full w-16 h-16 flex items-center justify-center">
                    <FiUser className="text-gray-500 text-xl" />
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      type="button"
                      className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1 text-sm rounded-lg"
                    >
                      Change
                    </Button>
                    <Button 
                      type="button"
                      className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-1 text-sm rounded-lg"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full h-12 px-4 pt-3 pb-1 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-gray-400 peer transition-all"
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:left-4 peer-focus:bg-white peer-focus:px-1"
                  >
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <Input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
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
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="password"
                    name="currentPassword"
                    value={user.currentPassword}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full h-12 px-4 pt-3 pb-1 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-gray-400 peer transition-all"
                  />
                  <label 
                    htmlFor="currentPassword" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:left-4 peer-focus:bg-white peer-focus:px-1"
                  >
                    Current Password
                  </label>
                </div>

                <div className="relative">
                  <Input
                    type="password"
                    name="newPassword"
                    value={user.newPassword}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full h-12 px-4 pt-3 pb-1 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-gray-400 peer transition-all"
                  />
                  <label 
                    htmlFor="newPassword" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:left-4 peer-focus:bg-white peer-focus:px-1"
                  >
                    New Password
                  </label>
                </div>

                <div className="relative">
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleChange}
                    placeholder=" "
                    className="w-full h-12 px-4 pt-3 pb-1 rounded-lg border border-gray-300 focus:border-black focus:ring-1 focus:ring-gray-400 peer transition-all"
                  />
                  <label 
                    htmlFor="confirmPassword" 
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:text-xs peer-focus:text-gray-600 peer-focus:top-2 peer-focus:translate-y-0 peer-focus:left-4 peer-focus:bg-white peer-focus:px-1"
                  >
                    Confirm New Password
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button 
                type="button"
                className="flex items-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg"
              >
                <FiLogOut />
                Logout
              </Button>
              <Button 
                type="submit"
                className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
              >
                <FiSave />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;