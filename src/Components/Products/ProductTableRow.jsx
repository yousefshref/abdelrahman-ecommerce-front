import { Button, Checkbox, Input } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { ProductsContextProvider } from '../../Contexts/ProductsContext'
import { CgSpinner } from 'react-icons/cg'

import UpdateOrCreateProduct from './UpdateOrCreateProduct'
import { server } from '../../Variables/pathes'

const ProductTableRow = ({ product, selectedProducts, setSelectedProducts }) => {
    const [name, setName] = React.useState(product?.name)

    const [price, setPrice] = React.useState(product?.price)
    const [offer_price, setOfferPrice] = React.useState(product?.offer_price)

    const [stock, setStock] = React.useState(product?.stock)
    const [min_stock, setMinStock] = React.useState(product?.min_stock)

    const [rank, setRank] = React.useState(product?.rank)


    useEffect(() => {
        setName(product?.name)
        setPrice(product?.price)
        setOfferPrice(product?.offer_price)
        setStock(product?.stock)
        setMinStock(product?.min_stock)
        setRank(product?.rank)
    }, [product])

    const [isUpdated, setUpdated] = React.useState(false)



    const productsContext = useContext(ProductsContextProvider);

    const loading = productsContext?.loading;

    const handleUpdateProduct = () => {
        productsContext?.updateProduct(product?.id, {
            name,
            price,
            offer_price,
            stock,
            min_stock,
            rank
        }, setUpdated)
    }


    const [open, setOpen] = React.useState(false)


    return (
        <>
            <tr className='bg-white transition-all'>
                <td className='border p-2'>
                    <Checkbox
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedProducts([...selectedProducts, product?.id])
                            } else {
                                setSelectedProducts(selectedProducts.filter((id) => id !== product?.id))
                            }
                        }
                        }
                        checked={selectedProducts.includes(product?.id)}
                    />
                </td>
                <td onClick={() => setOpen(!open)} className='border p-2 cursor-pointer hover:bg-blue-200 transition-all'>{product?.id}</td>
                <td className='border p-2'>
                    <input
                        type="number"
                        value={rank}
                        onChange={(e) => {
                            setRank(e.target.value)
                            setUpdated(true)
                        }}
                        placeholder='الترتيب'
                        className='w-full'
                    />
                </td>
                <td className='border p-2'>
                    <div className='flex gap-2 items-center'>
                        <img loading="lazy" className='w-full max-w-[40px]' src={server + product?.image1} alt="" />
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                                setUpdated(true)
                            }}
                            placeholder='اسم المنتج'
                            className='w-[900px]'
                        />
                    </div>
                </td>
                <td className='border p-2'>
                    <Input
                        type="number"
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value)
                            setUpdated(true)
                        }}
                        placeholder='السعر'
                        className='w-full'
                    />
                </td>
                <td className='border p-2'>
                    <Input
                        type="number"
                        value={offer_price}
                        onChange={(e) => {
                            setOfferPrice(e.target.value)
                            setUpdated(true)
                        }}
                        placeholder='السعر الترويجي'
                        className='w-full'
                    />
                </td>
                <td className='border p-2'>{product?.category_details?.name}</td>
                <td className='border p-2'>
                    <Input
                        type="number"
                        value={stock}
                        onChange={(e) => {
                            setStock(e.target.value)
                            setUpdated(true)
                        }}
                        placeholder='الكمية'
                        className='w-full'
                    />
                </td>
                <td className='border p-2'>
                    <Input
                        type="number"
                        value={min_stock}
                        onChange={(e) => {
                            setMinStock(e.target.value)
                            setUpdated(true)
                        }}
                        placeholder='اقل كمية'
                        className='w-full'
                    />
                </td>
                <td className='border p-2'>
                    <Button
                        colorScheme='teal'
                        className='w-full'
                        disabled={!isUpdated}
                        onClick={() => {
                            if (loading) {

                            } else {
                                handleUpdateProduct()
                            }
                        }}
                    >
                        {
                            loading ? (
                                <span className='animate-spin'>
                                    <CgSpinner />
                                </span>
                            ) : "حفظ"
                        }
                    </Button>
                </td>
            </tr>


            <UpdateOrCreateProduct isOpen={open} onClose={() => setOpen(false)} create={false} productID={open ? product?.id : null} />
        </>
    )
}

export default ProductTableRow
