import React from "react";

import { IoIosSend } from "react-icons/io";

const AdminSalesCommissions = () => {
  return (
    <div
      className="mt-1 bg-[#1f1f1f] h-[55vh] p-2 rounded-lg overflow-auto"
      style={{ scrollbarColor: "gray #1f1f1f" }}
    >
      <div className="flex justify-between mb-1">
        <p className="mr-2">التاريخ</p>
        <div className="flex gap-16 justify-center m-auto">
          <p>الكمية</p>
          <p>الحالة</p>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <div className="flex justify-between items-center bg-lime-500/10 px-2 py-1 rounded-lg">
            <p className="md:text-xl text-sm">1.7.2025 - 1.8.2025</p>
            <div className="flex gap-12">
              <p className="md:text-xl text-sm">6,329</p>
              <p className="text-red-500 md:text-xl text-sm">غير مدفوع</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 items-center">
              <span className="md:text-2xl text-green-600">
                <IoIosSend />
              </span>
              <p className="bg-green-700 text-sm md:px-3 px-1 md:py-1 py-0.5 rounded">
                مدفوع
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSalesCommissions;
