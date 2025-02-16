import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { BiSolidBellRing } from "react-icons/bi";
import { IoMdMenu } from "react-icons/io";
import Sales from "../../../Components/Sales";
import OrderRecently from "../../../Components/OrderRecently";
import MonthlyReports from "../../../Components/MonthlyReports";

const SellerHome = () => {
  return (
    <>
      <div className="mt-8 px-2 md:px-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-4xl text-white">NADIA MOHAMED</h1>
          <div className="flex gap-4 items-center">
            <span className="text-2xl md:text-4xl bg-[#2f2f2f] p-2 rounded-xl cursor-pointer">
              <BiSolidBellRing />
            </span>
            <span className="text-2xl md:text-4xl bg-green-600 p-2 rounded-xl cursor-pointer">
              <IoMdMenu />
            </span>
          </div>
        </div>
        <div className="mt-8 md:mt-[80px] grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-10">
            <Sales />
            <OrderRecently />
          </div>
          <div className="w-full">
            <MonthlyReports />
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerHome;
