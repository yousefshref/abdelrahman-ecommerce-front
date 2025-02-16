import React, { useContext, useEffect } from 'react'
import UserProfileLayout from '../../Components/UserProfileLayout/UserProfileLayout'
import { OrderContextProvider } from '../../Contexts/OrderContext'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { server } from '../../Variables/pathes'
import UserOrderComponent from '../../Components/UserOrderComponent/UserOrderComponent'

const UserProfile = () => {
    const orderContext = useContext(OrderContextProvider)

    const latestOrders = orderContext?.latestOrders
    const loadingLatestOrders = orderContext?.loadingLatestOrders

    return (
        <UserProfileLayout>
            <div className='my-3'></div>
            <Swiper
                spaceBetween={50}
                slidesPerView={"auto"}
                className='w-full mt-3'
            >
                {
                    latestOrders?.length > 0 && !loadingLatestOrders ?
                        latestOrders?.map(order => (
                            <SwiperSlide key={order.id} className='w-fit'>
                                <UserOrderComponent order={order} />
                            </SwiperSlide>
                        )) :
                        <UserOrderComponent order={null} noOrders={true} />
                }
            </Swiper>
        </UserProfileLayout>
    )
}

export default UserProfile
