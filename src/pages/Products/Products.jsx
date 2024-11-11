import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, useBreakpointValue } from '@chakra-ui/react';


import { ProductsContextProvider } from "../../Contexts/ProductsContext"
import { CategoryContextProvider } from "../../Contexts/CategoryContext"

import ProductCard from '../../Components/Products/ProductCard';
import Navbar from '../../Components/Navbar/Navbar';

import { useLocation } from 'react-router-dom';


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
            <div className='p-5'>
                <Navbar />
            </div>
            <div className="flex gap-5">
                {/* Right Sidebar */}
                <Box
                    w={sidebarWidth}
                    bg={sidebarBg}
                    className="transition-all duration-300 ease-in-out p-5 flex flex-col items-center"
                >
                    {/* Sidebar Toggle Button (only visible on small screens) */}
                    {useBreakpointValue({ base: true, md: false }) && (
                        <Button onClick={() => setSidebarOpen(!isSidebarOpen)} mt={4}>
                            {isSidebarOpen ? 'Close' : 'Open'}
                        </Button>
                    )}

                    {/* search */}
                    <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='اسم المنتج' className='w-full rounded-md mt-5' />
                    {/* category */}
                    <select className='w-full rounded-md mt-5' onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option value={""}>الفئة</option>
                        {categories?.map((category, index) => (
                            <option value={category?.id} key={index}>{category?.name}</option>
                        ))}
                    </select>

                    {/* Sidebar Content */}
                    {isSidebarOpen && (
                        <div className="p-4">
                            {/* Add your content here (e.g., product list, filters, categories) */}
                            {/* search */}
                            {/* category */}
                        </div>
                    )}
                </Box>


                {/* Left side (Empty space) */}
                <div className="bg-white grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 w-full p-5 h-full">
                    {
                        loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <div className="border border-gray-200 rounded-lg p-4 max-w-xs w-full mx-auto shadow-md">
                                    {/* Image Skeleton */}
                                    <div className="bg-gray-200 h-40 rounded-md mb-4"></div>

                                    {/* Title Skeleton */}
                                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>

                                    {/* Subtitle Skeleton */}
                                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>

                                    {/* Button Skeletons */}
                                    <div className="flex justify-between items-center space-x-4">
                                        <div className="h-10 w-1/2 bg-gray-200 rounded-md"></div>
                                        <div className="h-10 w-1/2 bg-gray-200 rounded-md"></div>
                                    </div>

                                    {/* Price Skeleton */}
                                    <div className="h-6 bg-gray-200 rounded w-1/4 mt-4"></div>
                                </div>
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
