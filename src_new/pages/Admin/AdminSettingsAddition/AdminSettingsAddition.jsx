import React, { useContext } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { GrLanguage } from "react-icons/gr";
import { StatesContextProvider } from "../../../Contexts/StatesContext";
import { FaLanguage } from "react-icons/fa";

const AdminSettingsAddition = () => {
  const { states, deleteState, createState } = useContext(
    StatesContextProvider
  );
  const [openCreate, setOpenCreate] = React.useState(false);
  const [rank, setRank] = React.useState(0);
  const [name, setName] = React.useState("");
  const [shippingPrice, setShippingPrice] = React.useState(0);
  const [fastShippingPrice, setFastShippingPrice] = React.useState(0);
  const [expiryStock, setExpiryStock] = React.useState("مفعل");

  const handleCreateState = async () => {
    const data = {
      name,
      shipping_price: shippingPrice,
      fast_shipping_price: fastShippingPrice,
      rank,
    };
    await createState(data, setOpenCreate);
  };

  return (
    <AdminLayout>
      <div className="md:p-5">
        <div className="bg-black p-5 rounded-lg">
          <div className="flex justify-between flex-wrap items-center">
            <div className="flex gap-2 items-center">
              <p className="w-2 h-1 bg-green-500"></p>
              <p className="underline text-2xl">التفاصيل الاساسية</p>
            </div>
            <div className="flex gap-2 items-center">
              <button className="bg-green-700 py-1 px-4 rounded">
                حفظ التغييرات
              </button>
              <button className="bg-white text-black py-1 px-2 rounded">
                الغاء
              </button>
            </div>
          </div>
          <div className="bg-[#5f5f5f] flex justify-between items-center p-3 rounded-lg mt-10 flex-wrap gap-4">
            <div className="flex flex-col sm:flex-row md:gap-4 gap-2 items-center w-full sm:w-auto">
              <p className="md:text-4xl text-2xl">الوضع المظلم</p>
              <select className="bg-[#4f4f4f] border-none w-full sm:w-[200px] p-2 rounded-md">
                <option value="الوضع المظلم">الوضع المظلم</option>
                <option value="الوضع الساطع">الوضع الساطع</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
              <p className="md:text-4xl text-2xl flex gap-2 items-center">
                <GrLanguage size={20} className="text-black" />
                اللغة
              </p>
              <select className="bg-[#4f4f4f] border-none w-full sm:w-[200px] p-2 rounded-md">
                <option value="العربية">العربية</option>
                <option value="الانجليزية">الانجليزية</option>
              </select>
            </div>

            <div className="flex gap-2 items-center w-full sm:w-auto">
              <p className="md:text-4xl text-2xl flex gap-2 items-center">
                حجم الخط
              </p>
              <input
                type="number"
                className="bg-white border-none text-black w-[50px] p-1 rounded-md text-center"
                value={10}
              />
            </div>
          </div>

          <div className="flex flex-col mt-5">
            <h2 className="md:text-4xl text-2xl">الاشعارات</h2>

            <div className="bg-[#5f5f5f] flex flex-col sm:flex-row justify-around items-center p-3 rounded-lg mt-10 gap-4 flex-wrap">
              <div className="flex flex-col gap-3 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <p className="md:text-xl text-2xl">الطلبات الجديدة</p>
                  <select className="bg-[#4f4f4f] border-none w-full sm:w-[120px] p-2 rounded-md">
                    <option value="مفعل">مفعل</option>
                    <option value="غير مفعل">غير مفعل</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <p className="md:text-xl text-2xl">الرسائل الجديدة</p>
                  <select className="bg-[#4f4f4f] border-none w-full sm:w-[120px] p-2 rounded-md">
                    <option value="مفعلة">مفعلة</option>
                    <option value="غير مفعلة">غير مفعلة</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
                <p className="md:text-xl text-2xl">مخزون انتهاء الصلاحية</p>
                <select
                  onChange={(e) => setExpiryStock(e.target.value)}
                  className={`border-none w-full sm:w-[120px] p-2 rounded-md ${
                    expiryStock === "مفعل" ? "bg-green-700" : "bg-red-700"
                  }`}
                >
                  <option value="مفعل">مفعل</option>
                  <option value="غير مفعل">غير مفعل</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 bg-black p-5 rounded-lg md:h-fit">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <p className="w-2 h-1 bg-green-500"></p>
              <p className="underline text-2xl">المدن</p>
            </div>
            <button
              onClick={() => setOpenCreate(true)}
              className="bg-green-700 py-1 px-4 rounded"
            >
              اضافة مدينة
            </button>
          </div>
          <div className="flex gap-10 items-center justify-center mt-5 mr-10 flex-wrap">
            {states.map((state) => (
              <div className="flex flex-col items-center justify-center bg-[#5f5f5f] py-3 px-5 rounded-lg">
                <p>{state.rank}</p>
                <p>{state.name}</p>
                <p>{state.shipping_price}</p>
                <hr className="border border-[#4f4f4f] w-full" />
                <div className="flex items-center justify-center gap-2 text-sm">
                  <p>الشحن السريع</p>
                  <p>
                    {state.fast_shipping_price ? (
                      state.fast_shipping_price
                    ) : (
                      <span className="text-red-300">لا يوجد</span>
                    )}
                  </p>
                </div>
                <hr className="border border-[#4f4f4f] w-full" />
                <div className="mt-2 flex gap-2 items-center">
                  <button className="border border-green-600 py-1 px-2 rounded">
                    تعديل
                  </button>
                  <button
                    onClick={() => deleteState(state.id)}
                    className="border border-red-600 py-1 px-2 rounded"
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
            {openCreate && (
              <div className="flex flex-col items-center justify-center bg-[#5f5f5f] py-3 px-5 rounded-lg">
                <input
                  type="number"
                  placeholder="الترتيب"
                  className="text-center mb-1 border-none rounded-full bg-[#4f4f4f] w-full"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="اسم المدينة"
                  className="text-center mb-1 border-none rounded-full bg-[#4f4f4f] w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="سعر الشحن"
                  className="text-center mb-1 border-none rounded-full bg-[#4f4f4f] w-full"
                  value={shippingPrice}
                  onChange={(e) => setShippingPrice(e.target.value)}
                />
                <hr className="border border-[#4f4f4f] w-full my-2" />
                <div className="flex items-center justify-center gap-2 text-sm">
                  <p>الشحن السريع</p>
                  <input
                    type="number"
                    placeholder="سعر  الشحن السريع"
                    className="text-center border-none rounded-full bg-[#4f4f4f]"
                    value={fastShippingPrice}
                    onChange={(e) => setFastShippingPrice(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleCreateState}
                  className="border border-green-600 py-1 px-2 rounded w-full mt-2"
                >
                  اضافة
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettingsAddition;
