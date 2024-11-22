import { Button, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import UpdateOrCreateOrder from './UpdateOrCreateOrder'
import { OrderContextProvider } from '../../Contexts/OrderContext'


import { LiaShippingFastSolid } from 'react-icons/lia'


const OrderTableRow = ({ order, index }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const ordersContext = React.useContext(OrderContextProvider)


    const [status, setStatus] = React.useState(order?.status)
    useEffect(() => {
        setStatus(order?.status)
    }, [order])


    const handleUpdateOrder = (newStatus) => {
        ordersContext?.updateOrder(order?.id, { status: newStatus }).then(e => {
            if (e) {
                onClose()
                setStatus(e?.status)
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
                        handleUpdateOrder(e.target.value)
                    }} value={status} className={`p-1 w-full px-3 border ${status == 'delivered' ? "border-green-500" : ""} ${status == 'cancelled' ? "border-red-500" : ""}`}>
                        <option value="">اختر الحالة</option>
                        <option value="pending">في الانتظار</option>
                        <option value="processing">قيد التنفيذ</option>
                        <option value="shipped">تم الشحن</option>
                        <option value="delivered">تم التسليم</option>
                        <option value="cancelled">ملغي</option>
                    </select>
                </td>
                {/* <td className="border p-2 text-start">{order?.order_items?.reduce((acc, item) => item?.product_details?.offer_price ? item?.product_details?.offer_price * item.quantity : item?.product_details?.price * item.quantity, 0) + Number(order?.state_details?.shipping_price)} EGP</td> */}
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
