import { Avatar } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCommentDots, FaFilter, FaRegClock } from "react-icons/fa";
import { IoIosSend, IoIosShareAlt } from "react-icons/io";
import AdminSalesCommissions from "../../pages/Admin/AdminUsers/AdminSalesCommissions";
import AdminSalesOrder from "../../pages/Admin/AdminUsers/AdminSalesOrder";
import AdminSalesWorkTime from "../../pages/Admin/AdminUsers/AdminSalesWorkTime";
import { adminUsers } from "../../Variables/pathes";

const AdminUsersRightSide = () => {
  const [currentPage, setCurrentPage] = useState("العمولة");
  return (
    <div
      className={`bg-[#0f0f0f] ${
        currentPage !== "مواقيت العمل" ? "h-[100vh]" : "h-[80vh]"
      } p-5 rounded-xl`}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-5 items-center">
          <span className="text-3xl text-green-700">
            <IoIosSend />
          </span>
          <span className="text-3xl text-green-700">
            <FaCommentDots />
          </span>
          <span className="text-3xl text-gray-400">
            <IoIosShareAlt />
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-2xl">Mohamed Ali</p>
          <Avatar
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            size={"sm"}
          />
        </div>
      </div>

      <div className="flex justify-evenly mt-10 border-b border-[#1f1f1f]">
        <p
          onClick={() => setCurrentPage("العمولة")}
          className={`lg:text-xl md:text-lg text-base cursor-pointer ${
            currentPage === "العمولة" &&
            "text-green-600 border-b border-green-60"
          }`}
        >
          العمولة
        </p>
        <p
          onClick={() => setCurrentPage("الطلبات")}
          className={`lg:text-xl md:text-lg text-base cursor-pointer ${
            currentPage === "الطلبات" &&
            "text-green-600 border-b border-green-60"
          }`}
        >
          الطلبات
        </p>
        <p
          onClick={() => setCurrentPage("مواقيت العمل")}
          className={`lg:text-xl md:text-lg text-base cursor-pointer ${
            currentPage === "مواقيت العمل" &&
            "text-green-600 border-b border-green-60"
          }`}
        >
          مواقيت العمل
        </p>
      </div>
      {currentPage !== "مواقيت العمل" && (
        <div className="flex justify-between items-center gap-2 md:gap-4">
          <div className="flex flex-col gap-2 w-full md:w-1/2 mt-2">
            <h3 className="bg-lime-700/50 w-full text-xl flex justify-between items-center py-1 px-4 rounded-lg">
              {currentPage === "العمولة" ? "اخر عمولة" : "اخر طلبات"}
              <span className="bg-green-800/80 text-lg font-semibold py-2 px-4 -ml-4 rounded underline">
                {currentPage === "العمولة" ? "6000" : "29"}
              </span>
            </h3>
            <h3 className="bg-[#1f1f1f] w-full text-sm flex justify-between items-center py-1 px-4 rounded-lg">
              {currentPage === "العمولة" ? "مجموع العمولة" : "مجموع الطلبات"}
              <span className="bg-green-800/40 text-lg font-semibold py-2 -ml-4 px-4 rounded">
                {currentPage === "العمولة" ? "42000" : "122"}
              </span>
            </h3>
          </div>

          <div className="flex w-full items-center md:mt-10 justify-between md:flex-row flex-col">
            <div
              className={`flex gap-4 bg-green-700 items-center text-white md:w-1/2 w-full md:p-2 p-1 rounded-lg mt-4 md:mt-8 justify-between`}
            >
              <p>من: 1.7.2025</p>
              <p className="flex gap-2 items-center">
                <FaRegClock /> الي: 1.8.2025
              </p>
            </div>

            {currentPage === "الطلبات" ? (
              <p className="flex gap-2 items-center mt-4 md:mt-8 bg-[#1f1f1f] text-white py-1 rounded-full px-3 w-fit text-sm md:text-base">
                Filter
                <span>
                  <FaFilter />
                </span>
              </p>
            ) : (
              <div className="flex flex-wrap gap-3 items-center bg-[#1f1f1f] md:p-2 p-1 rounded-xl md:w-1/2 w-full justify-center mt-4 md:mt-8 text-sm md:text-base">
                <p className="flex gap-2 items-center">
                  غير مدفوع
                  <span className="w-2 h-2 bg-white rounded-full cursor-pointer"></span>
                </p>
                <p className="flex gap-2 items-center">
                  مدفوع
                  <span className="w-2 h-2 bg-white rounded-full cursor-pointer"></span>
                </p>
                <p className="flex gap-2 items-center">
                  الكل
                  <span className="w-2 h-2 bg-green-700 rounded-full cursor-pointer"></span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* pages */}
      <div>
        {currentPage === "العمولة" && <AdminSalesCommissions />}
        {currentPage === "الطلبات" && <AdminSalesOrder />}
        {currentPage === "مواقيت العمل" && <AdminSalesWorkTime />}
      </div>
    </div>
  );
};

export default AdminUsersRightSide;
