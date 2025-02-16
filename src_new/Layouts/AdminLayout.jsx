import React, { useContext, useEffect, useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { FiUser, FiSettings, FiLogOut, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { BiPurchaseTagAlt } from "react-icons/bi";
import {
  adminAnalysis,
  adminHome,
  adminOrders,
  adminProducts,
  adminSettings,
  adminSettingsAddition,
  adminUsers,
  Stock,
} from "../Variables/pathes";
import { AuthContextProvider } from "../Contexts/AuthContext";
import { UsersContextProvider } from "../Contexts/UsersContext";
import { FaHome } from "react-icons/fa";

import { SiSimpleanalytics } from "react-icons/si";

const AdminLayout = ({ children }) => {
  const usersContext = useContext(UsersContextProvider);
  const authContext = useContext(AuthContextProvider);

  const user = authContext?.user;

  const [is_shipping_employee, setIs_shipping_employee] = React.useState(
    user?.is_shipping_employee
  );
  const [is_fast_shipping_employee, set_is_fast_shipping_employee] =
    React.useState(user?.is_fast_shipping_employee);

  useEffect(() => {
    setIs_shipping_employee(user?.is_shipping_employee);
    set_is_fast_shipping_employee(user?.is_fast_shipping_employee);
  }, [user]);

  const [profile_picture, setProfile_picture] = React.useState(
    user?.profile_picture
  );

  useEffect(() => {
    setProfile_picture(user?.profile_picture);
  }, [user]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-black/90 text-white">
      {/* Sidebar */}
      <Box
        as="aside"
        className={`fixed md:static h-screen ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 
                md:w-fit w-[250px] transition-transform duration-300 bg-black/30 text-white p-4 z-20`}
        boxShadow="xl"
      >
        {/* Sidebar Content */}
        <VStack
          className="justify-between flex flex-col h-full"
          spacing={4}
          align="stretch"
        >
          <img src="/logo.png" className="w-14" />
          <ul className="my-auto flex flex-col gap-5">
            {is_shipping_employee || is_fast_shipping_employee ? null : (
              <>
                <li>
                  <Link
                    to={adminHome()}
                    className={`flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2
                            ${
                              window.location.pathname === adminHome()
                                ? "text-green-500"
                                : "bg-transparent"
                            }`}
                  >
                    <FaHome size={30} />
                  </Link>
                </li>
                <li>
                  <Link
                    to={adminUsers()}
                    className={`flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2
                            ${
                              window.location.pathname === adminUsers()
                                ? "text-green-500"
                                : "bg-transparent"
                            }`}
                  >
                    <FiUser size={30} />
                  </Link>
                </li>
                <li>
                  <Link
                    to={adminProducts()}
                    className={`flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2
                            ${
                              window.location.pathname === adminProducts()
                                ? "text-green-500"
                                : "bg-transparent"
                            }`}
                  >
                    <IoCartOutline size={30} />
                  </Link>
                  <div
                    className={`flex flex-col gap2 text-center ${
                      window.location.pathname === adminProducts() ||
                      window.location.pathname === Stock()
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    <Link
                      to={Stock()}
                      className="text-lg flex gap-2 items-center"
                    >
                      <div
                        className={`${
                          window.location.pathname === Stock()
                            ? "bg-green-500"
                            : "bg-gray-100"
                        }  w-2 h-1`}
                      ></div>
                      المخزون
                    </Link>
                  </div>
                </li>
              </>
            )}
            <li>
              <Link
                to={adminOrders()}
                className={`flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2
                    ${
                      window.location.pathname === adminOrders()
                        ? "text-green-500"
                        : "bg-transparent"
                    }`}
              >
                <BiPurchaseTagAlt size={30} />
              </Link>
            </li>
            <li>
              <Link
                to={adminAnalysis()}
                className={`flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2
                    ${
                      window.location.pathname === adminAnalysis()
                        ? "text-green-500"
                        : "bg-transparent"
                    }`}
              >
                <SiSimpleanalytics size={30} />
              </Link>
            </li>
          </ul>
          <ul className="md:mb-0 mb-30">
            <li>
              <Link
                to={adminSettings()}
                className={`flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2
                            ${
                              window.location.pathname === adminSettings()
                                ? "text-green-500"
                                : "bg-transparent"
                            }`}
              >
                <FiSettings size={30} />
              </Link>
              <div
                className={`flex flex-col gap2 text-center ${
                  window.location.pathname === adminSettings() ||
                  window.location.pathname === adminSettingsAddition()
                    ? "block"
                    : "hidden"
                }`}
              >
                <Link
                  to={adminSettingsAddition()}
                  className="text-lg flex gap-2 items-center"
                >
                  <div
                    className={`${
                      window.location.pathname === adminSettingsAddition()
                        ? "bg-green-500"
                        : "bg-gray-100"
                    }  w-2 h-1`}
                  ></div>
                  اضافي
                </Link>
              </div>
            </li>
            <li onClick={() => authContext?.logout()}>
              <Link
                className={`flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2`}
              >
                <FiLogOut size={30} />
              </Link>
            </li>
          </ul>
        </VStack>
      </Box>

      {/* Burger Icon for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 text-white rounded-md"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      {/* Main Content */}
      <div
        className={`flex-1 md:p-4 p-2 transition-all duration-300 ${
          isSidebarOpen ? "ms-[250px]" : ""
        } md:ms-0 max-h-screen overflow-y-scroll`}
      >
        {window.location.pathname == adminHome() ||
          (window.location.pathname == adminOrders() ||
          window.location.pathname == adminProducts() ||
          window.location.pathname == Stock() ||
          window.location.pathname == adminUsers() ||
          window.location.pathname == adminAnalysis() ||
          window.location.pathname == adminSettings() ||
          window.location.pathname == adminSettingsAddition() ? null : (
            <>
              <div className="flex gap-10 justify-between items-center">
                <div className="flex gap-2 items-center">
                  <img
                    loading="lazy"
                    onClick={(e) => {
                      e.preventDefault();
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.click();

                      input.onchange = () => {
                        const file = input.files[0];
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                          setProfile_picture(reader.result);
                          usersContext?.updateUser(user?.id, {
                            profile_picture: reader.result,
                          });
                        };
                      };
                    }}
                    className="md:w-20 w-14 md:h-20 h-14 rounded-full cursor-pointer"
                    src={profile_picture}
                    alt=""
                  />
                  <div className="flex flex-col">
                    <strong>{user?.username}</strong>
                    <p className="text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
              <hr className="my-5" />
            </>
          ))}

        {/* <ul className='flex gap-4 items-center'>
                        <li>
                            <Link className='flex gap-0.5 items-center text-lime-700 p-2 bg-lime-200/60'>
                                <IoIosNotificationsOutline size={30} />
                                <p className='text-xl'>5</p>
                            </Link>
                        </li>
                    </ul> */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
