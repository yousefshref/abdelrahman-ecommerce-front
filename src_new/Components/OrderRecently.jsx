import React from "react";
import OrderRecentlyProduct from "./OrderRecentlyProduct";

const OrderRecently = () => {
  return (
    <div className="p-4 bg-[#1f1f1f] rounded-2xl w-full">
      <h3 className="text-3xl text-left m-4 font-light text-white">
        Order Recently
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center text-white">Product</th>
              <th className="px-4 py-2 text-center text-white">Customer</th>
              <th className="px-4 py-2 text-center text-white">Date</th>
              <th className="px-4 py-2 text-center text-white">Price</th>
              <th className="px-4 py-2 text-center text-white">Status</th>
            </tr>
          </thead>
          {/* Add horizontal line between <thead> and <tbody> */}
          <tr>
            <td colSpan="5">
              <hr className="border-t border-gray-300" />
            </td>
          </tr>
          <tbody className="text-center text-white">
            <OrderRecentlyProduct
              product="argivit focus"
              price="$500"
              customer="Claudia Alves"
              Date="2/5/2020"
              status="Success"
            />
            <OrderRecentlyProduct
              product="argivit focus"
              price="$500"
              customer="Cahaya Dewi"
              Date="2/4/2020"
              status="Return"
            />
            <OrderRecentlyProduct
              product="creatine"
              price="$500"
              customer="Olivia Wilson"
              Date="2/3/2020"
              status="Pending"
            />
            <OrderRecentlyProduct
              product="protin ovlov"
              price="$500"
              customer="Claudia Alves"
              Date="2/2/2020"
              status="Shipping"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderRecently;
