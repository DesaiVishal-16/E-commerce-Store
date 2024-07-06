"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
}

const CartPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Sample Product",
      price: 49.99,
      quantity: 1,
      image: "sample.jpg",
    },
    {
      id: 2,
      name: "Another Product",
      price: 29.99,
      quantity: 2,
      image: "another.jpg",
    },
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const removeFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    console.log("Checkout process initiated...");

    router.push("/checkout");
  };

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  return (
    <div className="container mx-20 mt-8">
      <h1 className="text-3xl font-bold mb-4 text-sky-800 capitalize">
        {user?.username} Cart
      </h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border bg-sky-700 rounded-lg shadow-lg p-4 flex flex-col items-center mt-4"
              >
                {item.image ? (
                  <Image
                    src={`/images/${item.image}`}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center bg-gray-200">
                    <p>No image available</p>
                  </div>
                )}
                <h2 className="text-xl font-semibold mt-4">{item.name}</h2>
                <p className="text-lg font-bold mt-2">${item.price}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 text-gray-600 px-4 py-1 rounded-l-lg"
                  >
                    -
                  </button>
                  <span className="bg-gray-200 px-4 py-1 text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-600 px-4 py-1 rounded-r-lg"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 flex  absolute top-2 left-96">
            <div className="text-xl font-bold text-blue-800">
              Total: ${calculateTotal().toFixed(2)}
            </div>
          </div>
          <div className="mt-4 flex absolute top-2 right-20">
            <button
              onClick={handleCheckout}
              className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
