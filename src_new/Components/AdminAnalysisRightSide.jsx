import React from "react";

const AdminAnalysisRightSide = () => {
  return (
    <div>
      {/* top */}
      <div className="bg-black p-5 rounded-lg">
        <div className="flex justify-between text-2xl">
          <p>زيارة المصادر</p>
          <a className="text-green-600 underline">جميع المصادر</a>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <img src="/logo.png" className="w-10" />
                <p className="text-lg">Safe Zone</p>
              </div>
              <select className="bg-lime-700/50 border-none rounded-none w-1/6">
                <option value="">13K بيع</option>
                <option value="">3K بيع</option>
                <option value="">5K بيع</option>
                <option value="">9K بيع</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* bottom */}
      <div className="bg-black p-5 rounded-lg mt-2">
        <div className="flex justify-between text-2xl">
          <p>مصدر المدن</p>
          <a className="text-green-600 underline">جميع المصادر</a>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <p className="text-lg">القاهرة</p>
              </div>
              <select className="bg-lime-700/50 border-none rounded-none w-1/6">
                <option value="">13K بيع</option>
                <option value="">3K بيع</option>
                <option value="">5K بيع</option>
                <option value="">9K بيع</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalysisRightSide;
