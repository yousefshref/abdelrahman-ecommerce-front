import React, { useContext, useEffect } from 'react'
import { OrderContextProvider } from '../../Contexts/OrderContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CiClock2 } from 'react-icons/ci'
import { IoCopyOutline } from "react-icons/io5";


const CancelOrder = () => {

    const navigator = window.navigator

    const navigate = useNavigate()

    const orderContext = useContext(OrderContextProvider)
    // get the order first
    const [params] = useSearchParams()

    const orderID = params?.get("order_id")

    const order = orderContext?.order

    const [loading, setLoading] = React.useState(true)

    const handleGetOrder = async () => {
        setLoading(true)
        await orderContext?.getOrder(orderID)
        setLoading(false)
    }

    useEffect(() => {
        if (orderID) {
            handleGetOrder()
        }
    }, [orderID])


    // check if he really want to cancel it
    // send the info for the backend just that

    const handleCancelOrder = async () => {
        setLoading(true)
        await orderContext?.handleCancelOrder({ order_id: orderID, email: order?.email })
        setLoading(false)
    }
    return (
        <div className='md:p-5 h-screen w-screen justify-center items-center flex flex-col'>
            {loading && (
                <div className='flex flex-col gap-10'>
                    <p>يتم تحضير طلبك...</p>
                    <img loading="lazy" src="/logo.png" alt="" className='w-[140px] mx-auto mt-5 animate-bounce' />
                </div>
            )}


            <div className='grid md:grid-cols-2 md:gap-5 gap-2 items-center p-10 w-full'>
                <div className='p-5 bg-gray-200/80 rounded-xl flex flex-col gap-2 w-full max-w-xl shadow-md relative'>
                    <div className='p-1 text-xl bg-green-500 text-white items-center gap-2 absolute -top-2 -left-2 flex px-5 rounded-md shadow-lg'>
                        <p>{order?.status}</p>
                        {order?.status == 'pending' && <CiClock2 />}
                    </div>
                    <div className='p-1 flex-col items-end text-xl bg-green-200 absolute md:-top-12 -top-10 -right-8 flex px-5 rounded-md shadow-lg'>
                        <p className='text-xs text-gray-500'>.Track Code</p>
                        <div className={`${order?.tracking_code ? "flex flex-row gap-4 items-center" : ""}`}>
                            {order?.tracking_code ? (
                                <IoCopyOutline size={10} className='cursor-pointer' onClick={() => navigator.clipboard.writeText(order?.tracking_code)} />
                            ) : null}
                            <p className='md:text-balance text-sm'>{order?.tracking_code ? order?.tracking_code : "لا يوجد كود تتبع"}</p>
                        </div>
                    </div>
                    <div className='p-1 text-green-700 flex-col text-xl bg-black/15 backdrop-blur-sm absolute -bottom-4 -left-8 flex px-10 rounded-md shadow-lg'>
                        <p className='text-sm'>مجموع المبلغ</p>
                        <p>{order?.total} EGP</p>
                    </div>

                    <p>الاسم: <strong>{order?.name}</strong></p>
                    <p>الجوال: <strong>{order?.phone_number}</strong></p>
                    <p>البريد الالكتروني: <strong>{order?.email ? order?.email : "لا يوجد"}</strong></p>
                    <p>المحافظة: <strong>{order?.state_details?.name} - ({order?.state_details?.shipping_price} EGP)</strong></p>
                    <p>العنوان: <strong>{order?.address}</strong></p>
                    <p>شحن سريع: <strong>{order?.is_fast_shipping ? "نعم" : "لا"}</strong></p>
                    <p>رقم التتبع: <strong>{order?.tracking_code ? order?.tracking_code : "لا يوجد"}</strong></p>
                </div>

                <div className='flex flex-col gap-2 w-full'>
                    <strong className='text-xl'>تفاصيل الطلب</strong>

                    <table className='w-full'>
                        <thead>
                            <tr className='text-gray-700 border-b border-gray-300 bg-gray-200'>
                                <th className='p-2 text-start'>المنتج</th>
                                <th className='p-2 text-start'>الكمية</th>
                                <th className='p-2 text-start'>السعر</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.order_items?.map(item => (
                                <tr key={item.id} className='border-b border-gray-300'>
                                    <td className='p-2'>{item.product_details?.name}</td>
                                    <td className='p-2'>{item.quantity}</td>
                                    <td className='p-2'>{item?.product_details?.offer_price ? item?.product_details?.offer_price * item?.quantity : item?.product_details?.price * item?.quantity} EGP</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='flex justify-center items-center mt-5 gap-3'>
                <button onClick={loading ? null : handleCancelOrder} className='bg-red-500 text-white p-2 px-5 rounded-md'>
                    {loading ? "جاري الغاء الطلب..." : "إلغاء الطلب"}
                </button>
                <button onClick={() => {
                    if (loading) {

                    } else {
                        navigate(-1)
                    }
                }} className='border border-red-500 text-red-500 p-2 px-5 rounded-md'>الرجوع</button>
            </div>

        </div>
    )
}

export default CancelOrder
