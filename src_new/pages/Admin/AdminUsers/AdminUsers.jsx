import React, { useContext, useEffect } from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import { UsersContextProvider } from "../../../Contexts/UsersContext";
import UserTableRow from "../../../Components/Users/UserTableRow";
import { Avatar, Box, Button, Flex, Input } from "@chakra-ui/react";

import Loading from "../../../Components/Loading/Loading";
import { FaBell } from "react-icons/fa";
import AdminUsersRightSide from "../../../Components/Users/AdminUsersRightSide";
import AdminUsersLeftSide from "../../../Components/Users/AdminUsersLeftSide";

const AdminUsers = () => {
  const usersContext = useContext(UsersContextProvider);

  const users = usersContext?.users;

  const usersLoading = usersContext?.loading;

  if (usersLoading) {
    return <Loading />;
  }
  return (
    <AdminLayout>
      <div className="lg:p-5">
        <div className="flex gap-2 items-center">
          <Avatar
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            size={"sm"}
          />
          <span>
            <FaBell />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-1/4 rounded-full px-4 py-1 bg-[#2f2f2f] border-none text-white"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
          <AdminUsersRightSide />
          <AdminUsersLeftSide users={users} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
