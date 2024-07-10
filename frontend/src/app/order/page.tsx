"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "../context/CartContext";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const OrderPage: React.FC = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { cartItems } = useCart();
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderTotal, setOrderTotal] = useState(0);

  useEffect(() => {
    setOrderItems(cartItems);

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setOrderTotal(total);
  }, [cartItems]);

  const handleContinueShopping = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 text-sky-800 pl-20">
        Order Summary
      </h1>
      {user ? (
        <div className="max-w-lg mx-auto text-sky-600">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>
                  Rs.&nbsp;{item.price.toFixed(2)} x {item.quantity}
                </span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>Rs.&nbsp;{orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleContinueShopping}
              className="bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      ) : (
        <p>Please log in to view your order.</p>
      )}
    </div>
  );
};

export default OrderPage;
