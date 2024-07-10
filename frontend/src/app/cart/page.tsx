"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";

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
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleCheckout = () => {
    console.log("Checkout process initiated...");
    router.push("/checkout");
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="container mx-20 mt-8">
      <h1 className="text-3xl font-bold mb-4 text-sky-800 capitalize">
        {user?.username} Cart
      </h1>
      {cartItems.length === 0 ? (
        <div className="flex-col text-center justify-center items-center">
          <p className="text-4xl text-red-500">Your cart is empty.</p>
          <br />
          <button
            onClick={() => handleNavigation("/")}
            className="text-xl font-bold text-gray-100 bg-sky-600 rounded-md py-2 px-4"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-col-1 mt-10 gap-6 pb-20 ">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border w-1/2 h-20 bg-sky-700 text-gray-100 rounded-lg shadow-lg p-4 flex items-center justify-between  ml-4 cursor-pointer"
              >
                {item.image ? (
                  <Image
                    src={`http://localhost:8000${item.image}`}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="object-cover w-10 h-10"
                  />
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center bg-gray-200">
                    <p>No image available</p>
                  </div>
                )}
                <h2 className="text-xl font-semibold mt-4 text-white">
                  {item.name}
                </h2>
                <p className="text-lg font-bold mt-2 text-white">
                  Rs.&nbsp;{item.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
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
            <div className="text-2xl font-bold text-green-600">
              Total: Rs.&nbsp;{calculateTotal().toFixed(2)}
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
