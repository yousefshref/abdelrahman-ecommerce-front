import React, { createContext } from 'react'

const CartContext = ({ children }) => {

    const [cart, setCart] = React.useState([])

    const addToCart = (product, quantity = 1) => {
        const index = cart?.findIndex(item => item.id === product.id)
        if (index !== -1) {
            alert('المنتج موجود بالفعل فى السلة')
        } else {
            localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity }]))
            setCart([...cart, product])
            alert('تم اضافة المنتج الى السلة')
            getCart()
        }
    }

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
    return (
        <CartContextProvider.Provider value={{
            cart, setCart,
            addToCart,
            updateCart,
            getCart
        }}>
            {children}
        </CartContextProvider.Provider>
    )
}


export default CartContext
export const CartContextProvider = createContext()
