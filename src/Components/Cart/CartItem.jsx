import React, { useEffect } from 'react'
import { CartContextProvider } from '../../Contexts/CartContext'
import NumberInput from '../NumberInput/NumberInput'

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
            <td className="border px-4 py-2 gap-3">
                <div className='flex items-center gap-4'>
                    <img src={item?.images[0]} className="w-10" alt="" />
                    <div>
                        <p>{item?.name}</p>
                        {/* <small className='text-gray-500'>{item?.description?.length > 40 ? item?.description.slice(0, 40) + "..." : item?.description}</small> */}
                    </div>
                </div>
            </td>
            <td className="border px-4 py-2 font-bold">
                <p>{item?.offer_price ? item?.offer_price : item?.price} EGP</p>
            </td>
            <td className="border px-4 py-2">
                <NumberInput value={quantity} setValue={setQuantity} />
            </td>
            <td className="border px-4 py-2 font-bold">{item?.offer_price ? item?.offer_price * item?.quantity : item?.price * item?.quantity} EGP</td>
        </tr>
    )
}

export default CartItem
