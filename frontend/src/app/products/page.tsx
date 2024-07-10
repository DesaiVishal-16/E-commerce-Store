"use client";

import React, { useEffect, useState } from "react";
import { fetchProducts } from "../utils/api";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export interface Product {
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
  const { addToCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    getProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (user) {
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        quantity: 1,
        image: product.image,
      });
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="mt-36 w-full overflow-x-hidden px-10 pb-40">
      <h1 className="text-3xl font-bold mb-6 text-sky-800">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border bg-sky-700 text-gray-100 rounded-lg shadow-lg p-4 flex flex-col items-center mt-2 cursor-pointer"
          >
            {product.image ? (
              <Image
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
                width={50}
                height={50}
                className="object-cover w-full h-80"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center bg-gray-200">
                <p>No image available</p>
              </div>
            )}
            <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
            <p className=" mt-2">{product.description}</p>
            <p className="text-lg font-bold mt-2">Rs.&nbsp;{product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
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
