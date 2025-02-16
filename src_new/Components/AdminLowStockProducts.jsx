import React, { useContext, useEffect } from "react";
import { ProductsContextProvider } from "../Contexts/ProductsContext";
import { server } from "../Variables/pathes";

const AdminLowStockProducts = () => {
  const { products } = useContext(ProductsContextProvider);
  const [lowStockProducts, setLowStockProducts] = React.useState([]);
  useEffect(() => {
    const filteredProducts = products.filter(
      (product) => product?.stock < product?.min_stock
    );

    setLowStockProducts(filteredProducts);
  }, [products]);
  return (
    <>
      <h3 className="text-3xl md:hidden block text-center text-yellow-300 font-bold">
        قليل في المخزون
      </h3>
      <div className="flex flex-col items-center bg-green-800/20 w-full p-5 rounded-xl mt-2 mx-auto -mr-1">
        <h3 className="lg:text-4xl text-2xl font-bold text-white bg-[#2f2f2f] lg:px-8 px-4 rounded-lg py-1">
          {lowStockProducts.length}
        </h3>
        <div className="flex flex-col gap-5 mt-10 w-full">
          {lowStockProducts?.map((product, index) => (
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
                  <h3 className="text-lg font-semibold text-white truncate">
                    {product?.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">
                    {product?.description.slice(0, 50)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="group peer ring-2 bg-red-900 rounded-full outline-none duration-700 after:duration-300 w-16 h-8 shadow-md peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:bg-emerald-900 peer-focus:outline-none after:content-[''] after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-5 after:w-5 after:top-1 after:left-1 peer-checked:after:translate-x-9 peer-hover:after:scale-95">
                    <svg
                      className="group-hover:scale-75 duration-300 absolute top-1 left-11 stroke-gray-900 w-5 h-5"
                      height="100"
                      viewBox="0 0 100 100"
                      width="100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M30,46V38a20,20,0,0,1,40,0v8a8,8,0,0,1,8,8V74a8,8,0,0,1-8,8H30a8,8,0,0,1-8-8V54A8,8,0,0,1,30,46Zm32-8v8H38V38a12,12,0,0,1,24,0Z"
                        fillRule="evenodd"
                      ></path>
                    </svg>

                    <svg
                      className="group-hover:scale-75 duration-300 absolute top-1 left-1 stroke-gray-900 w-5 h-5"
                      height="100"
                      viewBox="0 0 100 100"
                      width="100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="svg-fill-primary"
                        d="M50,18A19.9,19.9,0,0,0,30,38v8a8,8,0,0,0-8,8V74a8,8,0,0,0,8,8H70a8,8,0,0,0,8-8V54a8,8,0,0,0-8-8H38V38a12,12,0,0,1,23.6-3,4,4,0,1,0,7.8-2A20.1,20.1,0,0,0,50,18Z"
                      ></path>
                    </svg>
                  </div>
                </label>
                <h3 className="text-lg lg:text-xl font-bold text-white bg-[#2f2f2f] px-6 lg:px-8 rounded-lg py-1">
                  {product?.min_stock}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminLowStockProducts;
