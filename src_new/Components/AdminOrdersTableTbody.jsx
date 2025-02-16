import React, { useContext } from "react";
import { PiTimer } from "react-icons/pi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { OrderContextProvider } from "../Contexts/OrderContext";
import UpdateOrCreateOrder from "./Orders/UpdateOrCreateOrder";
import { useDisclosure } from "@chakra-ui/react";

const AdminOrdersTableTbody = ({ order, handleUpdateOrder }) => {
  const { deleteOrder } = useContext(OrderContextProvider);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [status, setStatus] = React.useState(order?.status);

  return (
    <>
      <div
        onClick={onOpen}
        className="flex flex-wrap md:flex-nowrap justify-between text-sm md:text-base lg:text-lg w-full cursor-pointer hover:bg-[#2f2f2f] p-2 rounded items-center"
      >
        {/* Delete Icon */}
        <p
          className="flex-1 flex items-start justify-start mr-5"
          onClick={() => {
            if (window.confirm("هل انت متاكد من حذف هذا الطلب؟")) {
              deleteOrder(order?.id);
            }
          }}
        >
          <span className="text-xl md:text-2xl text-red-500 cursor-pointer hover:scale-110 transition-transform">
            <MdOutlineDeleteSweep />
          </span>
        </p>

        {/* Order Status */}
        <select
          onChange={(e) => {
            handleUpdateOrder(e.target.value, tracking_code);
          }}
          value={status}
          className={`flex-1 p-1 px-3 bg-transparent bg-none border-none ${
            status == "delivered" ? "text-green-500" : ""
          } ${
            status == "cancelled"
              ? "text-red-500"
              : status == "shipped"
              ? "text-green-100"
              : status == "pending"
              ? "text-yellow-200"
              : ""
          }`}
        >
          <option value="" className="bg-[#1f1f1f] text-white">
            اختر الحالة
          </option>
          <option value="pending" className="bg-[#1f1f1f] text-white">
            في الانتظار
          </option>
          <option value="shipped" className="bg-[#1f1f1f] text-white">
            تم الشحن
          </option>
          <option value="delivered" className="bg-[#1f1f1f] text-white">
            تم التسليم
          </option>
          <option value="cancelled" className="bg-[#1f1f1f] text-white">
            ملغي
          </option>
        </select>

        {/* Shipping Type */}
        <p className="flex-1 flex items-center justify-center ml-10">
          {order.is_fast_shipping ? (
            <span className="text-green-600 flex items-center gap-2">
              <PiTimer />
              سريع
            </span>
          ) : (
            "عادي"
          )}
        </p>

        {/* Order Date */}
        <p className="flex-1 text-gray-400 text-center">
          {order.created_at.split("T")[0]}
        </p>

        {/* Customer Name */}
        <span className="flex-1 text-center border border-green-500 rounded-full px-2 md:px-4 py-1 md:py-2">
          {order.name}
        </span>
      </div>

      <UpdateOrCreateOrder
        orderFromProps={isOpen ? order : null}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default AdminOrdersTableTbody;
