import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Input, Button, Select, Box, Flex, useDisclosure, Spinner } from '@chakra-ui/react';

import { OrderContextProvider } from '../../../Contexts/OrderContext';
import OrderTableRow from '../../../Components/Orders/OrderTableRow';
import UpdateOrCreateOrder from '../../../Components/Orders/UpdateOrCreateOrder';
import { UsersContextProvider } from '../../../Contexts/UsersContext';
import { AuthContextProvider } from '../../../Contexts/AuthContext';

const AdminOrders = () => {
    const ordersContext = React.useContext(OrderContextProvider)

    const authContext = useContext(AuthContextProvider)

    const user = authContext?.user


    // search terms
    const [sales_id, setSalesId] = React.useState('')
    const [search, setSearch] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [from, setFrom] = React.useState('')
    const [to, setTo] = React.useState('')

    const orders = ordersContext?.orders

    const [loading, setLoading] = useState(true)

    const handleGetOrders = async () => {
        setLoading(true)
        const params = {
            sales_id: user?.is_shipping_employee ? user?.id : sales_id,
            search,
            status,
            from,
            to
        }

        await ordersContext?.getOrders(params)

        setLoading(false)
    }

    useEffect(() => {
        handleGetOrders()
    }, [user?.is_shipping_employee])


    const usersContext = useContext(UsersContextProvider)

    const salesUsers = usersContext?.salesUsers

    useEffect(() => {
        if (!user?.is_shipping_employee) {
            usersContext?.getSalesUsers()
        }
    }, [user?.is_shipping_employee])


    const { isOpen, onOpen, onClose } = useDisclosure()



    const [totalOrders, setTotalOrders] = useState(0)

    const handleCalculateTotalOrders = () => {
        // Calculate the total price for all orders
        let totalPrice = 0;
        orders.forEach(order => {
            order?.order_items.forEach(item => {
                totalPrice += Number(item.product_details.offer_price ? item.product_details.offer_price * item.quantity : item.product_details.price * item.quantity) + Number(order.state_details.shipping_price);
            });
        });

        // Update the totalOrdersPrice state
        setTotalOrders(totalPrice);
    }

    useEffect(() => {
        handleCalculateTotalOrders();
    }, [orders]);



    // calculate the commission
    const [commission, setCommission] = useState(0)
    const calculateCommission = () => {
        // the commission is 5% from the total price
        const commission = totalOrders * 0.05;
        setCommission(commission);
    }
    useEffect(() => {
        calculateCommission();
    }, [totalOrders]);

    return (
        <AdminLayout>
            {/* Search Section */}
            <Box className="mb-10">
                <Flex gap={4} className='flex flex-col'>
                    <Flex gap='3'>
                        <Input
                            placeholder="بحث بالاسم, ID, او رقم الهاتف"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            sx={{
                                backgroundColor: "white",
                            }}
                            size={"md"}
                            className="w-full"
                        />
                        {
                            user?.is_shipping_employee ? null : (
                                <Select
                                    value={sales_id}
                                    onChange={(e) => setSalesId(e.target.value)}
                                    placeholder="سيلز معين"
                                    sx={{
                                        backgroundColor: "white",
                                    }}
                                    size={"md"}
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
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="حالة الطلب"
                        sx={{
                            backgroundColor: "white",
                        }}
                        size={"md"}
                        className="w-full font"
                    >
                        <option value="pending">في الانتظار</option>
                        <option value="processing">في المعالجة</option>
                        <option value="shipped">تم الشحن</option>
                        <option value="delivered">تم التوصيل</option>
                        <option value="cancelled">تم الغاء</option>
                    </Select>
                    <Flex gap={2} className='w-full'>
                        <Input
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            placeholder="من تاريخ"
                            sx={{
                                backgroundColor: "white",
                            }}
                            size={"md"}
                            type='date'
                            className="w-full"
                        />
                        <Input
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            placeholder="الي تاريخ"
                            sx={{
                                backgroundColor: "white",
                            }}
                            size={"md"}
                            type='date'
                            className="w-full"
                        />
                    </Flex>
                    <Button
                        onClick={!loading ? handleGetOrders : null}
                        colorScheme="purple"
                        size={"md"}
                        className='w-fit'
                        isLoading={loading}
                    >
                        بحث
                    </Button>
                </Flex>
            </Box>

            {/* Actions Section */}
            <Box>
                <Button
                    colorScheme="teal"
                    size={"md"}
                    onClick={onOpen}
                >
                    انشاء طلب جديد
                </Button>
            </Box>

            {/* total orders price */}
            <Box className='mt-10'>
                <Flex justifyContent={"space-between"} gap={4}>
                    <strong>اجمالي المبيعات: {totalOrders} EGP</strong>
                    <strong>الكوميشين: {commission} EGP</strong>
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
                    <table className="mt-3 w-full min-w-[800px] bg-white table-fixed">
                        <thead>
                            <tr>
                                <th className="border p-2 text-nowrap text-start w-[50px]">#</th>
                                <th className="border p-2 text-nowrap text-start w-[150px]">كود تتبع الشحن</th>
                                <th className="border p-2 text-nowrap text-start w-[100px]">المستخدم</th>
                                <th className="border p-2 text-nowrap text-start w-[150px]">اسم</th>
                                <th className="border p-2 text-nowrap text-start w-[100px]">رقم الهاتف</th>
                                <th className="border p-2 text-nowrap text-start w-[100px]">المحافظة</th>
                                <th className="border p-2 text-nowrap text-start w-[200px]">العنوان</th>
                                <th className="border p-2 text-nowrap text-start w-[100px]">الحالة</th>
                                <th className="border p-2 text-nowrap text-start w-[150px]">الاجمالي</th>
                                <th className="border p-2 text-nowrap text-start w-[60px]"></th>
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
