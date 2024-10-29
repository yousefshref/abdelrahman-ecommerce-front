import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'

const TrackOrders = () => {
    return (
        <div className='md:p-5 p-3'>
            <Navbar />

            <div className='mt-10'>
                <h3 className='text-4xl font-bold text-lime-500'>تتبع شحناتك من هنا</h3>
                <div className='mt-5 p-2 h-[400px] w-full bg-amber-300'></div>
                <p className='mt-5'>سيتم ارسال اليك كود تتبع شحناتك عبر البريد الالكتروني لو كنت كتبته في طلب المنتجات</p>
            </div>
        </div>
    )
}

export default TrackOrders
