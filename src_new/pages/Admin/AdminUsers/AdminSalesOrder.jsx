import React from "react";

const AdminSalesOrder = () => {
  return (
    <div
      className="mt-2 bg-[#1f1f1f] p-2 rounded-lg h-[55vh] overflow-auto"
      style={{ scrollbarColor: "gray #1f1f1f" }}
    >
      <div className="flex justify-between items-center">
        <p>العميل</p>
        <p>التاريخ</p>
        <p>الحالة</p>
      </div>
      <hr className="border border-[#2f2f2f] my-2" />
      <div className="flex flex-col gap-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <div className="flex justify-between items-center">
            <p className="text-gray-400 border border-green-500 md:px-4 px-2 rounded-full text-lg">
              Claudia Alves
            </p>
            <p className="text-lg md:-mr-16 -mr-10">26/7/2022</p>
            <p className="text-green-500 text-xl">Success</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSalesOrder;
