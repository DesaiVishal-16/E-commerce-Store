"use client";

import Image from "next/image";
import logo from "../../../../public/logo.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup } from "../../utils/api";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("Attempting signup with:", { username, email, password });
    try {
      const data = await signup(username, email, password);
      console.log("Signup successful", data);

      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (error) {
      console.error("Signup failed", error);
      setError("Signup failed. Please try again.");
    }
  };
  return (
    <div className="signup-page bg-sky-600 w-80 sm:w-3/4 lg:w-1/2 mx-auto my-32 sm:my-20 rounded-lg flex flex-col sm:flex-row justify-center sm:justify-between gap-10 sm:gap-0 shadow-xl p-6 sm:p-0">
      <div className="left-side flex flex-col items-center sm:items-start mx-4 my-0 sm:mx-10 sm:my-8">
        <h1 className="text-2xl text-gray-100">Create a Account</h1>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="mt-8 sm:mt-16 flex flex-col gap-6 sm:gap-8 w-full"
        >
          <input
            className="text-base pl-2 text-white bg-inherit border-b-2 border-gray-300 outline-none placeholder-bold placeholder:text-white"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            required
            autoComplete="username"
          />
          <input
            className="text-base pl-2 text-white bg-inherit border-b-2 border-gray-300 outline-none placeholder-bold placeholder:text-white"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
            autoComplete="email"
          />

          <input
            className="text-base pl-2 text-white bg-inherit border-b-2 border-gray-300 outline-none placeholder-bold placeholder:text-white"
            type="password"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            required
            autoComplete="current-password"
          />

          <button className="border-none text-sky-600 font-bold bg-gray-100 rounded-lg py-2 px-4 hover:bg-gray-200 shadow-lg">
            Sign Up
          </button>
        </form>
        <div className="flex gap-2 mt-8 flex items-center">
          <h1 className="text-sm sm:text-base text-white">
            Do you have an account?
          </h1>
          <button
            onClick={() => handleNavigation("/auth/login")}
            className="text-white bg-transparent underline cursor-pointer font-bold"
          >
            Login
          </button>
        </div>
      </div>

      <div className="right-side hidden sm:block flex flex-col items-center justify-center border-l-2 border-gray-200 pl-10 rounded-l-full">
        <Image
          onClick={() => handleNavigation("/")}
          className="w-24 sm:w-32 cursor-pointer mt-20 ml-5"
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
