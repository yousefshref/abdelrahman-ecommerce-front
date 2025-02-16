import React, { useEffect } from "react";
import { PiNotepad } from "react-icons/pi";
import SellerReport from "./SellerReport";
import axios from "axios";
import { server } from "../Variables/pathes";

const AdminSellerReports = () => {
  const [employees, setEmployees] = React.useState([]);

  const getEmplyees = async () => {
    const response = await axios.get(`${server}get_fast_shipping_and_shipping_employees/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    })
    setEmployees(response.data)
  };

  useEffect(() => {
    getEmplyees()
  }, [])
  return (
    <div className="bg-green-800/50 rounded-2xl p-5">
      <p className="text-4xl font-semibold text-center mt-2 flex items-center gap-2 justify-center">
        تقرير البائع
        <span className="p-2 border-2 border-[#1f1f1f] rounded-full">
          <PiNotepad className="text-[#1f1f1f]" />
        </span>
      </p>
      <hr className="border-2 border-[#1f1f1f] mt-5" />
      <div className="flex flex-col gap-5 justify-center m-auto items-center mt-10">
        {employees?.map((employee, index) => (
          <SellerReport key={index} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default AdminSellerReports;
