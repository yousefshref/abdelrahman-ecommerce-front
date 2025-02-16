import React, { useContext, useEffect } from "react";
import { server } from "../Variables/pathes";
import { ProductsContextProvider } from "../Contexts/ProductsContext";

const AdminOutOfStockProducts = () => {
  const { products } = useContext(ProductsContextProvider);
  const [outOfStockProducts, setOutOfStockProducts] = React.useState([]);
  useEffect(() => {
    const filteredProducts = products.filter((product) => product?.stock == 0);

    setOutOfStockProducts(filteredProducts);
  }, [products]);
  return (
    <>
      <h3 className="md:hidden block text-3xl text-center text-red-500 font-bold">
        انتهي من المخزون
      </h3>
      <div className="flex flex-col items-center bg-green-800/20 w-full p-5 rounded-xl mt-2 mx-auto">
        <h3 className="lg:text-4xl text-2xl font-bold text-white bg-[#2f2f2f] lg:px-8 px-4 rounded-lg py-1">
          {outOfStockProducts.length}
        </h3>
        <div className="flex flex-col gap-5 mt-10 w-full">
          {outOfStockProducts?.map((product, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row justify-between items-center w-full gap-4 p-3 bg-white/10 rounded-lg"
            >
              <div className="flex gap-4 items-center w-full min-w-0">
                <img
                  src={server + product?.image1}
                  className="w-[50px] h-[50px] object-cover rounded-md"
                  alt={product?.name}
                />
                <div className="flex flex-col min-w-0">
                  <h3 className="font-semibold text-white truncate">
                    {product?.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">
                    {product?.description.slice(0, 50)}
                  </p>
                </div>
              </div>
              <p className="text-xl font-bold text-red-500">Inactive</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminOutOfStockProducts;
