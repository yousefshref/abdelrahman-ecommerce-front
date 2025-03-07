import React, { useContext, useEffect, useState } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Flex,
    Input,
    Textarea,
    Select,
    Box,
    Button,
    FormControl,
    FormLabel,
    Switch,
} from '@chakra-ui/react'
import { ProductsContextProvider } from '../../Contexts/ProductsContext'
import { StatesContextProvider } from '../../Contexts/StatesContext'
import OrderItemTableRow from './OrderItemTableRow'
import { OrderContextProvider } from '../../Contexts/OrderContext'
import { AuthContextProvider } from '../../Contexts/AuthContext'
import SelectWithImage from '../SelectWithImage/SelectWithImage'


const UpdateOrCreateOrder = ({ isOpen, onClose, orderFromProps, newOrder }) => {

    const orderIdFromProps = orderFromProps?.id
    const ordersContext = useContext(OrderContextProvider)

    const setOrderId = ordersContext?.setOrderId

    const orders = ordersContext?.orders
    const setOrders = ordersContext?.setOrders

    const order = ordersContext?.order
    const setOrder = ordersContext?.setOrder

    const order_items = ordersContext?.orderItems
    const setOrderItems = ordersContext?.setOrderItems
    const totalPrice = ordersContext?.totalPrice
    const shippingPrice = ordersContext?.shippingPrice
    const fastShipping = ordersContext?.fastShipping

    useEffect(() => {
        if (orderIdFromProps) {
            setOrderId(orderIdFromProps)
        }
    }, [orderIdFromProps, isOpen])

    const [name, setName] = useState('')
    const [phone_number, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [tracking_code, set_tracking_code] = useState("")
    const [status, setStatus] = useState("pending")
    const [sales_who_added, setSalesWhoAdded] = useState("")
    const [payment_method, setPaymentMethod] = useState("");
    const [is_fast_shipping, setIsFastShipping] = useState(false)



    const productsContext = useContext(ProductsContextProvider)
    const statesContext = useContext(StatesContextProvider)
    const authContext = useContext(AuthContextProvider)

    const products = productsContext?.products
    const states = statesContext?.states
    const getStates = statesContext?.getStates
    const user = authContext?.user
    const loading = ordersContext?.loading

    useEffect(() => {
        getStates()
    }, [])

    const [isClient, setIsClient] = useState(true)

    useEffect(() => {
        if (user?.is_shipping_employee || user?.is_superuser) setIsClient(false)
    }, [user])




    useEffect(() => {
        if (newOrder) {
            setName('')
            setPhone('')
            setEmail('')
            setState('')
            setAddress('')
            set_tracking_code("")
            setStatus("pending")
            setSalesWhoAdded("")
            setPaymentMethod("")
            setIsFastShipping(false)
            setOrderItems([])
        }
    }, [newOrder, isOpen])


    const handleCreateOrder = async () => {
        const data = {
            name,
            phone_number,
            state,
            address,
            email,
            payment_method,
            tracking_code,
            status,
            sales_who_added,
            is_fast_shipping,
            order_items,
        }

        await ordersContext?.createOrder({ data, nav: false }).then(e => {
            if (e) {
                onClose()
            }
        })
    }


    useEffect(() => {
        if (order) {
            setName(order?.name)
            setPhone(order?.phone_number)
            setState(order?.state)
            setAddress(order?.address)
            setPaymentMethod(order?.payment_method)
            set_tracking_code(order?.tracking_code)
            setSalesWhoAdded(order?.sales_who_added)
            setStatus(order?.status)
            setEmail(order?.email)
            setIsFastShipping(order?.is_fast_shipping)
        }
    }, [order])



    const handleUpdateOrder = async () => {
        try {
            let sendStatusChanged = false   // updated

            if (status !== order?.status && status == "shipped") {
                sendStatusChanged = true
            } else {
                sendStatusChanged = false
            }


            let sendArrivedEmail = false   // updated

            if (status !== order?.status && status == "delivered") {
                sendArrivedEmail = true
            } else {
                sendArrivedEmail = false
            }

            const data = {
                name,
                phone_number,
                state,
                address,
                email,
                payment_method,
                tracking_code,
                status,
                sales_who_added,
                is_fast_shipping,
                order_items,
            }

            if (user?.is_fast_shipping_employee && !order?.sales_who_added && status !== order?.status) {
                data.sales_who_added = user?.id
            }

            await ordersContext?.updateOrder(order?.id, data).then(e => {
                if (e) {
                    onClose()
                    setName(e?.name)
                    setPhone(e?.phone_number)
                    setEmail(e?.email)
                    setState(e?.state)
                    setAddress(e?.address)
                    set_tracking_code(e?.tracking_code)
                    setStatus(e?.status)
                    setSalesWhoAdded(e?.sales_who_added)
                    setPaymentMethod(e?.payment_method)
                    setIsFastShipping(e?.is_fast_shipping)
                }
            })
        } catch (err) {
            console.log(err)
        } finally {
        }
    }


    // check if the user is really the "sales_who_added"
    useEffect(() => {
        if (order?.id && user?.is_shipping_employee && !order?.tracking_code && !order?.sales_who_added) {
            setSalesWhoAdded(user?.id)
        }
    }, [user?.is_shipping_employee, order]);

    useEffect(() => {
        if (order?.id && user?.is_fast_shipping_employee && !order?.sales_who_added && status !== order?.status) {
            console.log(order?.status);
            console.log(status);
            setSalesWhoAdded(user?.id)
        }
    }, [user?.is_fast_shipping_employee, order]);



    return (
        <Modal size={"2xl"} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className='font'>
                <ModalHeader>
                    <Flex justifyContent={"space-between"}>
                        <p>
                            {
                                order?.id ? (
                                    <div className='flex flex-col'>
                                        <p>تعديل الطلب</p>
                                        <small className='text-sm text-gray-500 -mt-0.5'>{order?.created_at?.split("T")[0]}</small>
                                    </div>
                                ) : "انشاء طلب جديد"
                            }
                        </p>
                        <Button isLoading={loading} isDisabled={loading} colorScheme='green' size={"sm"} onClick={order?.id ? handleUpdateOrder : handleCreateOrder} className='px-5'>
                            {order?.id ? "تــــم" : "انشاء"}
                        </Button>
                    </Flex>
                </ModalHeader>
                <ModalBody className='h-full max-h-[500px] overflow-y-scroll'>
                    <Box>
                        <Flex gap={2} className='mb-3'>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="الاسم..."
                                size="sm"
                                className="w-full"
                            />
                            <Input
                                value={phone_number}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="رقم الهاتف"
                                size="sm"
                                className="w-full"
                            />
                        </Flex>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="الايميل"
                            size="sm"
                            className="w-full mb-3"
                        />
                        <Select
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            size={"sm"}
                            placeholder="المحافظة"
                            className='mb-3'
                        >
                            {states?.map((state) => (
                                <option
                                    key={state.id}
                                    value={state.id}
                                >
                                    {state.name}
                                </option>
                            ))}
                        </Select>
                        <Textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="العنوان بالتفصيل..."
                            size="sm"
                            className="w-full mb-10"
                        />
                        <SelectWithImage payment_method={payment_method} setPaymentMethod={setPaymentMethod} />
                        {(user?.is_superuser || user?.is_shipping_employee || user?.is_fast_shipping_employee) && (
                            <FormControl className='mt-5'>
                                <FormLabel className='font-bold'>الحالة</FormLabel>
                                <Select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    size={"lg"}
                                    placeholder="الحالة"
                                    className='mb-3'
                                >
                                    <option value={"pending"}>
                                        {"قيد الانتظار"}
                                    </option>
                                    <option value={"shipped"}>
                                        {"تم الشحن"}
                                    </option>
                                    <option value={"delivered"}>
                                        {"تم التسليم"}
                                    </option>
                                    <option value={"cancelled"}>
                                        {"تم الالغاء"}
                                    </option>
                                </Select>
                            </FormControl>
                        )}
                        {(user?.is_superuser || user?.is_shipping_employee) && (
                            <FormControl>
                                <FormLabel className='font-bold'>كود تتبع الشحنة</FormLabel>
                                <Input
                                    value={tracking_code}
                                    onChange={(e) => set_tracking_code(e.target.value)}
                                    placeholder="كود تتبع الشحنة"
                                    size="lg"
                                    className="w-full mb-3"
                                />
                            </FormControl>
                        )}
                        {!isClient && (
                            <div className='flex gap-2 items-center p-2 bg-gray-200 rounded-md'>
                                <Switch
                                    isChecked={is_fast_shipping}
                                    onChange={(e) => setIsFastShipping(e.target.checked)}
                                />
                                <p>شحن سريع</p>
                            </div>
                        )}
                    </Box>


                    <div className='my-5 flex md:flex-row flex-col justify-between items-center'>
                        <p>المجموع الكلي: {totalPrice} EGP</p>
                        <p>سعر الشحن: {shippingPrice} EGP</p>
                        {
                            order?.is_fast_shipping ? (
                                <p>سعر الشحن السريع: {fastShipping} EGP</p>
                            ) : null
                        }
                    </div>

                    <Box className='rounded-md'>
                        <table className="w-full">
                            <thead>
                                <tr className="text-right bg-lime-200 border-b">
                                    <th className="px-2 py-2">المنتج</th>
                                    <th className="px-2 py-2">الكمية</th>
                                    <th className="px-2 py-2">السعر</th>
                                    <th className="px-2 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {order_items?.length > 0 ? order_items?.map((item, index) => (
                                    <OrderItemTableRow index={index} products={products} key={index} item={item} order_items={order_items} setOrderItems={setOrderItems} />
                                )) : <tr className="border border-yellow-500 text-yellow-500 bg-yellow-100">
                                    <td className="px-2 py-2">
                                    </td>
                                    <td className="px-2 py-2">
                                        لا يوجد منتجات
                                    </td>
                                    <td className="px-2 py-2">
                                    </td>
                                </tr>}
                                <tr className="border-b">
                                    <td className="px-2 py-2 bg-white">
                                        <Button
                                            onClick={() => {
                                                setOrderItems([
                                                    ...order_items,
                                                    {
                                                        product: "",
                                                        quantity: "",
                                                    },
                                                ]);
                                            }}
                                            colorScheme="green"
                                            size="sm"
                                        >
                                            اضافة منتج
                                        </Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>

                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default UpdateOrCreateOrder
