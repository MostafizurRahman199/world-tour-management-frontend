import React from "react";
import { Link } from "react-router-dom";

interface DropDownProps {
  user: {
    picture: string;
    name: string;
    email: string;
  };
  handleLogout: () => void;
  isMobile: boolean;
}

const DropDown: React.FC<DropDownProps> = ({ user, handleLogout, isMobile }) => {
  return (
    <>
      {isMobile ? (
        <div className="p-4 bg-white rounded-xl shadow-lg border border-[#EDEAFF]">
          <div className="flex items-center gap-3 mb-4">
            <img src={user.picture} className="w-12 h-12 rounded-full border-2 border-[#C68EFD]" alt="profile" />
            <div>
              <p className="font-semibold text-[#8F87F1]">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="hover:cursor-pointer  w-full px-4 py-3 text-center font-semibold text-white rounded-xl 
            bg-[#8F87F1] hover:bg-[#C68EFD] transition shadow-md"
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="relative group">
            <button className="flex items-center gap-2">
              <img
                src={user.picture}
                alt="profile"
                className="w-10 h-10 rounded-full border-2 border-[#C68EFD] shadow-md cursor-pointer"
              />
            </button>

            {/* Dropdown */}
            <div
              className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-[#EDEAFF]
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-200 z-50"
            >
              <div className="p-4 border-b border-[#F3EBFF]">
                <p className="font-semibold text-[#8F87F1]">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>

              <button
                onClick={handleLogout}
                className="hover:cursor-pointer w-full text-left px-4 py-3 text-sm font-semibold 
                text-[#8F87F1] hover:bg-[#F4F1FF] transition rounded-b-xl"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DropDown;
