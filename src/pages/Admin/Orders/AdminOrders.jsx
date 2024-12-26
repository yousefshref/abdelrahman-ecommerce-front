import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Input, Button, Select, Box, Flex, useDisclosure, Spinner, StepStatus } from '@chakra-ui/react';

import { OrderContextProvider } from '../../../Contexts/OrderContext';
import OrderTableRow from '../../../Components/Orders/OrderTableRow';
import UpdateOrCreateOrder from '../../../Components/Orders/UpdateOrCreateOrder';
import { UsersContextProvider } from '../../../Contexts/UsersContext';
import { AuthContextProvider } from '../../../Contexts/AuthContext';

import Loading from '../../../Components/Loading/Loading';
import { Pagination } from 'antd';

const AdminOrders = () => {
    const ordersContext = React.useContext(OrderContextProvider)
    const authContext = useContext(AuthContextProvider)
    const usersContext = useContext(UsersContextProvider)

    const user = authContext?.user


    const { isOpen, onOpen, onClose } = useDisclosure()


    // get orders
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [sales_id, setSalesId] = useState("")
    const [page, setPage] = useState("")


    const total_pages = ordersContext?.total_pages
    const orders = ordersContext?.orders
    const totalCommission = ordersContext?.totalCommission
    const totalOrdersPrices = ordersContext?.totalOrdersPrices

    const handleGetOrders = async () => {
        const params = {
            search,
            sales_id,
            page
        }
        setLoading(true)
        await ordersContext?.getOrders(params)
        setLoading(false)
    }

    useEffect(() => {
        handleGetOrders()
    }, [sales_id, page])



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
                            onClick={!loading ? handleGetOrders : null}
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

            {sales_id ? null : (
                <div dir='ltr' className='mt-5 mb-1 flex justify-end'>
                    <Pagination
                        defaultCurrent={10}
                        total={total_pages}
                        current={page}
                        pageSize={1}
                        onChange={(page) => setPage(page)}
                    />
                </div>
            )}
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

            <UpdateOrCreateOrder isOpen={isOpen} onClose={onClose} />
        </AdminLayout>
    )
}

export default AdminOrders
