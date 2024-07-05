"use client";

import Image from "next/image";
import logo from "../../../../public/logo.svg";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="login-page bg-sky-600 w-80 sm:w-3/4 lg:w-1/2 mx-auto my-32 sm:my-20 rounded-lg flex flex-col sm:flex-row justify-center sm:justify-between gap-10 sm:gap-0 shadow-xl p-6 sm:p-0">
      <div className="left-side flex flex-col items-center sm:items-start mx-4 my-0 sm:mx-10 sm:my-8">
        <h1 className="text-2xl text-gray-100">Welcome Back,</h1>
        <form className="mt-8 sm:mt-16 flex flex-col gap-6 sm:gap-8 w-full">
          <input
            className="text-base pl-2 text-white bg-inherit border-b-2 border-gray-300 outline-none placeholder-bold placeholder:text-white"
            type="email"
            name="email"
            placeholder="Enter Email"
            required
          />
          <input
            className="text-base pl-2 text-white bg-inherit border-b-2 border-gray-300 outline-none placeholder-bold placeholder:text-white"
            type="password"
            name="pass"
            placeholder="Enter Password"
            required
          />
          <button className="border-none text-sky-600 font-bold bg-gray-100 rounded-lg py-2 px-4 hover:bg-gray-200 shadow-lg">
            Login
          </button>
        </form>
        <div className="flex gap-2 mt-8 flex items-center">
          <h1 className="text-sm sm:text-base text-white">
            Don`t have an account?
          </h1>
          <button
            onClick={() => handleNavigation("/auth/signup")}
            className="text-white bg-transparent underline cursor-pointer font-bold"
          >
            SignUp
          </button>
        </div>
      </div>

      <div className="right-side hidden sm:block flex flex-col items-center justify-center border-l-2 border-gray-200 pl-10 rounded-l-full">
        <Image
          onClick={() => handleNavigation("/")}
          className="w-24 sm:w-32 cursor-pointer mt-10 ml-5"
          src={logo}
          alt="logo"
        />
        <h1 className="text-3xl sm:text-4xl text-gray-100 mt-10 sm:mt-10 relative right-4 font-semibold">
          ShopCart
        </h1>
      </div>
    </div>
  );
}
