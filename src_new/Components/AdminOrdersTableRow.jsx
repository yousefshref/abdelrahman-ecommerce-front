import React, { useEffect } from "react";
import AdminOrdersTableTbody from "./AdminOrdersTableTbody";
import { useDisclosure } from "@chakra-ui/react";
import { OrderContextProvider } from "../Contexts/OrderContext";
import { UsersContextProvider } from "../Contexts/UsersContext";
import { AuthContextProvider } from "../Contexts/AuthContext";

const AdminOrdersTableRow = ({ order, index }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const ordersContext = React.useContext(OrderContextProvider);
  const usersContext = React.useContext(UsersContextProvider);
  const authContext = React.useContext(AuthContextProvider);

  // get the user
  const user = authContext?.use;

  const [status, setStatus] = React.useState(order?.status);
  const [tracking_code, setTrackingCode] = React.useState(order?.tracking_code);
  useEffect(() => {
    setStatus(order?.status);
    setTrackingCode(order?.tracking_code);
  }, [order]);

  const handleUpdateOrder = (newStatus, newTrackingCode) => {
    let sendStatusChanged = false; // updated

    if (newStatus !== order?.status && newStatus == "shipped") {
      sendStatusChanged = true;
    } else {
      sendStatusChanged = false;
    }

    let sendArrivedEmail = false; // updated

    if (newStatus !== order?.status && newStatus == "delivered") {
      sendArrivedEmail = true;
    } else {
      sendArrivedEmail = false;
    }

    // if the tracking code was empty then wrote and the user is shipping employee add the filed sales_who_added be the user
    let addSalesWhoAdded = false;

    if (
      !order?.tracking_code &&
      newTrackingCode &&
      user?.is_shipping_employee
    ) {
      addSalesWhoAdded = true;
    }

    ordersContext
      ?.updateOrder(order?.id, {
        status: newStatus,
        tracking_code: newTrackingCode,
        sales_who_added: addSalesWhoAdded ? user?.id : order?.sales_who_added,
      })
      .then((e) => {
        if (e) {
          onClose();

          setStatus(e?.status);
          setTrackingCode(e?.tracking_code);

          // if (sendStatusChanged && e?.email) {
          //     usersContext?.sendEmail({
          //         recipient_email: e?.email,
          //         subject: "تم شحن طلبك",
          //         content_type: "html",
          //     }, "shipped")
          // }
          // if (sendArrivedEmail && e?.email) {
          //     usersContext?.sendEmail({
          //         recipient_email: e?.email,
          //         subject: "تم تسليم شحنتك",
          //         content_type: "html",
          //     }, "delivered")
          // }
        }
      });
  };

  const [total, setTotal] = React.useState(0);

  const calculateTotal = () => {
    let total = 0;
    order?.order_items?.forEach((item) => {
      total += item?.product_details?.offer_price
        ? item?.product_details?.offer_price * item.quantity
        : item?.product_details?.price * item.quantity;
    });
    total += Number(order?.state_details?.shipping_price);
    if (order?.is_fast_shipping) {
      total += Number(order?.state_details?.fast_shipping_price);
    }
    setTotal(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [order, order?.order_items]);
  return (
    <div className="mt-2 px-2">
      <AdminOrdersTableTbody
        order={order}
        handleUpdateOrder={handleUpdateOrder}
      />
    </div>
  );
};

export default AdminOrdersTableRow;
