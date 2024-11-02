import React, { useContext, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";

import { ProductsContextProvider } from "../../Contexts/ProductsContext";
import { productDetails } from "../../Variables/pathes";
import ProductCard from "./ProductCard";
import { Box, Flex, Skeleton } from "@chakra-ui/react";

const Products = () => {
  const productsContext = useContext(ProductsContextProvider);

  const products = productsContext?.products;

  const [loading, setLoading] = React.useState(false);

  const handleGetProducts = async () => {
    setLoading(true);
    await productsContext?.fetchProducts();
    setLoading(false);
  };

  useEffect(() => {
    handleGetProducts()
  }, []);
  return (
    <div className="my-20 bg-gray-50 md:p-5 p-1">
      <input
        type="text"
        className="w-full px-4 py-2 border-none lg:text-5xl md:text-3xl text-xl outline-none focus:ring-0 focus:outline-none bg-gray-50 text-gray-500"
        placeholder="ابحث عن منتجك"
      />
      <hr />
      <div className="mt-5 grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Box className="flex flex-col gap-2">
              <Skeleton
                height="300px"
                width="300px"
                borderRadius="10px"
                startColor="gray.300"
                endColor="gray.400"
              />
              <Skeleton
                height="15px"
                width="150px"
                borderRadius="10px"
                startColor="gray.300"
                endColor="gray.400"
              />
              <Flex gap={5}>
                <Skeleton
                  height="30px"
                  width="140px"
                  borderRadius="10px"
                  startColor="gray.300"
                  endColor="gray.400"
                />
                <Skeleton
                  height="30px"
                  width="140px"
                  borderRadius="10px"
                  startColor="gray.300"
                  endColor="gray.400"
                />
              </Flex>
              <Skeleton
                height="10px"
                width="120px"
                borderRadius="10px"
                startColor="gray.300"
                endColor="gray.400"
                className="mt-3"
              />
            </Box>
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
