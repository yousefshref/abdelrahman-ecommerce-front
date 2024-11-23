import React, { createContext, useContext } from 'react'
import { AlertContextProvider } from './AlertContext'
import { useToast } from '@chakra-ui/react'

import { initDB } from '../Utlis/initDB'


const CartContext = ({ children }) => {
    const [cart, setCart] = React.useState([])

    const alertContext = useContext(AlertContextProvider)

    const toast = useToast();


    const addToCart = async (product, quantity = 1) => {
        const { id, name, price, offer_price, image1 } = product;
        const newProduct = { id, name, price, offer_price, quantity, image1 };

        try {
            const db = await initDB();
            const existingProduct = await db.get('cart', id);

            if (existingProduct) {
                // If product already exists in the cart
                toast({
                    title: "المنتج موجود بالفعل",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle",
                });
            } else {
                // Add the new product to IndexedDB cart
                await db.put('cart', newProduct);

                // Retrieve updated cart to set in state
                const allCartItems = await db.getAll('cart');
                setCart(allCartItems);

                toast({
                    title: "تم اضافة المنتج للسلة",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "bottom-left",
                });

                return true
            }
        } catch (error) {
            console.error('Error with IndexedDB:', error);
            alert('Error saving to cart');
        }
    };

    // const addToCart = (product, quantity = 1) => {
    //     const { id, name, price, offer_price, images } = product;  // Keep only essential fields
    //     const newProduct = { id, name, price, offer_price, quantity, images };

    //     const index = cart?.findIndex(item => item.id === product.id);
    //     if (index !== -1) {
    //         toast({
    //             title: "المنتج موجود بالفعل",
    //             // description: "Your item has been successfully added to the cart.",
    //             status: "error",
    //             duration: 3000, // 3 seconds
    //             isClosable: true,
    //             position: "bottom-left",
    //             variant: "subtle", // Optional: You can use subtle for a softer effect
    //         });
    //     } else {
    //         try {
    //             const newCart = cart.concat(newProduct);
    //             if (window.localStorage) {
    //                 localStorage.setItem('cart', JSON.stringify(newCart));
    //             }
    //             setCart(newCart);

    //             toast({
    //                 title: "تم اضافة المنتج للسلة",
    //                 // description: "Your item has been successfully added to the cart.",
    //                 status: "success",
    //                 duration: 3000, // 3 seconds
    //                 isClosable: true,
    //                 position: "bottom-left",
    //                 // variant: "subtle", // Optional: You can use subtle for a softer effect
    //             });
    //         } catch (error) {
    //             console.error('Error saving to localStorage:', error);
    //             alert(error);
    //         }
    //     }
    // };


    const updateCart = async (id, quantity) => {
        try {
            const db = await initDB();
            const product = await db.get('cart', id);

            if (product) {
                // Update the product quantity in IndexedDB
                const updatedProduct = { ...product, quantity };
                await db.put('cart', updatedProduct);

                // Retrieve updated cart and set state
                const allCartItems = await db.getAll('cart');
                setCart(allCartItems);
            }
        } catch (error) {
            console.error('Error updating cart item in IndexedDB:', error);
        }
    };



    // const updateCart = (id, quantity) => {
    //     const index = cart?.findIndex(item => item.id === id)
    //     if (index !== -1) {
    //         localStorage.setItem('cart', JSON.stringify(cart.map(item => item.id === id ? { ...item, quantity } : item)))
    //         setCart(cart.map(item => item.id === id ? { ...item, quantity } : item))
    //         getCart()
    //     }
    // }



    const getCart = async () => {
        try {
            const db = await initDB();
            const allCartItems = await db.getAll('cart');
            setCart(allCartItems);
        } catch (error) {
            console.error('Error retrieving cart from IndexedDB:', error);
        }
    };


    // const getCart = () => {
    //     if (localStorage.getItem('cart')) {
    //         setCart(JSON.parse(localStorage.getItem('cart')))
    //     }
    // }


    const deleteCart = async (cartID) => {
        try {
            const db = await initDB();
            await db.delete('cart', cartID);

            // Retrieve updated cart and set state
            const allCartItems = await db.getAll('cart');
            setCart(allCartItems);

            toast({
                title: "تم إزالة المنتج من السلة",
                status: "info",
                duration: 3000,
                isClosable: true,
                position: "bottom-left",
            });
        } catch (error) {
            console.error('Error deleting cart item from IndexedDB:', error);
        }
    };


    // const deleteCart = (cartID) => {
    //     const index = cart?.findIndex(item => item.id === cartID)
    //     if (index !== -1) {
    //         localStorage.setItem('cart', JSON.stringify(cart.filter(item => item.id !== cartID)))
    //         setCart(cart.filter(item => item.id !== cartID))
    //         getCart()
    //     }
    // }


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
