import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { createContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clientUrl } from "../Variables/server";
import {
  adminDashboard,
  adminOrders,
  adminProducts,
  adminSettings,
  adminUsers,
  trackOrders,
} from "../Variables/pathes";

const UsersContext = ({ children }) => {
  const location = useLocation();

  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getUsers = async () => {
    try {
      setLoading(true);
      if (localStorage.getItem("token")) {
        const res = await axios.get("/users/", {
          headers: {
            ...(localStorage.getItem("token")
              ? { Authorization: `Token ${localStorage.getItem("token")}` }
              : {}),
          },
        });
        setUsers(res.data);
        return res.data;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // user.is_superuser -> admin
  // user.is_shipping_employee -> shipping employee
  // user.is_fast_shipping_employee -> fastshipping employee

  const allowedLocationsForUsers = [adminUsers()];
  useEffect(() => {
    if (allowedLocationsForUsers.includes(location.pathname)) {
      getUsers();
    }
  }, [location]);

  const [user, setUser] = React.useState({});

  const getUser = async (id) => {
    if (id) {
      const res = await axios.get(`/users/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      console.log(location.pathname);
      setUser(res.data);
      return res.data;
    }
  };

  const allowedLocations = [
    adminDashboard(),
    adminProducts(),
    adminOrders(),
    adminSettings(),
    adminUsers(),
  ];
  useEffect(() => {
    if (allowedLocations.includes(location.pathname)) {
      getUser();
    }
  }, [location.pathname]);

  const updateUser = async (id, data) => {
    try {
      const res = await axios.put(`/users/${id}/update/`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      const newUsers = users.map((user) => {
        if (user.id === id) {
          return res.data;
        } else {
          return user;
        }
      });
      setUsers(newUsers);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const [salesUsers, setSalesUsers] = React.useState([]);

  const getSalesUsers = async () => {
    const res = await axios.get("/users/sales/", {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });

    setSalesUsers(res.data);
  };

  const updateUserPassword = async (id, data) => {
    try {
      const res = await axios.put(`/users/${id}/update-password/`, data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const taost = useToast();

  const sendReportToSales = async (data, onClose) => {
    try {
      const res = await axios.post("/users/sales/send-report/", data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      taost({
        title: "تم ارسال التقرير بنجاح",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      if (onClose) {
        onClose();
      }
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const sendEmail = async (data, message) => {
    if (message == "shipped") {
      data.message = `
                <h2>تم تغيير حالة الطلب وسيتم توصيلة قريبا</h2>
                <p style="margin-top: 15px">
                    تم شحن طلبك, ترقب مكالمة المندوب في اي وقت قريب
                </p>
                <p style="margin-top: 10px">
                    يمكنك تتبع الطلب من خلال هذا الكود ${data?.tracking_code
        }, من خلال <a href=${clientUrl + trackOrders()
        }>هذه الصفحة</a>
                </p>
            `;
    }

    if (message == "delivered") {
      data.message = `
            <h2>تم تسليم شحنتك</h2>
            <p style="margin-top: 15px">
                تم تسليم الشحنة للمندوب وترقب وصولها اليوم من الساعة 9 صباحا حتى الساعة 9 مساءً
            </p>
            <p style="margin-top: 10px">
                يمكنك تتبع الطلب من خلال هذا الكود ${data?.tracking_code
        }, من خلال <a href=${clientUrl + trackOrders()}>هذه الصفحة</a>
            </p>
        `;
    }
    try {
      const res = await axios.post("/email/send/", data);
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const deleteUser = async (id) => {
    try {
      const res = await axios.delete(`/users/${id}/delete/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      getUsers();
      taost({
        title: "تم حذف المستخدم بنجاح",
        status: "success",
        duration: 3000,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <UsersContextProvider.Provider
      value={{
        loading,
        users,
        getUsers,

        updateUser,

        salesUsers,
        getSalesUsers,
        updateUserPassword,

        sendReportToSales,

        user,
        getUser,

        sendEmail,

        deleteUser,
      }}
    >
      {children}
    </UsersContextProvider.Provider>
  );
};

export default UsersContext;
export const UsersContextProvider = createContext();
