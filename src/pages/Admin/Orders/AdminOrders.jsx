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
    const ordersContext = useContext(OrderContextProvider)
    const authContext = useContext(AuthContextProvider)
    const usersContext = useContext(UsersContextProvider)

    const user = authContext?.user


    const { isOpen, onOpen, onClose } = useDisclosure()


    const loading = ordersContext?.loading

    const orders = ordersContext?.orders


    const totalCommission = ordersContext?.totalCommission
    const totalOrdersPrices = ordersContext?.totalOrdersPrices

    const search = ordersContext?.search
    const setSearch = ordersContext?.setSearch

    const sales_id = ordersContext?.sales_id
    const setSalesId = ordersContext?.setSalesId

    const from = ordersContext?.from
    const setFrom = ordersContext?.setFrom

    const to = ordersContext?.to
    const setTo = ordersContext?.setTo

    const status = ordersContext?.status
    const setStatus = ordersContext?.setStatus


    // get all sales
    const salesUsers = usersContext?.salesUsers
    const getSalseUsers = () => {
        usersContext?.getSalesUsers()
    }
    useEffect(() => {
        getSalseUsers()
    }, [])



    const [newOrder, setNewOrder] = useState(false)

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
                            user?.is_shipping_employee || user?.is_fast_shipping_employee ? null : (
                                <Select
                                    // value={user?.is_superuser ? sales_id : user?.id}
                                    value={user?.is_superuser ? sales_id : ''}
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

                    <div className="flex md:flex-row flex-col item-center justify-center gap-4">
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-sm text-gray-500'>من</p>
                            <Input
                                type="date"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                placeholder="من"
                                sx={{
                                    backgroundColor: "white",
                                }}
                                size={"sm"}
                                className="w-full"
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-sm text-gray-500'>الى</p>
                            <Input
                                type="date"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                placeholder="الى"
                                sx={{
                                    backgroundColor: "white",
                                }}
                                size={"sm"}
                                className="w-full"
                            />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                            <p className='text-sm text-gray-500'>الحالة</p>
                            <Select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                placeholder="الحالة"
                                sx={{
                                    backgroundColor: "white",
                                }}
                                size={"sm"}
                                className="w-full"
                            >
                                <option value="">الكل</option>
                                <option value="pending">في الانتظار</option>
                                <option value="shipped">شحن</option>
                                <option value="delivered">تم التوصيل</option>
                                <option value="cancelled">ملغي</option>
                            </Select>
                        </div>
                    </div>

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
                            onClick={() => {
                                setNewOrder(true)
                                onOpen()
                            }}
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

            <UpdateOrCreateOrder newOrder={newOrder} isOpen={isOpen} onClose={onClose} />
        </AdminLayout>
    )
}

export default AdminOrders
