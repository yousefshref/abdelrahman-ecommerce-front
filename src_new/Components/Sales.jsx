import React from "react";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const Sales = () => {
  return (
    <div className="bg-[#1f1f1f] sm:py-5 py-5 sm:px-10 px-5 rounded-2xl w-full">
      <div className="flex justify-between items-center">
        <MdKeyboardDoubleArrowDown className="text-green-600 text-xl" />
        <h3 className="text-2xl font-light text-white">Sales</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-5">
        <div className="bg-green-600 flex flex-col items-center w-full px-4 py-5 rounded-2xl">
          <span className="text-4xl font-light text-white">500</span>
          <p className="text-lg font-semibold text-white">Orders</p>
        </div>
        <div className="border flex flex-col items-center w-full px-4 py-5 rounded-2xl">
          <span className="text-4xl font-light text-white">200</span>
          <p className="text-green-600 text-lg font-semibold">Delivered</p>
        </div>
        <div className="border flex flex-col items-center w-full px-4 py-5 rounded-2xl">
          <span className="text-4xl font-light text-white">100</span>
          <p className="text-yellow-200 text-lg font-semibold">Pending</p>
        </div>
        <div className="border flex flex-col items-center w-full px-4 py-5 rounded-2xl">
          <span className="text-4xl font-light text-white">20</span>
          <p className="text-red-300 text-lg font-semibold">Return</p>
        </div>
      </div>
    </div>
  );
};

export default Sales;
