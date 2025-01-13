import { Button, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import UpdateOrCreateOrder from './UpdateOrCreateOrder'
import { OrderContextProvider } from '../../Contexts/OrderContext'


import { LiaShippingFastSolid } from 'react-icons/lia'
import { UsersContextProvider } from '../../Contexts/UsersContext'
import { AuthContextProvider } from '../../Contexts/AuthContext'


const OrderTableRow = ({ order, index }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const ordersContext = React.useContext(OrderContextProvider)
    const usersContext = React.useContext(UsersContextProvider)
    const authContext = React.useContext(AuthContextProvider)


    // get the user
    const user = authContext?.user



    const [status, setStatus] = React.useState(order?.status)
    const [tracking_code, setTrackingCode] = React.useState(order?.tracking_code)
    useEffect(() => {
        setStatus(order?.status)
        setTrackingCode(order?.tracking_code)
    }, [order])


    const handleUpdateOrder = (newStatus, newTrackingCode) => {
        let sendStatusChanged = false   // updated

        if (newStatus !== order?.status && newStatus == "shipped") {
            sendStatusChanged = true
        } else {
            sendStatusChanged = false
        }


        let sendArrivedEmail = false   // updated

        if (newStatus !== order?.status && newStatus == "delivered") {
            sendArrivedEmail = true
        } else {
            sendArrivedEmail = false
        }

        // if the tracking code was empty then wrote and the user is shipping employee add the filed sales_who_added be the user
        let addSalesWhoAdded = false

        if (!order?.tracking_code && newTrackingCode && user?.is_shipping_employee) {
            addSalesWhoAdded = true
        }



        ordersContext?.updateOrder(order?.id, { status: newStatus, tracking_code: newTrackingCode, sales_who_added: addSalesWhoAdded ? user?.id : order?.sales_who_added }).then(e => {
            if (e) {
                onClose()

                setStatus(e?.status)
                setTrackingCode(e?.tracking_code)

                // if (sendStatusChanged && e?.email) {
                //     usersContext?.sendEmail({
                //         recipient_email: e?.email,
                //         subject: "تم شحن طلبك",
                //         content_type: "html",
                //     }, "shipped")
                // }
                // if (sendArrivedEmail && e?.email) {
                //     usersContext?.sendEmail({
                //         recipient_email: e?.email,
                //         subject: "تم تسليم شحنتك",
                //         content_type: "html",
                //     }, "delivered")
                // }
            }
        })
    }


    const [total, setTotal] = React.useState(0)

    const calculateTotal = () => {
        let total = 0
        order?.order_items?.forEach(item => {
            total += item?.product_details?.offer_price ? item?.product_details?.offer_price * item.quantity : item?.product_details?.price * item.quantity
        })
        total += Number(order?.state_details?.shipping_price)
        if (order?.is_fast_shipping) {
            total += Number(order?.state_details?.fast_shipping_price)
        }
        setTotal(total)
    }

    useEffect(() => {
        calculateTotal()
    }, [order, order?.order_items])
    return (
        <>
            <tr>
                <td className="border p-2 text-nowrap text-start">
                    {order?.created_at?.split('T')[0]}
                </td>
                <td onClick={onOpen} className="border p-2 text-start bg-green-200/50 hover:bg-green-200 cursor-pointer">{order.name}</td>
                <td className="border p-2 text-wrap text-start">{
                    order.is_fast_shipping
                        ?
                        <div className='text-green-600 flex gap-2 items-center'>
                            <LiaShippingFastSolid />
                            <span>توصيل سريع</span>
                        </div>
                        :
                        <p>توصيل عادي</p>
                }</td>
                <td className="border p-2 text-start">
                    <select onChange={(e) => {
                        handleUpdateOrder(e.target.value, tracking_code)
                    }} value={status} className={`p-1 w-full px-3 border ${status == 'delivered' ? "border-green-500" : ""} ${status == 'cancelled' ? "border-red-500" : ""}`}>
                        <option value="">اختر الحالة</option>
                        <option value="pending">في الانتظار</option>
                        <option value="shipped">تم الشحن</option>
                        <option value="delivered">تم التسليم</option>
                        <option value="cancelled">ملغي</option>
                    </select>
                </td>
                <td className="border p-2 text-nowrap text-start">
                    <Button
                        colorScheme="red"
                        size="sm"
                        className="flex-shrink-0 w-full"
                        onClick={() => {
                            if (window.confirm("هل انت متاكد من حذف هذا الطلب؟")) {
                                ordersContext?.deleteOrder(order?.id)
                            }
                        }}
                    >
                        حذف
                    </Button>
                </td>
            </tr>

            <UpdateOrCreateOrder orderFromProps={isOpen ? order : null} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default OrderTableRow
