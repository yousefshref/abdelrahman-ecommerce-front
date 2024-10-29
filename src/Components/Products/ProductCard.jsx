import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { productDetails } from '../../Variables/pathes'
import { CartContextProvider } from '../../Contexts/CartContext'

const ProductCard = ({ product }) => {
    const cartContext = React.useContext(CartContextProvider)

    const handleAddToCart = () => {
        cartContext.addToCart(product)
    }
    return (
        <div
            className="flex flex-col gap-5 p-2 bg-white"
        >
            <Link to={productDetails(product?.id)}>
                <img
                    src={product?.images ? product?.images[0] : ""}
                    alt={product?.name}
                    className="w-full"
                />
            </Link>
            <div>
                <p className="font-bold text-right text-2xl">
                    {product?.name}
                </p>
                <p className="text-right text-sm mt-1 text-gray-500">
                    {product?.description}
                </p>
                <div className="flex items-center gap-5 justify-between mt-5">
                    <button onClick={handleAddToCart} className="bg-lime-500 transition-all duration-300 hover:bg-lime-600 active:bg-lime-700 text-white font-bold px-3 py-2 text-sm flex items-center gap-2">
                        <CiShoppingCart size={20} /> اضف الي السلة
                    </button>
                    <div className="flex items-center flex-col">
                        <p className="text-xl font-bold">{product?.offer_price ? product?.offer_price : product?.price} EGP</p>
                        {product?.offer_price && (
                            <small className="text-gray-500 line-through">بدلا من {product?.price} EGP</small>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
