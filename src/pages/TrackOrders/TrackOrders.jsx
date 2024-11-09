import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'

const TrackOrders = () => {
    return (
        <div className='md:p-5 p-3'>
            <Navbar />

            <div className='mt-10'>
                <h3 className='text-4xl font-bold text-lime-500'>تتبع شحناتك من هنا</h3>
                <iframe
                    src="https://turbo.info/%D8%AA%D8%AA%D8%A8%D8%B9-%D8%A7%D9%84%D8%B4%D8%AD%D9%86%D8%A9/"
                    width="100%"
                    height="400px"
                    style={{ border: 'none' }}
                    title="Tracking Page"
                    allowFullScreen
                />
                <p className='mt-5'>سيتم ارسال اليك كود تتبع شحناتك عبر البريد الالكتروني لو كنت كتبته في طلب المنتجات</p>
            </div>
        </div>
    )
}

export default TrackOrders
