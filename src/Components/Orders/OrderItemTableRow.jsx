import React, { useContext, useEffect } from 'react'

import { Input, Select } from '@chakra-ui/react';
import { CiTrash } from 'react-icons/ci';
import { ProductsContextProvider } from '../../Contexts/ProductsContext';
import { StatesContextProvider } from '../../Contexts/StatesContext';


const OrderItemTableRow = ({ item, products, order_items, setOrderItems, index }) => {
    const [product, setProduct] = React.useState(item?.product)
    const [quantity, setQuantity] = React.useState(item?.quantity)
    const [price, setPrice] = React.useState(0)


    useEffect(() => {
        setProduct(item?.product)
        setQuantity(item?.quantity)
    }, [item, order_items])


    const { fetchProducts } = useContext(ProductsContextProvider)
    useEffect(() => {
        fetchProducts()
    }, [])

    const { getStates } = useContext(StatesContextProvider)
    useEffect(() => {
        getStates()
    }, [])


    useEffect(() => {
        setPrice(products?.find((p) => p.id == product)?.offer_price ? products?.find((p) => p.id == product)?.offer_price * quantity : products?.find((p) => p.id == product)?.price * quantity)
    }, [product, quantity])
    return (
        <tr className="border-b">
            <td className="px-2 py-2 bg-white">
                <Select
                    size={"sm"}
                    placeholder="المنتج"
                    value={product}
                    onChange={(e) => {
                        const newOrderItems = [...order_items]
                        newOrderItems[index].product = e.target.value
                        setOrderItems(newOrderItems)
                        setProduct(e.target.value)
                    }}
                >
                    {products?.map((product) => (
                        <option
                            key={product.id}
                            value={product.id}
                        >
                            {product.name}
                        </option>
                    ))}
                </Select>
            </td>
            <td className="px-2 py-2 bg-white">
                <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                        const newOrderItems = [...order_items]
                        newOrderItems[index].quantity = e.target.value
                        setOrderItems(newOrderItems)
                        setQuantity(e.target.value)
                    }}
                    placeholder="الكمية"
                    size="sm"
                />
            </td>
            <td className="px-2 py-2 bg-white">
                {price} EGP
            </td>
            <td className="px-2 py-2 bg-white">
                <CiTrash onClick={() => {
                    const newOrderItems = [...order_items]
                    newOrderItems.splice(index, 1)
                    setOrderItems(newOrderItems)
                }} className='text-red-500' size={25} />
            </td>
        </tr>
    )
}

export default OrderItemTableRow
