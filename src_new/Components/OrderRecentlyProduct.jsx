import React from "react";

const OrderRecentlyProduct = ({ product, price, customer, Date, status }) => {
  return (
    <tr className="mt-2">
      <td className="px-4 py-2 text-center">{product}</td>
      <td>
        <span className="px-2 text-center text-sm border border-green-700 rounded-full">
          {customer}
        </span>
      </td>
      <td className="px-4 py-2 text-center">{Date}</td>
      <td className="px-4 py-2 text-center">{price}</td>
      <td
        className={`px-4 py-2 text-center ${
          status === "Success"
            ? "text-green-600"
            : status === "pending"
            ? "text-yellow-300"
            : status === "Return"
            ? "text-red-600"
            : "text-green-200"
        }`}
      >
        {status}
      </td>
    </tr>
  );
};

export default OrderRecentlyProduct;
