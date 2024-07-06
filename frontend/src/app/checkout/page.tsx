"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting order:", shippingDetails);

    router.push("/order-summary");
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-sky-800">Checkout</h1>
      {user ? (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-sky-600">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Full Name</span>
              <input
                type="text"
                name="fullName"
                value={shippingDetails.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Address</span>
              <input
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">City</span>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Postal Code</span>
              <input
                type="text"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                required
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Country</span>
              <input
                type="text"
                name="country"
                value={shippingDetails.country}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 rounded-lg bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                required
              />
            </label>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700"
            >
              Place Order
            </button>
          </div>
        </form>
      ) : (
        <p>Please log in to proceed to checkout.</p>
      )}
    </div>
  );
};

export default CheckoutPage;
