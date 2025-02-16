import React from 'react'
import { CartContextProvider } from '../../Contexts/CartContext'
import { CgShoppingCart } from 'react-icons/cg'
import CartDrawer from '../CartDrawer/CartDrawer'
import { useDisclosure } from '@chakra-ui/react'

const AddToCartButton = ({ product }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const cartContext = React.useContext(CartContextProvider)

    const handleAddToCart = async () => {
        await cartContext.addToCart(product).then(res => {
            if (res) {
                // open the drawer
                onOpen()
            }
        })
    }
    return (
        <>
            <button onClick={handleAddToCart} className="w-full bg-lime-500 transition-all justify-center duration-300 text-nowrap hover:bg-lime-600 active:bg-lime-700 text-white font-bold px-3 py-2 text-sm flex items-center gap-2">
                <CgShoppingCart size={20} /> اضف للسلة
            </button>

            <CartDrawer isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </>
    )
}

export default AddToCartButton
