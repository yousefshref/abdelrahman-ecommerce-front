import React, { useContext, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";

import { ProductsContextProvider } from "../../Contexts/ProductsContext";
import { productDetails } from "../../Variables/pathes";
import ProductCard from "./ProductCard";

const Products = () => {
  const productsContext = useContext(ProductsContextProvider);

  const products = productsContext?.products;

  useEffect(() => {
    productsContext?.fetchProducts();
  }, []);
  return (
    <div className="mt-20 bg-gray-50 p-5">
      <input
        type="text"
        className="w-full px-4 py-2 border-none lg:text-5xl md:text-3xl text-xl outline-none focus:ring-0 focus:outline-none bg-gray-50 text-gray-500"
        placeholder="ابحث عن منتجك"
      />
      <hr />
      <div className="mt-10 flex-wrap flex">
        {products?.map((product) => (
          <div className="w-1/4" key={product?.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
