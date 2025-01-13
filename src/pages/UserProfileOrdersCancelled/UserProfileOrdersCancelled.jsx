import React, { useContext } from 'react'
import UserProfileLayout from '../../Components/UserProfileLayout/UserProfileLayout'
import { OrderContextProvider } from '../../Contexts/OrderContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import UserOrderComponent from '../../Components/UserOrderComponent/UserOrderComponent'

const UserProfileOrdersCancelled = () => {
    const orderContext = useContext(OrderContextProvider)

    const cancelledOrders = orderContext.cancelledOrders
    const loadingCancelledOrders = orderContext.loadingCancelledOrders
    return (
        <UserProfileLayout>
            <div className='my-3' />
            <Swiper
                spaceBetween={50}
                slidesPerView={"auto"}
                className='w-full mt-3'
            >
                {cancelledOrders?.length > 0 && !loadingCancelledOrders ? cancelledOrders?.map(order => (
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

export default UserProfileOrdersCancelled
