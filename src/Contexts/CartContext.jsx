import React, { createContext, useContext } from 'react'
import { AlertContextProvider } from './AlertContext'
import { useToast } from '@chakra-ui/react'


const CartContext = ({ children }) => {
    const [cart, setCart] = React.useState([])

    const alertContext = useContext(AlertContextProvider)

    const toast = useToast();


    const addToCart = (product, quantity = 1) => {
        const { id, name, price, offer_price } = product;  // Keep only essential fields
        const newProduct = { id, name, price, offer_price, quantity };

        const index = cart?.findIndex(item => item.id === product.id);
        if (index !== -1) {
            toast({
                title: "المنتج موجود بالفعل",
                // description: "Your item has been successfully added to the cart.",
                status: "error",
                duration: 3000, // 3 seconds
                isClosable: true,
                position: "bottom-left",
                variant: "subtle", // Optional: You can use subtle for a softer effect
            });
        } else {
            try {
                const newCart = cart.concat(newProduct);
                if (window.localStorage) {
                    localStorage.setItem('cart', JSON.stringify(newCart));
                }
                setCart(newCart);

                toast({
                    title: "تم اضافة المنتج للسلة",
                    // description: "Your item has been successfully added to the cart.",
                    status: "success",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    // variant: "subtle", // Optional: You can use subtle for a softer effect
                });
            } catch (error) {
                console.error('Error saving to localStorage:', error);
                alert(error);
            }
        }
    };



    const updateCart = (id, quantity) => {
        const index = cart?.findIndex(item => item.id === id)
        if (index !== -1) {
            localStorage.setItem('cart', JSON.stringify(cart.map(item => item.id === id ? { ...item, quantity } : item)))
            setCart(cart.map(item => item.id === id ? { ...item, quantity } : item))
            getCart()
        }
    }

    const getCart = () => {
        if (localStorage.getItem('cart')) {
            setCart(JSON.parse(localStorage.getItem('cart')))
        }
    }


    const deleteCart = (cartID) => {
        const index = cart?.findIndex(item => item.id === cartID)
        if (index !== -1) {
            localStorage.setItem('cart', JSON.stringify(cart.filter(item => item.id !== cartID)))
            setCart(cart.filter(item => item.id !== cartID))
            getCart()
        }
    }


    return (
        <CartContextProvider.Provider value={{
            cart, setCart,
            addToCart,
            updateCart,
            getCart,
            deleteCart,
        }}>
            {children}
        </CartContextProvider.Provider>
    )
}


export default CartContext
export const CartContextProvider = createContext()
