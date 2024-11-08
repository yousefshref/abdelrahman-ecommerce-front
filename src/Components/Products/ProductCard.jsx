import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { productDetails, server } from '../../Variables/pathes'
import { CartContextProvider } from '../../Contexts/CartContext'
import { Flex } from '@chakra-ui/react'
import { BsWhatsapp } from 'react-icons/bs'
import { CgShoppingCart } from 'react-icons/cg'

const ProductCard = ({ product }) => {
    const cartContext = React.useContext(CartContextProvider)

    const handleAddToCart = () => {
        cartContext.addToCart(product)
    }
    return (
        <div
            className="flex shadow-md flex-col gap-5 p-2 bg-white relative"
        >
            {product?.offer_price ? (
                <p className="absolute top-0 left-0 flex flex-col justify-center items-center bg-red-500 text-white px-2 py-1 text-sm">
                    خصم {Number(((product?.price - product?.offer_price) / product?.price * 100).toFixed(2))}%
                </p>
            ) : null}
            <Link to={productDetails(product?.id)}>
                <img
                    src={server + product?.image1}
                    alt={product?.name}
                    className="w-full"
                />
            </Link>
            <div>
                <p className="font-bold text-right text-xl">
                    {product?.name}
                </p>
                {/* <p className="text-right text-xs mt-1 text-gray-500">
                    {product?.description?.length > 50 ? product?.description.slice(0, 50) + '...' : product?.description}
                </p> */}
                <div className="flex flex-col items-center gap-2 justify-between mt-2">
                    <Flex gap={3} className='flex md:flex-row flex-col w-full'>
                        <button onClick={handleAddToCart} className="w-full md:w-[50%] bg-lime-500 transition-all justify-center duration-300 text-nowrap hover:bg-lime-600 active:bg-lime-700 text-white font-bold px-3 py-2 text-sm flex items-center gap-2">
                            <CgShoppingCart size={20} /> اضف للسلة
                        </button>
                        <button className="w-full md:w-[50%] bg-transparent border border-lime-500 text-lime-500 transition-all justify-center text-nowrap duration-300 hover:bg-lime-100 hover:border-lime-100 active:bg-lime-700 font-bold px-2 py-2 text-sm flex items-center gap-2">
                            <Link className='flex gap-2' to={"https://wa.me/201093952937"}>
                                <BsWhatsapp size={20} />
                                <p>طلب عبر واتساب</p>
                            </Link>
                        </button>
                    </Flex>
                    <div className="flex items-center gap-2 text-nowrap md:w-[50%] w-full justify-center">
                        <p className="text-xl font-bold">{product?.offer_price ? product?.offer_price : product?.price} EGP</p>
                        {product?.offer_price ? (
                            <small className="text-gray-500 line-through">بدلا من {product?.price} EGP</small>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
