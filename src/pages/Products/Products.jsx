import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, useBreakpointValue } from '@chakra-ui/react';


import { ProductsContextProvider } from "../../Contexts/ProductsContext"
import { CategoryContextProvider } from "../../Contexts/CategoryContext"

import ProductCard from '../../Components/Products/ProductCard';
import Navbar from '../../Components/Navbar/Navbar';

import { useLocation } from 'react-router-dom';
import ProductCardSkeleton from '../../Components/ProductCardSkeleton';

import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";


const Products = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Determine sidebar width based on screen size
    const sidebarWidth = useBreakpointValue({ base: isSidebarOpen ? '320px' : '60px', md: '320px' });
    const sidebarBg = 'gray.200';


    const productsContext = useContext(ProductsContextProvider)

    const products = productsContext?.products

    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('')

    const [loading, setLoading] = React.useState(true);

    const handleGetProducts = async () => {
        setLoading(true)
        const params = { search, category }
        await productsContext?.fetchProducts(params);
        setLoading(false)
    };

    useEffect(() => {
        handleGetProducts()
    }, [search, category])


    const categoryContext = useContext(CategoryContextProvider)
    const categories = categoryContext?.categories
    useEffect(() => {
        categoryContext?.fetchCategories()
    }, [])




    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const categoryParam = urlParams.get('category') || '';

    // Set initial state with URL params
    useEffect(() => {
        setCategory(categoryParam);
    }, []);



    return (
        <div className='flex flex-col gap-4'>
            <div className='md:p-5 p-2'>
                <Navbar />
            </div>
            <div className="flex flex-col gap-5">
                <div className='grid md:grid-cols-2 gap-4 md:p-5 p-2 bg-gray-300'>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className='p-2 outline-none border border-green-500 w-full rounded-xl' placeholder='أبحث عن المنتج...' />
                    <Swiper
                        slidesPerView={"auto"}
                        spaceBetween={20}
                        loop={false}
                        className="p-2 bg-white rounded-xl w-full"
                    >
                        {categories?.map((_, index) => (
                            <SwiperSlide
                                key={index}
                                onClick={() => {
                                    if (category == _.id) {
                                        setCategory('')
                                    } else {
                                        setCategory(_.id)
                                    }
                                }}
                                className={`
                                    cursor-pointer flex justify-center p-2 px-5 bg-gray-200 rounded-full min-w-fit max-w-fit w-fit transition-all hover:bg-gray-400 hover:text-white
                                    ${category == _.id ? 'bg-gray-400 text-white' : ''}
                                    `}
                            >
                                {_?.name}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="bg-white grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5 w-full p-5 h-full">
                    {
                        loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <ProductCardSkeleton />
                            ))
                        )
                            :
                            products?.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))
                    }
                    {
                        products?.length == 0 && (
                            <div className='flex justify-center items-center text-3xl font-bold p-3 bg-yellow-100 text-yellow-500 border border-yellow-500 rounded-md h-fit w-full'>لا يوجد منتجات</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Products
