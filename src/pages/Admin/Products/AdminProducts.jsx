import React, { useContext, useEffect, useState } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Button, Input, Select, useDisclosure } from '@chakra-ui/react'
import { ProductsContextProvider } from '../../../Contexts/ProductsContext'
import ProductTableRow from '../../../Components/Products/ProductTableRow'
import { CategoryContextProvider } from '../../../Contexts/CategoryContext'
import UpdateOrCreateProduct from '../../../Components/Products/UpdateOrCreateProduct'

const AdminProducts = () => {
    const productsContext = useContext(ProductsContextProvider)

    const products = productsContext?.products

    useEffect(() => {
        productsContext?.fetchProducts()
    }, [])


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


    return (
        <AdminLayout>
            {/* search and filter */}
            <div className='flex gap-7 items-center'>
                <div className='flex md:flex-row flex-col gap-3 w-full'>
                    {/* name */}
                    <Input
                        type='text'
                        placeholder='ابحث بالID او الاسم'
                        className='w-full'
                        sx={{
                            backgroundColor: "white"
                        }}
                    />
                    {/* categories */}
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
            </div>

            {/* actions */}
            <div className='flex md:flex-row flex-col-reverse md:items-center justify-between gap-2 mt-10'>
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
            </div>

            {/* products */}
            <div className="w-full max-w-full overflow-x-auto">
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
            </div>


            {/* create modeal */}
            <UpdateOrCreateProduct isOpen={isOpen} onClose={onClose} create />

        </AdminLayout >
    )
}

export default AdminProducts
