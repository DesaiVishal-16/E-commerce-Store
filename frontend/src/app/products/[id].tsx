"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { fetchProductById } from "../utils/api";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        const product = await fetchProductById(Number(id));
        setProduct(product);
      };

      getProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.image}</h1>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductDetailPage;
