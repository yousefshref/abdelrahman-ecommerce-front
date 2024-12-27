import React, { createContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminOrders, orderConfirm, trackOrders } from '../Variables/pathes'
import { CartContextProvider } from './CartContext'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

const OrderContext = ({ children }) => {
    const cartContext = React.useContext(CartContextProvider)


    const navigate = useNavigate()

    const toast = useToast()


    const [loading, setLoading] = React.useState(false)


    const [orders, setOrders] = React.useState([])
    const [totalCommission, setTotalCommission] = React.useState(0)
    const [totalOrdersPrices, setTotalOrdersPrices] = React.useState(0)

    const [from, setFrom] = React.useState("")
    const [to, setTo] = React.useState("")

    const [sales_id, setSalesId] = React.useState("")
    const [search, setSearch] = React.useState("")

    const getOrders = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/orders/?sales_id=${sales_id}&search=${search}`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })

            console.log(res.data);

            setOrders(res.data.orders)
            setTotalCommission(res.data?.total_commission)
            setTotalOrdersPrices(res.data?.total_orders_prices)
        }
        catch (err) {
            // 500
            if (err.response.status === 500) {
                // alert(err.response.data)
                toast({
                    title: err.response.data,
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                });
            }

            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    const location = useLocation()
    useEffect(() => {
        if (location.pathname === adminOrders()) {
            getOrders()
        }
    }, [from, to, sales_id, location])



    const createOrder = async ({ data, nav = true }) => {
        setLoading(true)
        try {
            const res = await axios.post('orders/create/', data, {
                headers: {
                    ...(localStorage.getItem('token') ? { Authorization: `Token ${localStorage.getItem('token')}` } : {})
                }
            })
            // 201
            if (res.status === 201) {
                cartContext.setCart([])
                setOrders([...orders, res.data])
                if (!nav) {

                } else {
                    navigate(orderConfirm())
                    // if (orderConfirm) {
                    //     navigate(trackOrders() + "?confirm=true")
                    // } else {
                    //     navigate(trackOrders())
                    // }
                }
                toast({
                    title: "تم طلب منتجاتك بنجاح",
                    // description: "Your item has been successfully added to the cart.",
                    status: "success",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                })
                // localStorage.removeItem('cart')                
                return res.data
            } else {
                console.log(res);
            }
        }
        catch (err) {
            // 400
            if (err.response.status === 400) {
                // alert(err.response.data)
                toast({
                    title: err.response.data,
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                });
            }
            // 500
            if (err.response.status === 500) {
                // alert(err.response.data)
                toast({
                    title: err.response.data,
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                });
            }

            console.log(err);
        } finally {
            setLoading(true)
        }
    }


    const updateOrder = async (id, data) => {
        setLoading(true)
        try {
            const res = await axios.put(`/orders/update/${id}/`, data, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            const newOrders = orders.map((order) => {
                if (order.id === id) {
                    return res.data
                } else {
                    return order
                }
            })
            setOrders(newOrders)

            return res.data
        }
        catch (err) {
            // 400
            if (err.response.status === 400) {
                // alert("تأكد من صحة البيانات")
                toast({
                    title: "تأكد من صحة البيانات",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                });
            }
            // 500
            if (err.response.status === 500) {
                // alert("حدث خطأ ما")
                toast({
                    title: "حدث خطأ ما",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                });
            }

        } finally {
            setLoading(true)
        }
    }


    const deleteOrder = async (id) => {
        setLoading(true)
        try {
            const res = await axios.delete(`/orders/delete/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            const newOrders = orders.filter((order) => order.id !== id)
            setOrders(newOrders)
            return res.data
        }
        catch (err) {
            // 400
            if (err.response.status === 400) {
                // alert("تأكد من صحة البيانات")
                toast({
                    title: "تأكد من صحة البيانات",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                });
            }
            // 500
            if (err.response.status === 500) {
                // alert("حدث خطأ ما")
                toast({
                    title: "حدث خطأ ما",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                });
            }

            console.log(err);
        } finally {
            setLoading(true)
        }
    }



    const [order, setOrder] = React.useState({})

    const getOrder = async (id) => {
        try {
            const res = await axios.get(`/orders/${id}/`)
            setOrder(res.data)
        } catch (err) {
            console.log(err)
        }
    }


    const handleCancelOrder = async (params = {}) => {
        try {
            const res = await axios.get(`/orders/cancel/`, {
                params,
            })
            toast({
                title: "Order Canceled",
                description: res?.data?.message,
                status: "success",
                duration: 3000, // 3 seconds
                isClosable: true,
                position: "bottom-left",
                variant: "subtle", // Optional: You can use subtle for a softer effect
            })
            navigate(trackOrders())
        } catch (err) {
            console.log(err)
            if (err.response.status === 400) {
                toast({
                    title: "Something went wrong",
                    description: err?.response?.data?.message,
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                })
            }
        }
    }
    return (
        <OrderContextProvider.Provider value={{
            loading,
            createOrder,

            orders,
            getOrders,
            order,
            totalCommission,
            totalOrdersPrices,
            from, setFrom,
            to, setTo,
            sales_id, setSalesId,
            search, setSearch,

            getOrder,
            updateOrder,
            deleteOrder,
            handleCancelOrder
        }}>
            {children}
        </OrderContextProvider.Provider>
    )
}


export default OrderContext

export const OrderContextProvider = createContext()
