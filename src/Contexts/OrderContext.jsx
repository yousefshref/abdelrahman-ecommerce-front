import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { trackOrders } from '../Variables/pathes'
import { CartContextProvider } from './CartContext'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

const OrderContext = ({ children }) => {
    const cartContext = React.useContext(CartContextProvider)


    const navigate = useNavigate()

    const toast = useToast()


    const [loading, setLoading] = React.useState(false)


    const [orders, setOrders] = React.useState([])

    const getOrders = async (params = {}) => {
        setLoading(true)
        try {
            const res = await axios.get('/orders/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                params
            })

            setOrders(res.data)
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
            setLoading(true)
        }
    }



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
                    navigate(trackOrders())
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
