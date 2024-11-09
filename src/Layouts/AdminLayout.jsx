import React, { useContext, useEffect, useState } from 'react'
import { Box, VStack, Text } from '@chakra-ui/react';
import { FiHome, FiUser, FiSettings, FiLogOut, FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { adminDashboard, adminOrders, adminProducts, adminUsers } from '../Variables/pathes';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { AuthContextProvider } from '../Contexts/AuthContext';
import { UsersContextProvider } from '../Contexts/UsersContext';


const AdminLayout = ({ children }) => {
    const usersContext = useContext(UsersContextProvider)
    const authContext = useContext(AuthContextProvider)

    const user = authContext?.user

    useEffect(() => {
        authContext?.getUser()
    }, [])


    const [is_shipping_employee, setIs_shipping_employee] = React.useState(user?.is_shipping_employee)

    useEffect(() => {
        setIs_shipping_employee(user?.is_shipping_employee)
    }, [user])

    const [profile_picture, setProfile_picture] = React.useState(user?.profile_picture)

    useEffect(() => {
        setProfile_picture(user?.profile_picture)
    }, [user])




    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


    return (
        <div className="flex min-h-screen bg-gray-100/70">
            {/* Sidebar */}
            <Box
                as="aside"
                className={`fixed md:static h-screen ${isSidebarOpen ? 'w-[250px]' : 'w-16'} md:w-[250px] transition-all duration-300 bg-gray-900 text-white p-4 z-20`}
                boxShadow="xl"
            >
                <VStack className='justify-between flex flex-col h-full' spacing={4} align="stretch">
                    <Text fontSize="2xl" fontWeight="bold" mb={4} className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
                        لوحة التحكم
                    </Text>
                    <ul className='my-auto'>
                        {is_shipping_employee ? (
                            null
                        ) : (
                            <>
                                <li>
                                    <Link to={adminDashboard()} className={`
                                flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2
                                ${window.location.pathname === adminDashboard() ? "bg-gray-700" : "bg-transparent"}
                                `}
                                    >
                                        <FiHome size={20} />
                                        <p className={`text-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>الرئيسية</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={adminUsers()} className={`
                                flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2
                                ${window.location.pathname === adminUsers() ? "bg-gray-700" : "bg-transparent"}
                                `}
                                    >
                                        <FiUser size={20} />
                                        <p className={`text-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>المستخدمين</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={adminProducts()} className={`
                                flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2
                                ${window.location.pathname === adminProducts() ? "bg-gray-700" : "bg-transparent"}
                                `}
                                    >
                                        <IoCartOutline size={20} />
                                        <p className={`text-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>المنتجات</p>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to={adminOrders()} className={`
                                flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2
                                ${window.location.pathname === adminOrders() ? "bg-gray-700" : "bg-transparent"}
                                `}
                            >
                                <BiPurchaseTagAlt size={20} />
                                <p className={`text-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>الطلبات</p>
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link className={`flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2`}>
                                <FiSettings size={20} />
                                <p className={`text-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>الاعدادات</p>
                            </Link>
                        </li>
                        <li onClick={() => authContext?.logout()}>
                            <Link className={`flex gap-2 items-center transition-all hover:bg-gray-800 rounded-md p-2`}>
                                <FiLogOut size={20} />
                                <p className={`text-lg ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>تسجيل الخروج</p>
                            </Link>
                        </li>
                    </ul>
                </VStack>
            </Box>

            {/* Burger Icon for Mobile */}
            <button
                className="md:hidden fixed top-4 right-4 z-30 p-2 bg-gray-800 text-white rounded-md"
                onClick={toggleSidebar}
            >
                <FiMenu size={24} />
            </button>

            {/* Main Content */}
            <div className={`flex-1 md:p-4 p-2 transition-all duration-300 ${isSidebarOpen ? 'ms-[250px]' : 'ms-16'} md:ms-0 max-h-screen overflow-y-scroll`}>
                <div className='flex gap-10 justify-between items-center'>
                    <div className='flex gap-2 items-center'>
                        <img
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
                                        usersContext?.updateUser(user?.id, { profile_picture: reader.result });
                                    };
                                };
                            }}
                            className='md:w-20 w-14 md:h-20 h-14 rounded-full cursor-pointer'
                            src={profile_picture ? profile_picture : "https://via.placeholder.com/100"}
                            alt=""
                        />
                        <div className='flex flex-col'>
                            <strong>{user?.username}</strong>
                            <p className='text-gray-500'>{user?.email}</p>
                        </div>
                    </div>

                    <ul className='flex gap-4 items-center'>
                        <li>
                            <Link className='flex gap-0.5 items-center text-lime-700 p-2 bg-lime-200/60'>
                                <IoIosNotificationsOutline size={30} />
                                <p className='text-xl'>5</p>
                            </Link>
                        </li>
                    </ul>
                </div>
                <hr className='my-5' />
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
