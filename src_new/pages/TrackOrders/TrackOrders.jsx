import React, { useEffect } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { MdClose } from 'react-icons/md'
import { useSearchParams } from 'react-router-dom'

const TrackOrders = () => {
    const [open, setOpen] = React.useState(false)

    const [searchParams] = useSearchParams();
    const confirm = searchParams.get("confirm");


    useEffect(() => {
        if (confirm) {
            setOpen(true)
        }
    }, [confirm])


    return (
        <div className='md:p-5 p-3'>
            <Navbar />

            <div hidden={!open} className='fixed p-2 w-full h-full left-0 top-0 bg-black/20 flex flex-col justify-center items-center'>
                <div className='shadow-xl relative p-5 bg-white flex flex-col rounded-xl px-10'>
                    <div className='absolute top-2 right-2'>
                        <MdClose onClick={() => setOpen(false)} className='cursor-pointer text-red-500 transition-all hover:text-red-600' />
                    </div>
                    <h3 className='text-2xl font-bold text-green-500'>
                        تم اتمام طلبك بنجاح
                    </h3>
                    <p className='text-gray-600'>سيتم ارسال لك كود التتبع عبر البريد الالكتروني يمكنك من خلاله تتبع شحنتك</p>
                </div>
            </div>

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
