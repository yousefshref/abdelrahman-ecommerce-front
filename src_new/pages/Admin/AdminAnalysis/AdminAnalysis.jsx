import React from "react";
import AdminLayout from "../../../Layouts/AdminLayout";
import AdminAnalysisRightSide from "../../../Components/AdminAnalysisRightSide";
import AdminAnalysisLeftSide from "../../../Components/AdminAnalysisLeftSide";
import { Avatar } from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";

const AdminAnalysis = () => {
  return (
    <AdminLayout>
      <div className="md:p-5">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar
              src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              size={"sm"}
            />
            <span>
              <FaBell size={20} />
            </span>
          </div>
          <input
            className="w-1/4 rounded-full px-4 py-1 bg-[#2f2f2f] border-none text-white"
            placeholder="search...Report,sales,social source"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 w-[100%]">
          <div className="w-full">
            <AdminAnalysisRightSide />
          </div>
          <div className="w-full">
            <AdminAnalysisLeftSide />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAnalysis;
