import React from 'react'
import { CiShoppingCart } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { productDetails, server } from '../../Variables/pathes'
import { CartContextProvider } from '../../Contexts/CartContext'
import { Flex } from '@chakra-ui/react'
import { BsWhatsapp } from 'react-icons/bs'
import { CgShoppingCart } from 'react-icons/cg'
import AddToCartButton from '../AddToCartButton/AddToCartButton'

const ProductCard = ({ product }) => {
    return (
        <div
            className="flex shadow-md flex-col gap-5 p-2 bg-white relative h-[100%]"
        >
            {product?.offer_price ? (
                <p className="z-10 absolute top-0 left-0 flex flex-col justify-center items-center bg-red-500 text-white px-2 py-1 text-sm">
                    خصم {Number(((product?.price - product?.offer_price) / product?.price * 100).toFixed(2))}%
                </p>
            ) : null}
            <Link to={productDetails(product?.id)} className='overflow-hidden relative'>
                <img loading="lazy"
                    src={server + product?.image1}
                    alt={product?.name}
                    className="w-full"
                // className="w-[500px] h-[300px]"
                />
                <img loading="lazy"
                    src={server + product?.image2}
                    alt={product?.name}
                    className="w-full absolute top-0 left-0 opacity-0 hover:opacity-100 transition-all duration-300"
                // className="w-[500px] h-[300px] absolute top-0 left-0 opacity-0 hover:opacity-100 transition-all duration-300"
                />
            </Link>
            <div className='mt-auto'>
                <p className="font-bold text-right text-xl">
                    {product?.name}
                </p>
                <p className="text-right text-xs mt-1 text-gray-500">
                    {product?.description?.length > 50 ? product?.description.slice(0, 50) + '...' : product?.description}
                </p>
                <div className='my-2'></div>
                <div className="flex flex-col items-center gap-2">
                    {product?.stock == 0 ? (
                        <div className="flex me-auto gap-5 text-red-500">
                            <p>نفذ مخزون المنتج, سيتم توافره في أقرب وقت.</p>
                        </div>
                    ) : (
                        <Flex gap={3} className='flex md:flex-row flex-col w-full'>
                            <div className='w-full md:w-[50%]'>
                                <AddToCartButton product={product} />
                            </div>
                            <button className="w-full md:w-[50%] bg-transparent border border-lime-500 text-lime-500 transition-all justify-center text-nowrap duration-300 hover:bg-lime-100 hover:border-lime-100 active:bg-lime-700 font-bold px-2 py-2 text-sm flex items-center gap-2">
                                <Link className='flex gap-2' to={"https://wa.me/201093952937"}>
                                    <BsWhatsapp size={20} />
                                    <p>طلب عبر واتساب</p>
                                </Link>
                            </button>
                        </Flex>
                    )}
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
