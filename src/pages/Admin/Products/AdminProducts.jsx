import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Box, Button, Flex, Icon, Input, Select, Text, useDisclosure } from '@chakra-ui/react'
import { ProductsContextProvider } from '../../../Contexts/ProductsContext'
import ProductTableRow from '../../../Components/Products/ProductTableRow'
import { CategoryContextProvider } from '../../../Contexts/CategoryContext'
import UpdateOrCreateProduct from '../../../Components/Products/UpdateOrCreateProduct'
import AdminBox from '../../../Components/AdminBox/AdminBox'
import { CiSearch } from 'react-icons/ci'
import { BiSearch } from 'react-icons/bi'
import Loading from '../../../Components/Loading/Loading'
import { CgAdd } from 'react-icons/cg'

const AdminProducts = () => {
    const productsContext = useContext(ProductsContextProvider)
    const categoryContext = useContext(CategoryContextProvider)

    const categories = categoryContext?.categories



    const loading = productsContext?.loading

    const products = productsContext?.products
    const getProducts = productsContext?.fetchProducts

    const about_to_end = productsContext?.about_to_end
    const setAboutToEnd = productsContext?.setAboutToEnd

    const search = productsContext?.search
    const setSearch = productsContext?.setSearch

    const category = productsContext?.category
    const setCategory = productsContext?.setCategory

    useEffect(() => {
        getProducts();
    }, [about_to_end]);


    const { isOpen, onOpen, onClose } = useDisclosure()


    const [actionType, setActionType] = useState('')
    const [selectedProducts, setSelectedProducts] = useState([])


    const handleActions = () => {
        if (actionType == "delete") {
            selectedProducts.forEach(product => {
                productsContext?.handleDeleteProduct(product)
            })
        }
    }



    // if (loading) return <Loading />

    return (
        <AdminLayout>

            {loading ? (
                <Loading />
            ) : null}

            {/* summary */}
            <Box>
                <Flex direction={"column"} gap={2}>
                    <Flex gap={window.innerWidth > 768 ? 10 : 5} className='md:flex-row flex-col'>
                        <div className='md:w-[50%] w-full'>
                            <AdminBox
                                img={"https://cdn-icons-png.freepik.com/256/7078/7078310.png?semt=ais_hybrid"}
                                text={"جميع المنتجات"}
                                number={products?.length}
                            />
                        </div>
                        <div
                            onClick={() => {
                                if (about_to_end) {
                                    setAboutToEnd("")
                                } else {
                                    setAboutToEnd(true)
                                }
                            }}
                            className={`md:w-[50%] w-full ${about_to_end ? "border-4 border-green-500 rounded-xl" : ""}`}
                        >
                            <AdminBox
                                img={
                                    "https://cdn-icons-png.freepik.com/256/8625/8625327.png?semt=ais_hybrid"
                                }
                                text={"منتجات على وشك الانتهاء"}
                                number={products?.length}
                            />
                        </div>
                    </Flex>
                    <Box onClick={onOpen} className="p-2 transition-all border-green-400 border mt-5 rounded-md text-green-500 flex gap-5 justify-center flex-col items-center 
                shadow-[0_0_10px_rgba(72,187,120,0.5)] hover:shadow-[0_0_20px_rgba(72,187,120,0.8)] 
                duration-300 ease-in-out bg-white h-[80px] cursor-pointer text-xl">
                        <div className="flex gap-2 items-center">
                            <CgAdd className="text-green-500 hover:text-green-300 transition-colors duration-300" />
                            <strong className="hover:text-green-300 transition-colors duration-300">اضافة منتج جديد</strong>
                        </div>
                    </Box>
                </Flex>
            </Box>


            {/* search */}
            <Box className='mt-10 w-full'>
                <Flex direction={"column"} gap={2}>
                    <Flex gap={window.innerWidth > 768 ? 10 : 5} className='md:flex-row flex-col w-full'>
                        <div className='w-[100%]'>
                            <Input
                                type='text'
                                placeholder='ابحث عن منتج'
                                sx={{
                                    backgroundColor: "white"
                                }}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div className='md:w-[calc(100%-200px)] w-full'>
                            <Select
                                className='dropdown-container w-[200px]'
                                placeholder='أختر الفئة'
                                sx={{
                                    backgroundColor: "white"
                                }}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories?.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Select>
                        </div>
                    </Flex>
                    <Button onClick={getProducts} colorScheme='green' className='w-full max-w-[100px] flex gap-2 items-center'>
                        <Icon as={BiSearch} />
                        <p>بحث</p>
                    </Button>
                </Flex>
            </Box>


            {/* actions */}
            <Box className='mt-10 w-full'>
                <Flex gap={2} alignItems={"center"}>
                    <div className='w-[400px]'>
                        <Select
                            onChange={(e) => setActionType(e.target.value)}
                            className='dropdown-container'
                            placeholder='اختر العملية التي تريدها'
                            sx={{
                                backgroundColor: "white"
                            }}
                            disabled={selectedProducts.length == 0}
                        >
                            <option value='delete'>حذف المنتجات</option>
                        </Select>
                    </div>
                    <Button
                        colorScheme='blackAlpha'
                        className='w-full max-w-[100px]'
                        onClick={handleActions}
                        disabled={selectedProducts.length == 0 || actionType == ''}
                    >
                        اتمام العملية
                    </Button>
                </Flex>
            </Box>



            {/* products */}
            <div className="w-full max-w-full overflow-x-auto">
                <table className="mt-10 w-full min-w-[800px] bg-white table-fixed">
                    <thead>
                        <tr>
                            <th className="border p-2 text-nowrap text-start w-[50px]"></th>
                            <th className="border p-2 text-nowrap text-start w-[50px]">#</th>
                            <th className="border p-2 text-nowrap text-start w-[50px]">الترتيب</th>
                            <th className="border p-2 text-nowrap text-start w-[300px]">المنتج</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]">السعر</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]">العروض</th>
                            <th className="border p-2 text-nowrap text-start w-[130px]">النوع</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]">الكمية</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]">اقل كمية</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, index) => (
                            <ProductTableRow selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} key={product?.id} product={product} index={index} />
                        ))}
                    </tbody>
                </table>
            </div>



            {/* search and filter */}
            {/* <div className='flex gap-7 items-center'>
                <div className='flex md:flex-row flex-col gap-3 w-full'>
                    <Input
                        type='text'
                        placeholder='ابحث بالID او الاسم'
                        className='w-full'
                        sx={{
                            backgroundColor: "white"
                        }}
                    />
                    <select
                        className='dropdown-container w-full' placeholder='Select option'>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </select>
                    <Button
                        colorScheme='blue'
                        className='w-full max-w-[100px]'
                        onClick={() => { }}
                    >
                        بحث
                    </Button>
                </div>
            </div> */}

            {/* actions */}
            {/* <div className='flex md:flex-row flex-col-reverse md:items-center justify-between gap-2 mt-10'>
                <Button
                    colorScheme='green'
                    className='w-full max-w-[100px]'
                    onClick={onOpen}
                >
                    اضافة منتج
                </Button>

                <div className='flex gap-2 items-center w-full max-w-[500px]'>
                    <select
                        className='w-full'
                        onChange={(e) => setActionType(e.target.value)}
                        value={actionType}
                    >
                        <option value=''>أختر العملية</option>
                        <option value='delete'>حذف المنتجات</option>
                    </select>
                    <Button
                        onClick={handleActions}
                        colorScheme='blue'
                        className='w-full max-w-[100px]'
                        size={"sm"}
                    >
                        اتمام العملية
                    </Button>
                </div>
            </div> */}

            {/* products */}
            {/* <div className="w-full max-w-full overflow-x-auto">
                <table className="mt-10 w-full min-w-[800px] bg-white table-fixed">
                    <thead>
                        <tr>
                            <th className="border p-2 text-nowrap text-start w-[50px]">#</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]">المستخدم</th>
                            <th className="border p-2 text-nowrap text-start w-[300px]">المنتج</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]">السعر</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]">العروض</th>
                            <th className="border p-2 text-nowrap text-start w-[130px]">النوع</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]">الكمية</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]">اقل كمية</th>
                            <th className="border p-2 text-nowrap text-start w-[100px]"></th>
                            <th className="border p-2 text-nowrap text-start w-[50px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, index) => (
                            <ProductTableRow selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} key={product?.id} product={product} index={index} />
                        ))}
                    </tbody>
                </table>
            </div> */}


            {/* create modeal */}
            <UpdateOrCreateProduct isOpen={isOpen} onClose={onClose} create />

        </AdminLayout >
    )
}

export default AdminProducts
