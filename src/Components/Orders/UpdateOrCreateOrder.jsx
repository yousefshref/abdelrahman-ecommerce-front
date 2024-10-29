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
} from '@chakra-ui/react'
import { ProductsContextProvider } from '../../Contexts/ProductsContext'
import { CategoryContextProvider } from '../../Contexts/CategoryContext'
import { StatesContextProvider } from '../../Contexts/StatesContext'
import OrderItemTableRow from './OrderItemTableRow'
import { OrderContextProvider } from '../../Contexts/OrderContext'
import { AuthContextProvider } from '../../Contexts/AuthContext'


const UpdateOrCreateOrder = ({ isOpen, onClose, order }) => {
    const [name, setName] = useState('')
    const [phone_number, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')

    const [tracking_code, set_tracking_code] = useState("")
    const [status, setStatus] = useState("pending")
    const [sales_who_added, setSalesWhoAdded] = useState("")

    const [order_items, setOrderItems] = useState([])



    const productsContext = useContext(ProductsContextProvider)
    const statesContext = useContext(StatesContextProvider)
    const ordersContext = useContext(OrderContextProvider)
    const authContext = useContext(AuthContextProvider)

    const products = productsContext?.products
    const states = statesContext?.states
    const user = authContext?.user

    const [isClient, setIsClient] = useState(true)

    useEffect(() => {
        if (user?.is_superuser || user?.is_shipping_employee) setIsClient(false)
    }, [user])

    useEffect(() => {
        authContext?.getUser()
    }, [])

    useEffect(() => {
        productsContext?.fetchProducts()
    }, [])
    useEffect(() => {
        statesContext?.getStates()
    }, [])


    const [total, setTotal] = useState(0)
    useEffect(() => {
        setTotal(
            order_items?.reduce((acc, item) => {
                return acc + (products?.find((p) => p.id == item?.product)?.offer_price ? products?.find((p) => p.id == item?.product)?.offer_price * item.quantity : products?.find((p) => p.id == item?.product)?.price * item.quantity)
            }, 0)
            + Number(states?.find((s) => s.id == state)?.shipping_price)
        )
    }, [state, order_items])


    const handleCreateOrder = async () => {
        const data = {
            name,
            phone_number,
            state,
            address,
            email,
            tracking_code,
            status,
            sales_who_added,
            order_items
        }

        ordersContext?.createOrder({ data, nav: false }).then(e => {
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
            set_tracking_code(order?.tracking_code)
            setStatus(order?.status)
            setEmail(order?.email)
            setOrderItems(order?.order_items)
        }
    }, [order])


    const handleUpdateOrder = () => {
        const data = {
            name,
            phone_number,
            state,
            address,
            email,
            tracking_code,
            status,
            sales_who_added,
            order_items
        }

        ordersContext?.updateOrder(order?.id, data).then(e => {
            if (e) {
                onClose()
            }
        })
    }


    // check if the user is really the "sales_who_added"
    useEffect(() => {
        // check if the sales_who_added field is empty
        // if empty -----> add the current user
        // if not dont do anything

        if (!sales_who_added && order?.id && tracking_code) {
            setSalesWhoAdded(user?.id)
        }
    }, [user, order, tracking_code])



    return (
        <Modal size={"2xl"} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className='font'>
                <ModalHeader>
                    <Flex justifyContent={"space-between"}>
                        <p>انشاء طلب جديد</p>
                        <Button colorScheme='green' size={"sm"} onClick={order?.id ? handleUpdateOrder : handleCreateOrder} className='px-5'>انشاء</Button>
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
                        {!isClient && (
                            <FormControl>
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
                                    <option value={"processing"}>
                                        {"تم التجهيز"}
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
                        {!isClient && (
                            <FormControl>
                                <FormLabel className='font-bold'> كود تتبع الشحنة</FormLabel>
                                <Input
                                    value={tracking_code}
                                    onChange={(e) => set_tracking_code(e.target.value)}
                                    placeholder="كود تتبع الشحنة"
                                    size="lg"
                                    className="w-full mb-3"
                                />
                            </FormControl>
                        )}
                    </Box>


                    <div className='my-5 flex justify-between items-center'>
                        <p>المجموع الكلي: {total} EGP</p>
                        <p>سعر الشحن: {states?.find((s) => s.id == state)?.shipping_price} EGP</p>
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
