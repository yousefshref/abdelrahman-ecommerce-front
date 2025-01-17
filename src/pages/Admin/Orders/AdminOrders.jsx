import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Input, Button, Select, Box, Flex, useDisclosure, Spinner, StepStatus } from '@chakra-ui/react';

import { OrderContextProvider } from '../../../Contexts/OrderContext';
import OrderTableRow from '../../../Components/Orders/OrderTableRow';
import UpdateOrCreateOrder from '../../../Components/Orders/UpdateOrCreateOrder';
import { UsersContextProvider } from '../../../Contexts/UsersContext';
import { AuthContextProvider } from '../../../Contexts/AuthContext';

import Loading from '../../../Components/Loading/Loading';

const AdminOrders = () => {
    const ordersContext = React.useContext(OrderContextProvider)
    const authContext = useContext(AuthContextProvider)
    const usersContext = useContext(UsersContextProvider)

    const user = authContext?.user


    const { isOpen, onOpen, onClose } = useDisclosure()

    const {
        getOrders,
        setPageSize,
        count,
        currentPage,
        pageSize,
        handlePagination,
    } = useContext(OrderContextProvider);



    const loading = ordersContext?.loading

    const orders = ordersContext?.orders


    const totalCommission = ordersContext?.totalCommission
    const totalOrdersPrices = ordersContext?.totalOrdersPrices

    const search = ordersContext?.search
    const setSearch = ordersContext?.setSearch

    const sales_id = ordersContext?.sales_id
    const setSalesId = ordersContext?.setSalesId



    // get all sales
    const salesUsers = usersContext?.salesUsers
    const getSalseUsers = () => {
        usersContext?.getSalesUsers()
    }
    useEffect(() => {
        getSalseUsers()
    }, [])



    return (
        <AdminLayout>
            {loading ? (
                <Loading />
            ) : null}
            {/* Search Section */}
            <Box>
                <Flex gap={4} className='flex flex-col'>
                    <Flex gap='3'>
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
                        {
                            user?.is_shipping_employee ? null : (
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
                            )
                        }
                    </Flex>

                    <Flex justifyContent={"space-between"}>
                        <Button
                            onClick={!loading ? ordersContext?.getOrders : null}
                            colorScheme="purple"
                            size={"sm"}
                            className='w-full max-w-[80px]'
                            isLoading={loading}
                        >
                            بحث
                        </Button>
                        <Button
                            colorScheme="green"
                            size={"sm"}
                            onClick={onOpen}
                        >
                            انشاء طلب جديد
                        </Button>
                    </Flex>
                </Flex>
            </Box>

            <hr className='my-5' />

            {/* total orders price */}
            <Box className='mt-3'>
                <Flex justifyContent={"space-between"} gap={4}>
                    <strong>اجمالي المبيعات: {totalOrdersPrices} EGP</strong>
                    {user?.is_superuser ? (
                        <strong>الكوميشين: {parseInt(totalCommission)} EGP</strong>
                    ) : null}
                </Flex>
            </Box>

            {/* table */}
            <div className="w-full max-w-full overflow-x-auto">
                {loading ? (
                    <div className='p-5 flex flex-col justify-center items-center bg-gray-200 w-full h-[200px]'>
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
                                <th className="border p-2 text-nowrap text-start w-[80px]">التاريخ</th>
                                <th className="border p-2 text-nowrap text-start w-[100px]">اسم</th>
                                <th className="border p-2 text-nowrap text-start w-[70px]">نوع الشحن</th>
                                <th className="border p-2 text-nowrap text-start w-[130px]">الحالة</th>
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
                <div className='flex gap-7 items-center'>
                    <button
                        className='p-1 px-3 bg-red-200 rounded-full flex flex-col justify-center items-center'
                        onClick={() => {
                            handlePagination(currentPage - 1)
                        }}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {Math.ceil(count / pageSize)}
                    </span>
                    <button
                        className='p-1 px-3 bg-green-200 rounded-full flex flex-col justify-center items-center'
                        onClick={() => {
                            handlePagination(currentPage + 1)
                        }}
                    >
                        Next
                    </button>
                </div>
                <div className='flex flex-col md:w-fit w-full'>
                    <p>كم تريد ان تعرض</p>
                    <select onChange={(e) => setPageSize(e.target.value)} value={pageSize} name="" id="">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                        <option value="70">70</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>

            <UpdateOrCreateOrder isOpen={isOpen} onClose={onClose} />
        </AdminLayout>
    )
}

export default AdminOrders
