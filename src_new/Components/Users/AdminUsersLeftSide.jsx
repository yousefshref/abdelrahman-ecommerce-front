import { Avatar } from "@chakra-ui/react";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";

const AdminUsersLeftSide = ({ users }) => {
  console.log(users);

  return (
    <div>
      <h3 className="flex justify-between p-5 rounded-2xl text-2xl font-semibold text-white w-8/12 items-center m-auto border border-lime-700 bg-[#2f2f2f]">
        <FaPlus className="text-3xl text-green-500 bg-white rounded p-1 cursor-pointer" />{" "}
        جميع البائعين
      </h3>
      <div className="flex flex-col gap-5 p-5">
        {users?.map((user) => (
          <div className="bg-[#0f0f0f] p-5 rounded-xl flex justify-between items-center cursor-pointer">
            <div className="flex gap-5 items-center">
              <Avatar size={"md"} src={user?.profile_picture} />
              <div className="flex flex-col gap-2 items-start">
                <h3 className="text-2xl font-light text-white">
                  {user?.username}
                </h3>
                {user?.is_active === true ? (
                  <div className="flex gap-2 items-center">
                    نشط
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    غير نشط
                    <p className="w-2 h-2 bg-red-500 rounded-full"></p>
                  </div>
                )}
              </div>
            </div>
            <p className="flex flex-col justify-center text-center text-gray-300 text-lg">
              اخر عمولة
              <span className="text-2xl font-light text-white">43,00</span>
            </p>
            <span className="text-2xl cursor-pointer text-white">
              <CiMenuKebab />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersLeftSide;
