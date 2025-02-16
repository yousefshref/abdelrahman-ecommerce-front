import React, { useContext, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import AdminHome from "./AdminHome";
import SellerHome from "./SellerHome";
import { AuthContextProvider } from "../../../Contexts/AuthContext";

const LayoutHome = () => {
  const { user } = useContext(AuthContextProvider);

  return (
    <AdminLayout>
      {user.is_shipping_employee | user.is_fast_shipping_employee ? (
        <SellerHome />
      ) : user.is_superuser ? (
        <AdminHome />
      ) : null}
    </AdminLayout>
  );
};

export default LayoutHome;
