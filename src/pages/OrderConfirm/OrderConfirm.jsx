import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Button } from '@chakra-ui/react'

const OrderConfirm = () => {
    return (
        <div className='bg-gray-100'>
            <div className='h-[60px]'>
                <Navbar classes="md:p-4" />
            </div>
            <div className='p-3 h-[calc(100vh-60px)] flex flex-col justify-center items-center'>
                <div className='flex flex-col gap-3 justify-center items-center w-full max-w-xl text-center'>
                    <h1 className='text-4xl font-bold text-green-500'>تم تأكيد طلبك بنجاح</h1>
                    <img src="/done.png" className='w-[150px] mt-5' />
                    <p className='mt-8'>تم تأكيد الطلب على المنتجات وسيتم توصيلهم في اسرع وقت, وسيتم ارسال لك رمز على البريد الالكتروني لتتبع الشحنة (في حالة كتابه البريد الالكتروني)</p>
                    <div className='flex gap-3 items-center'>
                        <Button colorScheme='teal' variant={"outline"}>
                            تتبع الشحنة
                        </Button>
                        <Button colorScheme='green' variant={"solid"}>
                            اكمل التسوق
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirm
