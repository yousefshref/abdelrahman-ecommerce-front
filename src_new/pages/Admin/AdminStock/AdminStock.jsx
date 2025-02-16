import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { TiExport } from "react-icons/ti";
import { FaFilter } from "react-icons/fa";
import AdminInStockProducts from "../../../Components/AdminInStockProducts";
import AdminLowStockProducts from "../../../Components/AdminLowStockProducts";
import AdminOutOfStockProducts from "../../../Components/AdminOutOfStockProducts";

const AdminStock = () => {
  return (
    <AdminLayout>
      <div className="lg:p-10">
        <div className="flex flex-wrap items-center md:mt-0 mt-10 md:justify-between">
          <div className="flex gap-2 items-center">
            <div className="bg-green-600 w-3 h-1"></div>
            <p className="lg:text-4xl md:text-3xl text-2xl text-white">
              المخزون
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="flex gap-2 items-center bg-black text-white py-1 rounded-full w-fit px-2">
              Export
              <span>
                <TiExport />
              </span>
            </p>
            <p className="flex gap-2 items-center bg-black text-white py-1 rounded-full w-fit px-2">
              Filter
              <span>
                <FaFilter />
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <span className="font-bold bg-green-700 text-sm px-3 rounded-full">
                10
              </span>
              Showing
            </p>
          </div>
        </div>
        {/* tables */}
        <div className="mt-20 bg-[#1f1f1f] p-5 rounded-xl">
          <div className="md:flex hidden justify-around items-center bg-[#1f1f1f] py-2 rounded-xl">
            <h3 className="lg:text-3xl md:text-xl text-xs text-green-600 font-bold">
              في المخزون
            </h3>
            <h3 className="lg:text-3xl md:text-xl text-xs text-yellow-300 font-bold">
              كمية قليلة في المخزون
            </h3>
            <h3 className="lg:text-3xl md:text-xl text-xs text-red-600 font-bold">
              انتهي من المخزون
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 w-[100%]">
            <AdminInStockProducts />
            <AdminLowStockProducts />
            <AdminOutOfStockProducts />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminStock;
