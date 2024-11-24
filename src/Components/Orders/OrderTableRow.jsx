import { Button, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import UpdateOrCreateOrder from './UpdateOrCreateOrder'
import { OrderContextProvider } from '../../Contexts/OrderContext'


import { LiaShippingFastSolid } from 'react-icons/lia'
import { clientUrl } from '../../Variables/server'
import { UsersContextProvider } from '../../Contexts/UsersContext'
import { trackOrders } from '../../Variables/pathes'


const OrderTableRow = ({ order, index }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const ordersContext = React.useContext(OrderContextProvider)
    const usersContext = React.useContext(UsersContextProvider)


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



        ordersContext?.updateOrder(order?.id, { status: newStatus, tracking_code: newTrackingCode }).then(e => {
            if (e) {
                onClose()

                setStatus(e?.status)
                setTrackingCode(e?.tracking_code)

                if (sendStatusChanged && e?.email) {
                    usersContext?.sendEmail({
                        recipient_email: e?.email,
                        subject: "تم شحن طلبك",
                        message: `
                                    <h2>تم تغيير حالة الطلب وسيتم توصيلة قريبا ${e?.id}</h2>
                                    <p style="margin-top: 15px">
                                        تغير تغيير حالة الطلب رقم ${e?.id} وهو في الطريق الأن تم شحنه.... ترقب مكالمة المندوب قريبا
                                    </p>
                                    <p style="margin-top: 10px">
                                        يمكنك تتبع الطلب من خلال هذا الكود ${e?.tracking_code}, من خلال <a href=${clientUrl + trackOrders()}>هذه الصفحة</a>
                                    </p>
                                `,
                        content_type: "html",
                    })
                }
                if (sendArrivedEmail && e?.email) {
                    usersContext?.sendEmail({
                        recipient_email: e?.email,
                        subject: "تم تسليم شحنتك",
                        message: `
                                    <h2>تم تسليم شحنتك رقم ${e?.id}</h2>
                                    <p style="margin-top: 15px">
                                        تم تسليم الشحنة للمندوب وترقب وصولها اليوم من الساعة 9 صباحا حتى الساعة 9 مساءً
                                    </p>
                                    <p style="margin-top: 10px">
                                        يمكنك تتبع الطلب من خلال هذا الكود ${e?.tracking_code}, من خلال <a href=${clientUrl + trackOrders()}>هذه الصفحة</a>
                                    </p>
                                `,
                        content_type: "html",
                    })
                }
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
                <td onClick={onOpen} className="border p-2 cursor-pointer text-start transition-all hover:bg-green-400 bg-green-100">{index + 1}</td>
                <td className="border p-2 text-start">{order.tracking_code ? order.tracking_code : 'لا يوجد'}</td>
                <td className="border p-2 text-start">{order.user_details?.username}</td>
                <td className="border p-2 text-start">{order.name}</td>
                <td className="border p-2 text-start">{order.phone_number}</td>
                <td className="border p-2 text-start">{order.state_details?.name}</td>
                <td className="border p-2 text-wrap text-start w-[200px]">{order.address}</td>
                <td className="border p-2 text-wrap text-start w-[200px]">{
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
                {/* <td className="border p-2 text-start">{order?.order_items?.reduce((acc, item) => item?.product_details?.offer_price ? item?.product_details?.offer_price * item.quantity : item?.product_details?.price * item.quantity, 0) + Number(order?.state_details?.shipping_price)} EGP</td> */}
                <td className="border p-2 text-start">
                    <input
                        onChange={(e) => {
                            setInterval(() => {
                                handleUpdateOrder(status, e.target.value)
                            }, 3000)
                        }}
                        value={tracking_code}
                        className="p-1 w-full px-3 border"
                    />
                </td>
                <td className="border p-2 text-start">{total} EGP</td>
                <td className="border p-2 text-nowrap text-start">
                    <Button
                        colorScheme="red"
                        size="sm"
                        className="flex-shrink-0 w-full"
                        onClick={() => {
                            ordersContext?.deleteOrder(order?.id)
                        }}
                    >
                        حذف
                    </Button>
                </td>
            </tr>

            <UpdateOrCreateOrder order={isOpen ? order : null} isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default OrderTableRow
