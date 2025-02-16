import React, { useContext } from 'react'
import UserProfileLayout from '../../Components/UserProfileLayout/UserProfileLayout'
import { OrderContextProvider } from '../../Contexts/OrderContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import UserOrderComponent from '../../Components/UserOrderComponent/UserOrderComponent'

const UserProfileOrdersDeliverd = () => {
    const orderContext = useContext(OrderContextProvider)

    const deliverdOrders = orderContext?.deliverdOrders
    const loadingDeliverdOrders = orderContext?.loadingDeliverdOrders

    return (
        <UserProfileLayout>
            <div className='my-3' />
            <Swiper
                spaceBetween={50}
                slidesPerView={"auto"}
                className='w-full mt-3'
            >
                {
                    deliverdOrders?.length > 0 && !loadingDeliverdOrders ? deliverdOrders?.map(order => (
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

export default UserProfileOrdersDeliverd
