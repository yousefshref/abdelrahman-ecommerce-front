import React, { useEffect } from 'react'
import { CartContextProvider } from '../../Contexts/CartContext'
import NumberInput from '../NumberInput/NumberInput'
import { BiTrash } from 'react-icons/bi'
import { Box, Flex, Text } from '@chakra-ui/react'
import { CgClose } from 'react-icons/cg'

import { server } from '../../Variables/pathes'
const CartItem = ({ item, index }) => {

    const cartContext = React.useContext(CartContextProvider)

    const [quantity, setQuantity] = React.useState(item?.quantity)


    const [price, setPrice] = React.useState(item?.offer_price ? item?.offer_price : item?.price)
    useEffect(() => {
        setPrice(item?.offer_price ? item?.offer_price : item?.price)
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
        <Box shadow={"md"} p={"3"} className='relative p-2'>
            {/* delete button */}
            <CgClose onClick={() => cartContext?.deleteCart(item?.id)} className='absolute top-2 left-2 text-red-500 text-2xl cursor-pointer' />
            <Flex direction={window.innerWidth < 768 ? "column" : "row"} gap={"5"}>
                {/* image */}
                <img
                    src={server + item?.image1}
                    alt={item?.name}
                    className='md:w-[120px] w-full shadow-lg'
                />
                {/* title and quanity and price */}
                <Flex direction={"column"} gap="3" className='w-full'>
                    <Flex direction={"column"} gap="1">
                        <strong className='lg:text-2xl text-base'>{item?.name}</strong>
                        <p className='text-gray-500'>الكمية: {quantity}</p>
                    </Flex>
                    <Box className='w-full'>
                        <Flex className='w-full' direction={window.innerWidth < 768 ? "column" : "row"} gap="5" justifyContent={"space-between"} alignItems={window.innerWidth < 768 ? "start" : "center"}>
                            <Text className='text-2xl font-bold text-nowrap'>
                                {price} EGP
                            </Text>
                            <div className='scale-90'>
                                <NumberInput value={quantity} setValue={setQuantity} />
                            </div>
                        </Flex>
                    </Box>
                </Flex>
                {/* quantity */}
                {/* <Flex className='ms-auto' direction={"column"} justifyContent={"end"}>
                    <div className='scale-90'>
                        <NumberInput value={quantity} setValue={setQuantity} />
                    </div>
                </Flex> */}
            </Flex>
        </Box>
    )
}

export default CartItem
