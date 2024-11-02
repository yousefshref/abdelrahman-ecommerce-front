import React, { useEffect } from 'react'
import { CartContextProvider } from '../../Contexts/CartContext'
import NumberInput from '../NumberInput/NumberInput'
import { BiTrash } from 'react-icons/bi'

const CartItem = ({ item, index }) => {

    const cartContext = React.useContext(CartContextProvider)

    const [quantity, setQuantity] = React.useState(item?.quantity)


    const [price, setPrice] = React.useState(item?.offe_price ? item?.offe_price : item?.price)
    useEffect(() => {
        setPrice(item?.offe_price ? item?.offe_price : item?.price)
    }, [])

    const [total, setTotal] = React.useState(item?.quantity * price)

    const calculateTotal = () => {
        setTotal(quantity * item?.price)
    }

    const handleUpdateCart = () => {
        cartContext?.updateCart(item?.id, quantity)
        calculateTotal()
    }

    useEffect(() => {
        handleUpdateCart()
    }, [quantity])

    return (
        <tr>
            <td className="border px-4 py-2 gap-3 min-w-[200px]">
                {item?.name}
            </td>
            <td className="border px-4 py-2 min-w-[100px] font-bold">
                <p>{item?.offer_price ? item?.offer_price : item?.price} EGP</p>
            </td>
            <td className="border px-4 py-2 min-w-[200px]">
                <NumberInput value={quantity} setValue={setQuantity} />
            </td>
            <td className="border px-4 py-2 min-w-[100px] font-bold">{item?.offer_price ? item?.offer_price * item?.quantity : item?.price * item?.quantity} EGP</td>
            <td className="border px-4 py-2 min-w-[100px] font-bold">
                <BiTrash className='text-2xl text-red-600 cursor-pointer' onClick={() => cartContext?.deleteCart(item?.id)} />
            </td>
        </tr>
    )
}

export default CartItem
