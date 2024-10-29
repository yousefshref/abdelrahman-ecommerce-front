import { Button, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import UpdateOrCreateOrder from './UpdateOrCreateOrder'
import { OrderContextProvider } from '../../Contexts/OrderContext'


const OrderTableRow = ({ order, index }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const ordersContext = React.useContext(OrderContextProvider)
    return (
        <>
            <tr>
                <td onClick={onOpen} className="border p-2 cursor-pointer text-start transition-all hover:bg-blue-200">{index + 1}</td>
                <td className="border p-2 text-start">{order.tracking_code ? order.tracking_code : 'لا يوجد'}</td>
                <td className="border p-2 text-start">{order.user_details?.username}</td>
                <td className="border p-2 text-start">{order.name}</td>
                <td className="border p-2 text-start">{order.phone_number}</td>
                <td className="border p-2 text-start">{order.state_details?.name}</td>
                <td className="border p-2 text-wrap text-start w-[200px]">{order.address}</td>
                <td className="border p-2 text-start">{order.status}</td>
                <td className="border p-2 text-start">{order?.order_items?.reduce((acc, item) => item?.product_details?.offer_price ? item?.product_details?.offer_price * item.quantity : item?.product_details?.price * item.quantity, 0) + Number(order?.state_details?.shipping_price)} EGP</td>
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
