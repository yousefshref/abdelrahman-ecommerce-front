import React, { useContext, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";

import { ProductsContextProvider } from "../../Contexts/ProductsContext";
import { productDetails } from "../../Variables/pathes";
import ProductCard from "./ProductCard";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import ProductCardSkeleton from "../ProductCardSkeleton";

const Products = () => {
  const productsContext = useContext(ProductsContextProvider);

  const products = productsContext?.products;


  const loading = productsContext?.loading;
  const search = productsContext?.search;
  const setSearch = productsContext?.setSearch;

  const [delayedSearch, setDelayedSearch] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(delayedSearch);
    }, 2000);

    return () => clearTimeout(handler); // Cleanup to prevent setting state if user types again before 2 sec
  }, [delayedSearch]);

  return (
    <div className="md:my-20 my-10 bg-gray-50 md:p-5 p-1">
      <input
        type="text"
        className="w-full px-4 py-2 border-none lg:text-5xl md:text-3xl text-xl outline-none focus:ring-0 focus:outline-none bg-gray-50 text-gray-500"
        placeholder="ابحث عن منتجك"
        value={delayedSearch}
        onChange={(e) => setDelayedSearch(e.target.value)}
      />
      <hr />
      <div className="mt-5 grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : products?.map((product) => (
          <div key={product?.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div >
  );
};

export default Products;
