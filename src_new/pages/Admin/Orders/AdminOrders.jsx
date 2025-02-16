import React, { useContext, useEffect, useState } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import {
  Input,
  Button,
  Select,
  Box,
  Flex,
  useDisclosure,
  Spinner,
  StepStatus,
  Avatar,
} from "@chakra-ui/react";
import { TiExport } from "react-icons/ti";

import { OrderContextProvider } from "../../../Contexts/OrderContext";
import OrderTableRow from "../../../Components/Orders/OrderTableRow";
import UpdateOrCreateOrder from "../../../Components/Orders/UpdateOrCreateOrder";
import { UsersContextProvider } from "../../../Contexts/UsersContext";
import { AuthContextProvider } from "../../../Contexts/AuthContext";

import Loading from "../../../Components/Loading/Loading";
import { FaFilter, FaMicrophone, FaPlus, FaSearch } from "react-icons/fa";
import AdminOrdersTable from "../../../Components/AdminOrdersTableRow";
import AdminOrdersTableRow from "../../../Components/AdminOrdersTableRow";

const AdminOrders = () => {
  const ordersContext = React.useContext(OrderContextProvider);
  const authContext = useContext(AuthContextProvider);
  const usersContext = useContext(UsersContextProvider);

  const user = authContext?.user;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { setPageSize, count, currentPage, pageSize, handlePagination } =
    useContext(OrderContextProvider);

  const loading = ordersContext?.loading;

  const orders = ordersContext?.orders;

  const totalCommission = ordersContext?.totalCommission;
  const totalOrdersPrices = ordersContext?.totalOrdersPrices;

  const search = ordersContext?.search;
  const setSearch = ordersContext?.setSearch;

  const sales_id = ordersContext?.sales_id;
  const setSalesId = ordersContext?.setSalesId;

  // get all sales
  const salesUsers = usersContext?.salesUsers;
  const getSalseUsers = () => {
    usersContext?.getSalesUsers();
  };
  useEffect(() => {
    getSalseUsers();
  }, []);

  return (
    <AdminLayout>
      {loading ? <Loading /> : null}
      <div className="p-5 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          <div className="relative w-full lg:w-1/3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full border border-gray-500 bg-transparent w-full pr-10"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  ordersContext?.getOrders();
                }
              }}
            />
            <FaSearch className="absolute text-gray-500 top-1/2 left-3 transform -translate-y-1/2 mt-2" />
            <FaMicrophone className="absolute text-gray-500 top-1/2 right-3 transform -translate-y-1/2 mt-2" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center mt-10 gap-5">
          <div className="flex flex-wrap gap-5 items-center">
            <Button
              colorScheme="green"
              className="flex gap-2 items-center"
              onClick={onOpen}
            >
              Add New Product
              <FaPlus />
            </Button>
            <p className="flex gap-2 items-center bg-black text-white px-2 py-1 rounded-full">
              Export
              <span>
                <TiExport />
              </span>
            </p>
            <p className="flex gap-2 items-center bg-black text-white px-2 py-1 rounded-full">
              Filter
              <span>
                <FaFilter />
              </span>
            </p>
            <p className="flex gap-2 items-center">
              <span className="font-bold bg-green-700 text-sm px-3 rounded-full">
                10
              </span>
              Showing
            </p>
          </div>
          <h3 className="text-3xl lg:text-5xl font-bold text-center lg:text-left">
            Orders
          </h3>
        </div>
        <div className="w-full mt-10 bg-[#1f1f1f] rounded-2xl">
          <div className="flex justify-between p-5">
            <p className="md:text-2xl">Delete</p>
            <p className="md:text-2xl">Status</p>
            <p className="md:text-2xl">Ship Type</p>
            <p className="md:text-2xl">Date</p>
            <p>
              <span className="rounded-full bg-green-700 py-1 md:px-8 px-2 md:text-xl">
                Customers
              </span>
            </p>
          </div>
          <hr />
          <div
            className="flex flex-col gap-5 overflow-y-auto max-h-[65vh] scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-thin"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#4A5568 #1A202C",
            }}
          >
            {orders?.map((order, index) => (
              <AdminOrdersTableRow
                order={order}
                key={index}
                onOpen={onOpen}
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      </div>
      {/* <Box>
        <Flex gap={4} className="flex flex-col">
          <Flex gap="3">
            <Input
              placeholder="بحث بالاسم, ID, او رقم الهاتف"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                backgroundColor: "white",
              }}
              size={"sm"}
              className="w-full"
            />
            {user?.is_shipping_employee ||
            user?.is_fast_shipping_employee ? null : (
              <Select
                value={user?.is_superuser ? sales_id : user?.id}
                onChange={(e) => setSalesId(e.target.value)}
                placeholder="سيلز معين"
                sx={{
                  backgroundColor: "white",
                }}
                size={"sm"}
                className="w-full font"
              >
                {salesUsers?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} {user.last_name} - @{user.username}
                  </option>
                ))}
              </Select>
            )}
          </Flex>

          <Flex justifyContent={"space-between"}>
            <Button
              onClick={!loading ? ordersContext?.getOrders : null}
              colorScheme="purple"
              size={"sm"}
              className="w-full max-w-[80px]"
              isLoading={loading}
            >
              بحث
            </Button>
            <Button colorScheme="green" size={"sm"} onClick={onOpen}>
              انشاء طلب جديد
            </Button>
          </Flex>
        </Flex>
      </Box>

      <hr className="my-5" />

      <Box className="mt-3">
        <Flex justifyContent={"space-between"} gap={4}>
          <strong>اجمالي المبيعات: {totalOrdersPrices} EGP</strong>
          {user?.is_superuser ? (
            <strong>الكوميشين: {parseInt(totalCommission)} EGP</strong>
          ) : null}
        </Flex>
      </Box>

      <div className="w-full max-w-full overflow-x-auto">
        {loading ? (
          <div className="p-5 flex flex-col justify-center items-center bg-gray-200 w-full h-[200px]">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        ) : (
          <table className="mt-3 w-full bg-white table-fixed">
            <thead>
              <tr>
                <th className="border p-2 text-nowrap text-start w-[80px]">
                  التاريخ
                </th>
                <th className="border p-2 text-nowrap text-start w-[100px]">
                  اسم
                </th>
                <th className="border p-2 text-nowrap text-start w-[70px]">
                  نوع الشحن
                </th>
                <th className="border p-2 text-nowrap text-start w-[130px]">
                  الحالة
                </th>
                <th className="border p-2 text-nowrap text-start w-[50px]"></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order, index) => (
                <OrderTableRow index={index} key={index} order={order} />
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="pagination mt-5 flex md:flex-row flex-col gap-7 items-center mx-auto">
        <div className="flex gap-7 items-center">
          <button
            className="p-1 px-3 bg-red-200 rounded-full flex flex-col justify-center items-center"
            onClick={() => {
              handlePagination(currentPage - 1);
            }}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {Math.ceil(count / pageSize)}
          </span>
          <button
            className="p-1 px-3 bg-green-200 rounded-full flex flex-col justify-center items-center"
            onClick={() => {
              handlePagination(currentPage + 1);
            }}
          >
            Next
          </button>
        </div>
        <div className="flex flex-col md:w-fit w-full">
          <p>كم تريد ان تعرض</p>
          <select
            onChange={(e) => setPageSize(e.target.value)}
            value={pageSize}
            name=""
            id=""
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="70">70</option>
            <option value="100">100</option>
          </select>
        </div>
      </div> */}

      <UpdateOrCreateOrder isOpen={isOpen} onClose={onClose} />
    </AdminLayout>
  );
};

export default AdminOrders;
