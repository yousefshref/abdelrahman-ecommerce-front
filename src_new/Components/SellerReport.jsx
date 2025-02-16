import React, { useContext } from "react";
import { FaShare } from "react-icons/fa";
import { TbMailOpenedFilled } from "react-icons/tb";
import { UsersContextProvider } from "../Contexts/UsersContext";



const SellerReport = ({ employee }) => {
  const { sendReportToSales } = useContext(UsersContextProvider)

  const [date_from, setDateFrom] = React.useState("")
  const [date_to, setDateTo] = React.useState("")


  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2 items-center">
        <span className="text-4xl cursor-pointer text-gray-200">
          <FaShare />
        </span>
        <span
          className="text-4xl cursor-pointer text-green-600"
          onClick={() => {
            const now = new Date();
            const dateFrom = prompt("Enter date from (YYYY-MM-DD)", `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(-2)}-01`);
            const dateTo = prompt("Enter date to (YYYY-MM-DD)", `${now.getFullYear()}-${("0" + (now.getMonth() + 1)).slice(-2)}-${("0" + now.getDate()).slice(-2)}`);

            setDateFrom(dateFrom)
            setDateTo(dateTo)

            const data = {
              user_id: employee?.id, date_from: dateFrom, date_to: dateTo,
            }

            sendReportToSales(data, null)
          }}
        >
          <TbMailOpenedFilled />
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <h3 className="lg:text-4xl md:text-2xl text-2xl font-semibold text-white">
          {employee?.first_name} {employee?.last_name}
        </h3>
        <img className="rounded-full w-[50px] h-[50px]" src="https://i.pinimg.com/736x/01/fd/c7/01fdc74c5f086d2d6a1f329320d0edfb.jpg" />
      </div>
    </div>
  );
};

export default SellerReport;
