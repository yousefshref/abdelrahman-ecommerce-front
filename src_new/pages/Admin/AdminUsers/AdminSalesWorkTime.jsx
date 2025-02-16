import React from "react";

const AdminSalesWorkTime = () => {
  return (
    <div>
      <select className="bg-green-800 border-none rounded w-1/3 mt-10">
        <option value="">اليوم</option>
        <option value="">امس</option>
        <option value="">الاسبوع الماضي</option>
        <option value="">الشهر الماضي</option>
        <option value="">السنة الماضية</option>
      </select>
      <div className="mt-4 bg-[#1f1f1f] rounded-lg p-2 overflow-auto h-[40vh]">
        <div className="sm:flex hidden justify-between items-center px-10">
          <p>الوقت النشط</p>
          <p>الوقت الغير نشط</p>
          <p>تفحص</p>
        </div>
        <hr className="border border-[#2f2f2f] my-1" />
        <div className="flex sm:flex-row flex-col sm:justify-between justify-center items-center sm:px-5 gap-5">
          <div className="flex flex-col items-start gap-5">
            <p className="sm:hidden block text-center text-2xl">الوقت النشط</p>
            {Array.from({ length: 3 }).map((_, index) => (
              <input
                type="text"
                value={"من 9:12   الي 10:12"}
                className="bg-lime-500/30 rounded border-none text-white text-center w-full"
              />
            ))}
            {Array.from({ length: 3 }).map((_, index) => (
              <input
                type="text"
                value={"-"}
                className="bg-lime-500/30 rounded border-none text-white text-center w-full"
              />
            ))}
          </div>
          <div className="flex flex-col items-center gap-5">
            <p className="sm:hidden block text-center text-2xl">
              الوقت الغير نشط
            </p>
            {Array.from({ length: 3 }).map((_, index) => (
              <input
                type="text"
                value={"من 3:12   الي 6:12"}
                className="bg-lime-500/30 rounded border-none text-white text-center w-full"
              />
            ))}
            {Array.from({ length: 3 }).map((_, index) => (
              <input
                type="text"
                value={"-"}
                className="bg-lime-500/30 rounded border-none text-white text-center w-full"
              />
            ))}
          </div>
          <div className="flex items-center gap-2 flex-col">
            <p className="sm:hidden block text-center text-2xl">تفحص</p>
            <img
              src="http://clipart-library.com/images_k/fingerprint-transparent-background/fingerprint-transparent-background-24.png"
              className="w-20"
            />
            <p className="bg-green-800 py-1 text-xl rounded text-center w-full">
              in 9:12
            </p>
            <p className="bg-red-400 py-1 text-xl rounded text-center w-full">
              out 10:12
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSalesWorkTime;
