"use client";

import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    getProducts();
  }, []);

  const handleAddToCart = (productId: number) => {
    if (user) {
      router.push("/cart");
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="absolute top-32 left-10 w-full overflow-x-hidden px-10">
      <h1 className="text-3xl font-bold mb-6 text-sky-800">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pr-20">
        {products.map((product) => (
          <div
            key={product.id}
            className="border bg-sky-700 text-gray-100 rounded-lg shadow-lg p-4 flex flex-col items-center mt-10 cursor-pointer"
          >
            {product.image ? (
              <Image
                src={`http://localhost:8000/media/${product.image}`}
                alt={product.name}
                width={50}
                height={100}
                className="object-cover"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center bg-gray-200">
                <p>No image available</p>
              </div>
            )}
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className=" mt-2">{product.description}</p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="mt-3 w-full bg-gray-200 text-sky-600 rounded-full font-bold hover:bg-gray-300 text-lg"
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
