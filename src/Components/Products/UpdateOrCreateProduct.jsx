import React, { useContext, useEffect, useState } from 'react'

import { Modal, ModalBody, ModalContent, Input, Button, Select, ModalHeader, ModalOverlay, Textarea, Flex, Box } from '@chakra-ui/react'

import { PiPlus } from 'react-icons/pi'
import { CategoryContextProvider } from '../../Contexts/CategoryContext'
import { ProductsContextProvider } from '../../Contexts/ProductsContext'
import { CiTrash } from 'react-icons/ci'

import { server } from '../../Variables/pathes'

const UpdateOrCreateProduct = ({ isOpen, onClose, create, productID }) => {

    const [image1, setImage1] = useState("")
    const [image2, setImage2] = useState("")
    const [image3, setImage3] = useState("")
    const [image4, setImage4] = useState("")
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [offer_price, setOfferPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [min_stock, setMinStock] = useState(0)
    // related products
    const [related_products, setRelatedProducts] = useState([])



    const categoryContext = useContext(CategoryContextProvider)
    const categories = categoryContext?.categories
    useEffect(() => {
        categoryContext?.fetchCategories()
    }, [])



    const productsContext = useContext(ProductsContextProvider)
    const product = productsContext?.product
    useEffect(() => {
        if (productID) {
            productsContext?.fetchProduct(productID)
        }
    }, [productID])


    useEffect(() => {
        if (product && !create) {
            setName(product?.name)
            setDescription(product?.description)
            setCategory(product?.category)
            setPrice(product?.price)
            setOfferPrice(product?.offer_price)
            setStock(product?.stock)
            setMinStock(product?.min_stock)
            setImage1(product?.image1)
            setImage2(product?.image2)
            setImage3(product?.image3)
            setImage4(product?.image4)
            setRelatedProducts(product?.related_products)
        } else {
            setImage1("")
            setImage2("")
            setImage3("")
            setImage4("")
            setName('')
            setDescription('')
            setCategory('')
            setPrice(0)
            setOfferPrice(0)
            setStock(0)
            setMinStock(0)
            setRelatedProducts([])
        }
    }, [product, create])


    const [loading, setLoading] = useState(false)

    const handleSaveProduct = async () => {
        setLoading(true)
        const data = {
            image1,
            image2,
            image3,
            image4,
            name,
            description,
            category,
            price,
            offer_price,
            stock,
            min_stock,
            "related_products_data": String(related_products),
        }
        if (!name || !description || !category || !price || !stock) {
            alert('املى الخانات المعلمة بالنجوم')
        } else {
            await productsContext?.createProduct(data).then((e) => {
                onClose()
            })
        }
        setLoading(false)
    }


    const handleUpdateProduct = async () => {
        setLoading(true)
        const data = {
            name,
            description,
            category,
            price,
            offer_price,
            stock,
            min_stock,
            "related_products_data": String(related_products),
        }

        if (typeof image1 === 'object') {
            data.image1 = image1
        }
        if (typeof image2 === 'object') {
            data.image2 = image2
        }
        if (typeof image3 === 'object') {
            data.image3 = image3
        }
        if (typeof image4 === 'object') {
            data.image4 = image4
        }

        if (!name || !description || !category || !price || !stock) {
            alert('املى الخانات المعلمة بالنجوم')
        } else {
            await productsContext?.updateProduct(product?.id, data, onClose).then((e) => {
                if (e?.id) {
                    // setImages(e?.images)
                    setImage1(e?.image1)
                    setImage2(e?.image2)
                    setImage3(e?.image3)
                    setImage4(e?.image4)
                    setName(e?.name)
                    setDescription(e?.description)
                    setCategory(e?.category)
                    setPrice(e?.price)
                    setOfferPrice(e?.offer_price)
                    setStock(e?.stock)
                    setMinStock(e?.min_stock)
                    setRelatedProducts(e?.related_products)
                }
            })
        }
        setLoading(false)
    }




    const products = productsContext?.products

    useEffect(() => {
        productsContext?.fetchProducts()
    }, [])


    return (
        <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className='font h-full max-h-[500px] overflow-y-scroll'>
                <ModalHeader className='text-lime-700'>
                    {
                        create ? 'أضافة منتج جديد' : 'تعديل منتج'
                    }
                </ModalHeader>
                <ModalBody className='flex flex-col gap-7'>
                    <div className='flex flex-col gap-3'>
                        <strong>تفاصيل اساسية</strong>
                        <div className='flex flex-col gap-2'>
                            {/* images */}
                            <div className='w-full p-1 overflow-x-scroll flex gap-5 items-center max-w-full'>
                                <button
                                    className='p-2 relative min-w-[100px] h-[100px] bg-gray-300 transition-all hover:bg-gray-200 active:bg-gray-300 flex flex-col items-center justify-center'
                                >
                                    <input type="file" className='w-full opacity-0 absolute h-full left-0 top-0'
                                        onChange={(e) => {
                                            if (!image1) {
                                                setImage1(e.target.files[0])
                                            }
                                            else if (!image2) {
                                                setImage2(e.target.files[0])
                                            }
                                            else if (!image3) {
                                                setImage3(e.target.files[0])
                                            }
                                            else if (!image4) {
                                                setImage4(e.target.files[0])
                                            }
                                        }}
                                    />
                                    <PiPlus />
                                </button>
                                {typeof image1 == 'string' && image1 ? (
                                    <div className='min-w-[100px] relative w-[100px] h-[100px]' >
                                        <img src={server + image1} alt="" />
                                        <CiTrash className='absolute left-1 top-1 text-red-500 cursor-pointer' onClick={() => setImage1("")} />
                                    </div>
                                ) : null}
                                {typeof image1 == 'object' && image1 ? (
                                    <div className='min-w-[100px] relative w-[100px] h-[100px]' >
                                        <img src={URL.createObjectURL(image1)} alt="" />
                                        <CiTrash className='absolute left-1 top-1 text-red-500 cursor-pointer' onClick={() => setImage1("")} />
                                    </div>
                                ) : null}

                                {typeof image2 == 'string' && image2 ? (
                                    <div className='min-w-[100px] relative w-[100px] h-[100px]' >
                                        <img src={server + image2} alt="" />
                                        <CiTrash className='absolute left-1 top-1 text-red-500 cursor-pointer' onClick={() => setImage1("")} />
                                    </div>
                                ) : null}
                                {typeof image2 == 'object' && image2 ? (
                                    <div className='min-w-[100px] relative w-[100px] h-[100px]' >
                                        <img src={URL.createObjectURL(image2)} alt="" />
                                        <CiTrash className='absolute left-1 top-1 text-red-500 cursor-pointer' onClick={() => setImage1("")} />
                                    </div>
                                ) : null}

                                {typeof image3 == 'string' && image3 ? (
                                    <div className='min-w-[100px] relative w-[100px] h-[100px]' >
                                        <img src={server + image3} alt="" />
                                        <CiTrash className='absolute left-1 top-1 text-red-500 cursor-pointer' onClick={() => setImage1("")} />
                                    </div>
                                ) : null}
                                {typeof image3 == 'object' && image3 ? (
                                    <div className='min-w-[100px] relative w-[100px] h-[100px]' >
                                        <img src={URL.createObjectURL(image3)} alt="" />
                                        <CiTrash className='absolute left-1 top-1 text-red-500 cursor-pointer' onClick={() => setImage1("")} />
                                    </div>
                                ) : null}

                                {typeof image4 == 'string' && image4 ? (
                                    <div className='min-w-[100px] relative w-[100px] h-[100px]' >
                                        <img src={server + image4} alt="" />
                                        <CiTrash className='absolute left-1 top-1 text-red-500 cursor-pointer' onClick={() => setImage1("")} />
                                    </div>
                                ) : null}
                                {typeof image4 == 'object' && image4 ? (
                                    <div className='min-w-[100px] relative w-[100px] h-[100px]' >
                                        <img src={URL.createObjectURL(image4)} alt="" />
                                        <CiTrash className='absolute left-1 top-1 text-red-500 cursor-pointer' onClick={() => setImage1("")} />
                                    </div>
                                ) : null}
                            </div>
                            {/* name - category */}
                            <div className='flex gap-5 items-center flex-row'>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type='text'
                                    placeholder='الاسم *'
                                    className='w-full'
                                    sx={{
                                        backgroundColor: "white"
                                    }}
                                />
                                <Select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    style={{
                                        appearance: 'none', // Hides the default arrow
                                    }}
                                    sx={{
                                        '&::-ms-expand': {
                                            display: 'none', // Hides the arrow for Internet Explorer
                                        },
                                        backgroundColor: "white"
                                    }}
                                    className='dropdown-container' placeholder='أختر النوع *'>
                                    {
                                        categories?.map((category, index) => (
                                            <option key={index} value={category?.id}>{category?.name}</option>
                                        ))
                                    }
                                </Select>
                            </div>
                            {/* description */}
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='w-full'
                                placeholder='وصف المنتج *'
                                sx={{
                                    backgroundColor: "white"
                                }}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <strong>التسعير</strong>
                        <div className='flex gap-5'>
                            <Input
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                type='text'
                                placeholder='السعر *'
                                className='w-full'
                                sx={{
                                    backgroundColor: "white"
                                }}
                            />
                            <Input
                                value={offer_price}
                                onChange={(e) => setOfferPrice(e.target.value)}
                                type='text'
                                placeholder='سعر العرض (أختياري)'
                                className='w-full'
                                sx={{
                                    backgroundColor: "white"
                                }}
                            />
                        </div>
                    </div>


                    <div className='flex flex-col gap-3'>
                        <strong>المخزن</strong>
                        <div className='flex gap-5'>
                            <Input
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                type='number'
                                placeholder='المخزن *'
                                className='w-full'
                                sx={{
                                    backgroundColor: "white"
                                }}
                            />
                            <Input
                                value={min_stock}
                                onChange={(e) => setMinStock(e.target.value)}
                                type='number'
                                placeholder='الحد الأدنى من المخزن'
                                className='w-full'
                                sx={{
                                    backgroundColor: "white"
                                }}
                            />
                        </div>
                    </div>



                    <Flex direction={"column"} gap="5">
                        <strong>منتجات متعلقة بالمنتج</strong>
                        <Flex className='h-[150px] p-3 overflow-y-scroll bg-gray-200 rounded-md' gap="3" direction={"column"}>
                            {products?.map((product, index) => (
                                <Box shadow={"md"} p={"3"} className='relative p-2 bg-white'>
                                    <Flex gap={"3"} alignItems={"center"}>
                                        <input
                                            onChange={() => {
                                                if (related_products?.includes(product?.id)) {
                                                    setRelatedProducts(related_products?.filter(item => item !== product?.id))
                                                } else {
                                                    setRelatedProducts([...related_products, product?.id])
                                                }
                                            }}
                                            checked={related_products?.includes(product?.id)}
                                            type="checkbox" />
                                        <img className='w-[50px]' src={server + product?.image1} alt={product?.name} />
                                        <strong>{product?.name}</strong>
                                    </Flex>
                                </Box>
                            ))}
                        </Flex>
                    </Flex>



                    <Button
                        onClick={() => {
                            if (create) {
                                handleSaveProduct()
                            } else {
                                handleUpdateProduct()
                            }
                        }}
                        className='w-fit'
                        colorScheme='green'
                        isLoading={loading}
                        disabled={loading}
                    >
                        حفظ
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default UpdateOrCreateProduct
