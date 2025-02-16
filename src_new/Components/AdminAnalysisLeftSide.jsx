import React from "react";
import { IoAnalytics } from "react-icons/io5";
import { ImFolderDownload } from "react-icons/im";
import { FaPlus } from "react-icons/fa";

const AdminAnalysisLeftSide = () => {
  return (
    <div>
      {/* top */}
      <div className="bg-black p-5 rounded-lg flex flex-wrap justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold">التقرير العام</p>
            <select className="bg-lime-700/50 border-none rounded-none w-1/3">
              <option value="">اسبوعيا</option>
              <option value="">شهريا</option>
              <option value="">يوميا</option>
            </select>
          </div>
          <p className="text-lg text-gray-300 mt-10">المبلغ الاجمالي</p>
          <div className="flex gap-3 items-center">
            <h3 className="text-6xl font-sans font-semibold">126,613</h3>
            <span className="text-lime-600 text-3xl mt-10 flex gap-1 items-center">
              <span className="text-gray-300 text-base">12,3%</span>
              <IoAnalytics />{" "}
            </span>
          </div>
          <div className="flex gap-2 items-center mt-5 mr-5">
            <p className="text-lg text-gray-300">إجمالي صافي الإيرادات</p>
            <span className="text-lg text-gray-300">43,000</span>
          </div>
          <button className="bg-lime-700/60 flex justify-between items-center w-full py-1 px-3 text-xl rounded mt-5">
            تحميل التقرير
            <span className="text-lg">
              <ImFolderDownload />
            </span>
          </button>
          <p className="text-lg text-gray-300 mt-5">اخر تحديث منذ 1 ساعة</p>
        </div>
        <div className="bg-[#2f2f2f] p-5 flex flex-col gap-4">
          <div>
            <p className="text-lg text-gray-300">اجمالي الايرادات</p>
            <p className="text-2xl font-sans font-semibold">43,000</p>
            <span className="text-lime-600 text-3xl flex gap-1 items-center">
              <span className="text-gray-300 text-base">12,3%</span>
              <IoAnalytics />{" "}
            </span>
          </div>
          <div>
            <p className="text-lg text-gray-300">الطلبات</p>
            <p className="text-2xl font-sans font-semibold">122</p>
            <span className="text-red-600 text-3xl flex gap-1 items-center">
              <span className="text-gray-300 text-base">0,3%</span>
              <IoAnalytics />{" "}
            </span>
          </div>
          <div>
            <p className="text-lg text-gray-300">العملاء</p>
            <p className="text-2xl font-sans font-semibold">2,452</p>
            <span className="text-red-600 text-3xl flex gap-1 items-center">
              <span className="text-gray-300 text-base">0,3%</span>
              <IoAnalytics />{" "}
            </span>
          </div>
          <div>
            <p className="text-lg text-gray-300">
              النفقات (العمولة و التكاليف)
            </p>
            <p className="text-2xl font-sans font-semibold">2,452</p>
            <span className="text-red-600 text-3xl flex gap-1 items-center">
              <span className="text-gray-300 text-base">0,3%</span>
              <IoAnalytics />{" "}
            </span>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="mt-1">
        <div className="bg-black p-5 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center mt-5">
              <p className="bg-red-600 w-3 h-1"></p>
              <p className="text-2xl font-bold">النتفقات</p>
            </div>
            <button className="bg-green-700/60 flex justify-between items-center md:w-1/3 w-1/2 py-1 px-3 text-xl rounded mt-5">
              تكلفة اضافية
              <span>
                <FaPlus />
              </span>
            </button>
          </div>
          <div className="mt-2 bg-[#2f2f2f] p-5">
            <div className="flex justify-between items-center gap-10">
              <p className="bg-red-400/40 text-center py-1 px-2 rounded md:w-1/3 w-1/2">
                مبيعات العمولة
              </p>
              <p className="bg-red-400/40 text-center py-1 px-2 rounded md:w-1/3 w-1/2">
                تكلفة اضافية
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="mt-2 flex flex-col gap-2 md:w-1/3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="flex justify-between items-end w-full md:gap-0 gap-5">
                    <p className="text-xl font-semibold">Nourhan</p>
                    <p className="text-xl font-semibold">2,543</p>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex flex-col md:w-1/3 gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div className="flex justify-between items-start gap-10">
                    <p className="text-xl font-semibold">3000</p>
                    <p className="text-xl font-semibold">ايجار</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalysisLeftSide;
