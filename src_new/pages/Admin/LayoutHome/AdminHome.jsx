import React, { useEffect } from "react";
import { Avatar } from "@chakra-ui/react";
import { FaBell, FaSearch } from "react-icons/fa";
import AdminMonthlyRevenue from "../../../Components/AdminMonthlyRevenue";
import AdminSellerReports from "../../../Components/AdminSellerReports";
import axios from "axios";
import { server } from "../../../Variables/pathes";

const AdminHome = () => {
  const [homeData, setHomeData] = React.useState({
    'total_orders': 0,
    'out_of_stock': 0,
    'products': 0,
    'best_seller': 0
  });

  const [month, setMonth] = React.useState('')
  const [year, setYear] = React.useState(new Date().getFullYear().toString());

  const getHomeData = async () => {
    const response = await axios.get(`${server}get_home_for_admin/?month=${month}&year=${year}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
    setHomeData(response.data)
  };

  useEffect(() => {
    getHomeData()
  }, [month, year])
  return (
    <>
      {/* search bar */}
      <div className="flex justify-between mb-10 mt-5">
        <div className="flex gap-2 items-center">
          <span className="text-2xl font-bold">ADMIN</span>
          <img
            className="rounded-full w-[80px] h-[80px]"
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            size="sm"
          />
          <FaBell className="text-2xl" />
        </div>
        <div className="relative w-1/4 h-fit">
          <input className="rounded-xl border border-gray-500 bg-transparent w-full pr-10 pl-10 py-2" />
          <FaSearch className="absolute text-gray-500 top-1/2 mt-1.5 left-3 transform -translate-y-1/2" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 bg-[#0f0f0f] py-10 rounded-2xl">
        <div className="flex flex-col items-center gap-5">
          <h3 className="text-4xl font-semibold">افضل بائع</h3>
          <p className="text-xl font-semibold bg-emerald-800 py-2 px-4 rounded-full">
            {homeData?.best_seller}
          </p>
        </div>
        <div className="flex flex-col items-center gap-5 border-t lg:border-t-0 lg:border-l-4 border-[#1f1f1f] lg:pl-10 pt-5 lg:pt-0">
          <h3 className="text-4xl font-semibold">المنتجات</h3>
          <p className="text-4xl font-semibold">{homeData?.products}</p>
        </div>
        <div className="flex flex-col items-center gap-5 border-t lg:border-t-0 lg:border-l-4 border-[#1f1f1f] lg:pl-10 pt-5 lg:pt-0">
          <h3 className="text-4xl font-semibold">خارج المخزون</h3>
          <p className="text-4xl font-semibold">{homeData?.out_of_stock}</p>
        </div>
        <div className="flex flex-col items-center gap-5 border-t lg:border-t-0 lg:border-l-4 border-[#1f1f1f] lg:pl-10 pt-5 lg:pt-0">
          <h3 className="text-4xl font-semibold">مجموع الربح</h3>
          <p className="text-4xl font-semibold">
            <span className="text-gray-500">EGP</span>{homeData?.total_orders}
          </p>
        </div>
        <div className="flex flex-col items-center gap-5 lg:border-t-0 lg:border-l-4 border-[#1f1f1f] lg:pl-10 pt-5 lg:pt-0">
          <h3 className="text-4xl font-semibold">المبيعات</h3>
          <p className="text-4xl font-semibold">
            <span className="text-gray-500">EGP</span>{homeData?.total_orders}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        <AdminMonthlyRevenue
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
        <AdminSellerReports />
      </div>
    </>
  );
};

export default AdminHome;
