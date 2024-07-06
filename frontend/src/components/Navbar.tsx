"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.svg";
import { IoBagHandle, IoSearchSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const Navbar: FC = () => {
  const [openSidebar, setOpenSidebar] = useState<Boolean>(false);
  const { user, login, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log("User state changed:", user);
  }, [user]);
  console.log(user);
  const toogleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    console.log("Navbar mounted");
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setOpenSidebar(false);
  };
  const handleLogout = () => {
    logout();
    handleNavigation("/");
  };

  return (
    <div className="w-full py-2 px-5 sm:px-20 sm:py-4 flex flex-col sm:flex-row flex-wrap sm:flex-nowrap gap-4 items-center border-b-2 bg-gray-100 text-black fixed top-0 drop-shadow-md">
      <div className="logo-name flex items-center gap-2">
        <Image
          onClick={() => handleNavigation("/")}
          className="w-10  cursor-pointer"
          src={logo}
          alt="logo"
        />
        <h1 className="text-xl text-sky-500 font-bold">ShopCart</h1>
      </div>

      <div className="search-box w-full relative mx-0 sm:mx-10 xl:mx-40">
        <IoSearchSharp className="absolute top-3 left-2 text-xl fill-sky-600" />
        <input
          className="px-8 py-2  rounded-lg bg-white w-full outline-none border-2 border-sky-400 text-sky-600"
          type="search"
          placeholder="Search Products"
        />
      </div>

      <div className="absolute top-0 right-0 rouunded-sm sm:relative sm:top-auto xl:right-20">
        <ul
          className={`relative w-40 sm:flex ${
            openSidebar ? "flex" : "hidden"
          } flex-col sm:flex-row items-center gap-4 sm:gap-2 h-screen sm:h-auto border-none bg-gray-100 sm:bg-transparent py-4 sm:py-0 shadow-lg sm:shadow-none`}
        >
          <li onClick={toogleSidebar}>
            <ImCross className="fill-gray-600 absolute top-2 right-4 text-lg sm:hidden" />
          </li>
          <li className="flex gap-2 mt-10 mr-0 sm:mt-0 xl:mr-6 cursor-pointer">
            <IoBagHandle className="text-2xl sm:text-4xl text-sky-600" />
            <span className="text-lg font-semibold text-sky-600 sm:hidden">
              Cart
            </span>
          </li>

          {user ? (
            <li className="px-4">
              <h1 className="text-base">
                Welcome,&nbsp;
                <span className="text-lg capitalize font-semibold text-sky-600">
                  {user.username}
                </span>
              </h1>
              <button
                onClick={handleLogout}
                className="text-lg font-bold bg-sky-600 text-gray-200 px-2 py-1 rounded-sm w-full mt-4"
              >
                Logout
              </button>
            </li>
          ) : (
            <li className="text-base sm:text-lg font-semibold text-sky-600 flex flex-col sm:flex-row gap-4 w-full px-2">
              <button
                onClick={() => handleNavigation("/auth/login")}
                className="cursor-pointer bg-sky-600 sm:bg-transparent text-gray-100 sm:text-sky-600 border-none py-1 rounded-sm"
              >
                Login
              </button>
              <span className="hidden  sm:block h-8 w-0.5 bg-gray-200"> </span>
              <button
                onClick={() => handleNavigation("/auth/signup")}
                className="cursor-pointer bg-sky-600 sm:bg-transparent text-gray-100 sm:text-sky-600 border-none py-1 rounded-sm"
              >
                Signup
              </button>
            </li>
          )}
        </ul>

        <GiHamburgerMenu
          onClick={toogleSidebar}
          className="sm:hidden text-2xl cursor-pointer mt-2 mr-2"
        />
      </div>
    </div>
  );
};

export default Navbar;
