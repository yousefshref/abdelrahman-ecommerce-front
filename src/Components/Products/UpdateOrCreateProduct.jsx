import React, { useContext, useEffect, useState } from 'react'

import { Modal, ModalBody, ModalContent, Input, Button, Select, ModalHeader, ModalOverlay, Textarea } from '@chakra-ui/react'

import { PiPlus } from 'react-icons/pi'
import { CategoryContextProvider } from '../../Contexts/CategoryContext'
import { ProductsContextProvider } from '../../Contexts/ProductsContext'
import { CiTrash } from 'react-icons/ci'


const UpdateOrCreateProduct = ({ isOpen, onClose, create, productID }) => {


    const [images, setImages] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [offer_price, setOfferPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [min_stock, setMinStock] = useState(0)



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
            setImages(product?.images)
        } else {
            setImages([])
            setName('')
            setDescription('')
            setCategory('')
            setPrice(0)
            setOfferPrice(0)
            setStock(0)
            setMinStock(0)
        }
    }, [product, create])


    const handleSaveProduct = () => {
        const data = {
            name,
            description,
            category,
            price,
            offer_price,
            stock,
            min_stock,
            images
        }

        if (!name || !description || !category || !price || !stock) {
            alert('املى الخانات المعلمة بالنجوم')
        } else {
            productsContext?.createProduct(data).then((e) => {
                onClose()
            })
        }
    }


    const handleUpdateProduct = () => {
        const data = {
            name,
            description,
            category,
            price,
            offer_price,
            stock,
            min_stock,
            images
        }

        if (!name || !description || !category || !price || !stock) {
            alert('املى الخانات المعلمة بالنجوم')
        } else {
            productsContext?.updateProduct(product?.id, data, onClose).then((e) => {
                if (e?.id) {
                    setImages(e?.images)
                    setName(e?.name)
                    setDescription(e?.description)
                    setCategory(e?.category)
                    setPrice(e?.price)
                    setOfferPrice(e?.offer_price)
                    setStock(e?.stock)
                    setMinStock(e?.min_stock)
                }
            })
        }
    }

    // update the field after updating the product
    return (
        <Modal size={"xl"} isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className='font h-full max-h-[500px] overflow-y-scroll'>
                <ModalHeader className='text-lime-700'>أضافة منتج جديد</ModalHeader>
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
                                            const input = e.target.parentNode.querySelector('input');
                                            const file = input.files[0];
                                            const reader = new FileReader();
                                            reader.onload = (e) => {
                                                setImages([...images, e.target.result]);
                                            };
                                            reader.readAsDataURL(file);
                                        }}
                                    />
                                    <PiPlus />
                                </button>
                                {images?.map((image, index) => (
                                    <div className='min-w-[100px] relative w-[100px] h-[100px]' key={index} >
                                        <img src={image} alt="" />
                                        <CiTrash className='absolute left-1 top-1 text-red-500 cursor-pointer' onClick={() => setImages(images.filter((img, i) => i !== index))} />
                                    </div>
                                ))}
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
                    >
                        حفظ
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default UpdateOrCreateProduct
