import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Input, Button, Select, Box, Flex, useDisclosure, Spinner } from '@chakra-ui/react';

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


    // get orders
    const [loading, setLoading] = useState(true)

    const [search, setSearch] = useState("")
    const [sales_id, setSalesId] = useState("")

    const orders = ordersContext?.orders
    const handleGetOrders = async () => {
        const params = {
            search,
            sales_id
        }
        setLoading(true)
        await ordersContext?.getOrders(params)
        setLoading(false)
    }

    useEffect(() => {
        handleGetOrders()
    }, [sales_id])



    // get all sales
    const salesUsers = usersContext?.salesUsers
    const getSalseUsers = () => {
        usersContext?.getSalesUsers()
    }
    useEffect(() => {
        getSalseUsers()
    }, [])



    // calculate total orders
    const calculateTotalOrders = (filterdOrders = []) => {
        let total = 0
        if (filterdOrders?.length) {
            filterdOrders.forEach(order => {
                total += order?.total
            })
        } else {
            orders.forEach(order => {
                total += order?.total
            })
        }
        return total
    }




    // calculate commission
    const [commission, setCommission] = useState(0)

    // if the user is the admin add no commission
    // if sales add the commission to total orders
    const calculateCommission = () => {
        if (user?.is_superuser) {
            // get the selected user
            const salesUser = salesUsers?.find(user => user?.id == sales_id)
            // get the commission of it
            const user_commission = salesUser?.commission
            // return the total
            setCommission(calculateTotalOrders() * (user_commission / 100))
        } else {
            setCommission(calculateTotalOrders(orders?.filter(order => order?.sales_who_added == user?.id)) * (user?.commission / 100))

            console.log(orders?.filter(order => order?.sales_who_added == user?.id)) * (user?.commission / 100);
        }
    }

    useEffect(() => {
        calculateCommission()
    }, [orders?.length, user, sales_id])

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
                    {/* {user?.is_shipping_employee ? (
                        <div className='flex items-center gap-3'>
                            <input type="checkbox" checked={see_your_orders} onChange={(e) => setSeeYourOrders(e.target.checked)} />
                            <p>عرض الطلبات الخاصة بك</p>
                        </div>
                    ) : (
                        null
                    )}
                    <Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="حالة الطلب"
                        sx={{
                            backgroundColor: "white",
                        }}
                        size={"sm"}
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
                            size={"sm"}
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
                            size={"sm"}
                            type='date'
                            className="w-full"
                        />
                    </Flex> */}
                    <Button
                        onClick={!loading ? handleGetOrders : null}
                        colorScheme="purple"
                        size={"sm"}
                        className='w-full max-w-[80px]'
                        isLoading={loading}
                    >
                        بحث
                    </Button>
                </Flex>
            </Box>


            <hr className='bg-black h-[1px] my-5' />

            {/* Actions Section */}
            <Box>
                <Button
                    colorScheme="green"
                    size={"sm"}
                    onClick={onOpen}
                >
                    انشاء طلب جديد
                </Button>
            </Box>

            {/* total orders price */}
            <Box className='mt-3'>
                <Flex justifyContent={"space-between"} gap={4}>
                    <strong>اجمالي المبيعات: {calculateTotalOrders()} EGP</strong>
                    <strong>الكوميشين: {parseInt(commission)} EGP</strong>
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
                                <th className="border p-2 text-nowrap text-start w-[50px] bg-green-300">#</th>
                                <th className="border p-2 text-nowrap text-start w-[150px]">كود تتبع الشحن</th>
                                <th className="border p-2 text-nowrap text-start w-[100px]">المستخدم</th>
                                <th className="border p-2 text-nowrap text-start w-[150px]">اسم</th>
                                <th className="border p-2 text-nowrap text-start w-[100px]">رقم الهاتف</th>
                                <th className="border p-2 text-nowrap text-start w-[100px]">المحافظة</th>
                                <th className="border p-2 text-nowrap text-start w-[200px]">العنوان</th>
                                <th className="border p-2 text-nowrap text-start w-[150px]">طريقة الدفع</th>
                                <th className="border p-2 text-nowrap text-start w-[150px]">هل شحن سريع</th>
                                <th className="border p-2 text-nowrap text-start w-[200px]">الحالة</th>
                                <th className="border p-2 text-nowrap text-start w-[200px]">كود التتبع</th>
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
