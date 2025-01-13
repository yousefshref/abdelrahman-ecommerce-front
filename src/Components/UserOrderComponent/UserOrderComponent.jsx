import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { server } from '../../Variables/pathes'

const UserOrderComponent = ({ order, noOrders }) => {
    if (noOrders) {
        return (
            <div className='flex flex-col gap-2 w-[370px] max-w-[370px] p-1 bg-gray-200 rounded-xl'>
                <img src="/no-order.png" alt="" className='w-[70%] mx-auto' />
                <div className='bg-white p-2 px-4 rounded-lg mb-3 mx-3'>
                    <strong className='text-xl'>لا يوجد طلبات</strong>
                </div>
            </div>
        )
    }
    return (
        <div className='flex flex-col gap-2 w-[370px]'>
            {/* top */}
            <Swiper
                spaceBetween={10}
                slidesPerView={"auto"}
                className='w-full p-2 bg-gray-200 rounded-xl'
            >
                {
                    order?.order_items?.map((item, index) => (
                        <SwiperSlide
                            key={index}
                            className='w-[100px]'
                        >
                            <img className='w-fit' src={`${server}${item?.product_details?.image1}`} alt="" />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {/* bottom */}
            <div className='flex flex-col gap-2'>
                {/* status and tracking code */}
                <div className='grid grid-cols-2 gap-2 justify-between'>
                    <div className='flex gap-2 items-center'>
                        <p>الحالة:</p>
                        <strong>{order?.status}</strong>
                    </div>
                    <div className='flex gap-2 items-center justify-end'>
                        <p>كود تتبع الطلب:</p>
                        <strong>{order?.tracking_code ? order?.tracking_code : "لا يوجد"}</strong>
                    </div>
                </div>
                {/* order information */}
                <div className='flex flex-col rounded-xl p-2 bg-gray-200'>
                    <div className='flex gap-2 items-center'>
                        <p>الاسم:</p>
                        <strong>{order?.name}</strong>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p>رقم الهاتف:</p>
                        <strong>{order?.phone_number}</strong>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p>البريد الالكتروني:</p>
                        <strong>{order?.email}</strong>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p>المحافظة:</p>
                        <strong>{order?.state_details?.name}</strong>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <p>العنوان:</p>
                        <strong>{order?.address}</strong>
                    </div>
                </div>
                {/* total order price */}
                <div className='flex gap-1 items-center'>
                    <p>المجموع:</p>
                    <strong className='text-green-700'>{order?.total}</strong>
                    <span>جنيه</span>
                </div>
            </div>
        </div>
    )
}

export default UserOrderComponent
