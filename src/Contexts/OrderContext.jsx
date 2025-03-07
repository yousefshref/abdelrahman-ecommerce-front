import React, { createContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminOrders, cancelOrder, orderConfirm, trackOrders, userProfile, userProfileOrdersCancelled, userProfileOrdersDeliverd } from '../Variables/pathes'
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

    const today = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    const [sales_id, setSalesId] = React.useState("")
    const [search, setSearch] = React.useState("")
    const [from, setFrom] = React.useState(last7Days.toISOString().split('T')[0])
    const [to, setTo] = React.useState(today.toISOString().split('T')[0])
    const [status, setStatus] = React.useState("")


    const getOrders = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/orders/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                params: {
                    sales_id: sales_id,
                    search: search,
                    date_from: from,
                    date_to: to,
                    status: status
                }
            })

            console.log(from, to);

            setOrders(res?.data?.orders)

            setTotalCommission(res.data?.total_commission)
            setTotalOrdersPrices(res.data?.total_orders_prices)
        }
        catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    const location = useLocation()
    const allowedPathes = [adminOrders()]
    useEffect(() => {
        if (allowedPathes.includes(location.pathname)) {
            getOrders()
        }
    }, [from, to, status, sales_id, location.pathname])



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
            setLoading(false)
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
            console.log(err);
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
            setLoading(false)
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
            setLoading(false)
        }
    }



    const [order, setOrder] = React.useState({})
    const [orderItems, setOrderItems] = React.useState([])
    const [totalPrice, setTotalPrice] = React.useState(0)
    const [shippingPrice, setShippingPrice] = React.useState(0)
    const [fastShipping, setFastShipping] = React.useState(0)

    const [orderId, setOrderId] = React.useState(null)
    const getOrder = async () => {
        try {
            const res = await axios.get(`/orders/${orderId}/`)
            setOrder(res.data.order)
            setOrderItems(res.data.order_items)
            setTotalPrice(res.data.total_price)
            setShippingPrice(res.data.shipping_price)
            setFastShipping(res.data.fast_shipping)
        } catch (err) {
            console.log(err)
        }
    }

    const allowedPathesForOrder = [cancelOrder(), adminOrders()]
    useEffect(() => {
        if (orderId && allowedPathesForOrder.includes(location.pathname)) {
            getOrder(orderId)
        }
    }, [orderId, location.pathname])


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
            alert("حدث خطأ ما")
            if (err.response.data.message) {
                alert(err.response.data.message)
            }
            if (err.response.data.error) {
                alert(err.response.data.error)
            }
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


    const [loadingLatestOrders, setLoadingLatestOrders] = React.useState(false)
    const [latestOrders, setLatestOrders] = React.useState([])
    const getLatestOrders = async () => {
        try {
            setLoadingLatestOrders(true)
            const res = await axios.get('/orders/latest/', {
                headers: {
                    ...(localStorage.getItem('token') ? { Authorization: `Token ${localStorage.getItem('token')}` } : {})
                }
            })
            setLatestOrders(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingLatestOrders(false)
        }
    }
    const allowedLatestOrders = [userProfile()]
    useEffect(() => {
        if (allowedLatestOrders.includes(location.pathname)) {
            getLatestOrders()
        }
    }, [location.pathname])



    const [loadingDeliverdOrders, setLoadingDeliverdOrders] = React.useState(false)
    const [deliverdOrders, setDeliverdOrders] = React.useState([])
    const getDeliverdOrders = async () => {
        try {
            setLoadingDeliverdOrders(true)
            const res = await axios.get('/orders/deliverd/', {
                headers: {
                    ...(localStorage.getItem('token') ? { Authorization: `Token ${localStorage.getItem('token')}` } : {})
                }
            })
            setDeliverdOrders(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingDeliverdOrders(false)
        }
    }
    const allowedDeliverdOrders = [userProfileOrdersDeliverd()]
    useEffect(() => {
        if (allowedDeliverdOrders.includes(location.pathname)) {
            getDeliverdOrders()
        }
    }, [location.pathname])



    const [cancelledOrders, setCancelledOrders] = React.useState([])
    const [loadingCancelledOrders, setLoadingCancelledOrders] = React.useState(false)

    const getCancelledOrders = async () => {
        try {
            setLoadingCancelledOrders(true)
            const res = await axios.get('/orders/cancelled/', {
                headers: {
                    ...(localStorage.getItem('token') ? { Authorization: `Token ${localStorage.getItem('token')}` } : {})
                }
            })
            setCancelledOrders(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingCancelledOrders(false)
        }
    }

    const allowedCancelledOrders = [userProfileOrdersCancelled()]
    useEffect(() => {
        if (allowedCancelledOrders.includes(location.pathname)) {
            getCancelledOrders()
        }
    }, [location.pathname])

    return (
        <OrderContextProvider.Provider value={{
            cancelledOrders, loadingCancelledOrders,

            loadingDeliverdOrders, deliverdOrders,

            loadingLatestOrders,
            latestOrders,

            loading,
            createOrder,

            orders, setOrders,
            getOrders,


            order,
            orderItems, setOrderItems,
            totalPrice,
            shippingPrice,
            fastShipping,
            totalCommission,
            totalOrdersPrices,
            from, setFrom,
            to, setTo,
            status, setStatus,
            sales_id, setSalesId,
            search, setSearch,

            getOrder, setOrderId, orderId,
            updateOrder,
            setOrder,
            deleteOrder,
            handleCancelOrder
        }}>
            {children}
        </OrderContextProvider.Provider>
    )
}


export default OrderContext

export const OrderContextProvider = createContext()
