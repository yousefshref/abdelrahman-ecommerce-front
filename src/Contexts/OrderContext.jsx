import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { trackOrders } from '../Variables/pathes'
import { CartContextProvider } from './CartContext'
import axios from 'axios'

const OrderContext = ({ children }) => {
    const cartContext = React.useContext(CartContextProvider)


    const navigate = useNavigate()


    const [loading, setLoading] = React.useState(false)


    const [orders, setOrders] = React.useState([])

    const getOrders = async (params) => {
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
                alert(err.response.data)
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
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            // 201
            if (res.status === 201) {
                localStorage.removeItem('cart')
                cartContext.setCart([])
                setOrders([...orders, res.data])
                if (!nav) {

                } else {
                    navigate(trackOrders())
                }
                return res.data
            } else {
                console.log(res);
            }
        }
        catch (err) {
            // 400
            if (err.response.status === 400) {
                alert(err.response.data)
            }
            // 500
            if (err.response.status === 500) {
                alert(err.response.data)
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
                alert("تأكد من صحة البيانات")
            }
            // 500
            if (err.response.status === 500) {
                alert("حدث خطأ ما")
            }

            console.log(err);
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
                alert("تأكد من صحة البيانات")
            }
            // 500
            if (err.response.status === 500) {
                alert("حدث خطأ ما")
            }

            console.log(err);
        } finally {
            setLoading(true)
        }
    }
    return (
        <OrderContextProvider.Provider value={{
            loading,
            createOrder,

            orders,
            getOrders,

            updateOrder,

            deleteOrder
        }}>
            {children}
        </OrderContextProvider.Provider>
    )
}


export default OrderContext

export const OrderContextProvider = createContext()
