import React, { useContext, useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { userProfile, userProfileOrdersCancelled, userProfileOrdersDeliverd } from '../../Variables/pathes';
import { BiEdit } from 'react-icons/bi';
import { UsersContextProvider } from '../../Contexts/UsersContext';
import { AuthContextProvider } from '../../Contexts/AuthContext';
import { useToast } from '@chakra-ui/react';
import Navbar from '../Navbar/Navbar';

const UserProfileLayout = ({ children }) => {
    const itemsArr = [
        {
            id: 1,
            text: "اخر طلباتك",
            pathname: userProfile()
        },
        {
            id: 2,
            text: "الطلبات التي وسلت",
            pathname: userProfileOrdersDeliverd()
        },
        {
            id: 3,
            text: "الطلبات الملغية",
            pathname: userProfileOrdersCancelled()
        },
    ]

    const toast = useToast()

    const authContext = useContext(AuthContextProvider)

    const user = authContext?.user


    // handle user updates
    const [first_name, setFirst_name] = React.useState(user?.first_name)
    const [last_name, setLast_name] = React.useState(user?.last_name)
    const [profile_picture, setProfile_picture] = React.useState(user?.profile_picture || "https://i.pinimg.com/736x/99/da/2e/99da2eabe8d81779e9aa4a0dc39739be.jpg")

    useEffect(() => {
        setFirst_name(user?.first_name)
        setLast_name(user?.last_name)
        setProfile_picture(user?.profile_picture || 'https://i.pinimg.com/736x/99/da/2e/99da2eabe8d81779e9aa4a0dc39739be.jpg')
    }, [user])


    const userContext = useContext(UsersContextProvider)

    const handleUpdateUser = () => {
        userContext.updateUser(user.id, { first_name, last_name, profile_picture }).then(() => {
            authContext.getUser()
            toast({
                title: 'تم التعديل بنجاح',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        })
    }


    return (
        <>
            <Navbar profile={true} />
            <div className='relative bg-[#F3F3F3] text-gray-700 min-h-screen py-14 flex flex-col justify-center'>
                <img src="/logo.png" alt="" className='absolute left-4 top-3 w-[70px] z-10' />

                <div className='p-3 bg-white shadow-md w-full max-w-[1000px] mx-auto rounded-xl flex flex-col'>
                    <div className='flex items-center justify-center -mt-10 flex-col'>
                        <div className='relative'>
                            <img src={profile_picture} alt='' className='rounded-full w-[130px] h-[130px]' />
                            <input type="file" id="profile_picture" className='hidden' onChange={(e) => setProfile_picture(URL.createObjectURL(e.target.files[0]))} />
                            <label htmlFor="profile_picture">
                                <BiEdit className='absolute bottom-0 left-5 text-white p-0.5 bg-blue-600 rounded-full cursor-pointer' size={20} />
                            </label>
                        </div>
                        {/* edit section */}
                        <div className='flex mt-4 items-center gap-8'>
                            <p>@{user?.username}</p>
                            <p>{user?.email}</p>
                        </div>
                        <div className='flex flex-col gap-3 p-2 px-5 bg-[#EAEAEA] w-full rounded-xl'>
                            <div className='flex gap-4 items-center'>
                                <div className='flex flex-col w-full'>
                                    <p>الأسم الأول</p>
                                    <input value={first_name} onChange={(e) => setFirst_name(e.target.value)} type="text" className='p-1 px-2 rounded-md' />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <p>الأسم الثاني</p>
                                    <input value={last_name} onChange={(e) => setLast_name(e.target.value)} type="text" className='p-1 px-2 rounded-md' />
                                </div>
                            </div>
                            <button onClick={handleUpdateUser} className='p-1.5 rounded-md w-fit px-5 bg-[#69B7FF] text-white'>
                                تـــعديل
                            </button>
                        </div>

                        <Swiper
                            spaceBetween={50}
                            slidesPerView={"auto"}
                            className='w-full mt-3'
                        >
                            {itemsArr.map(item => (
                                <SwiperSlide key={item.id} className='mx-5 text-nowrap w-[100px] max-w-[100px]'>
                                    <Link to={item?.id == 1 ? userProfile() : item?.id == 2 ? userProfileOrdersDeliverd() : item?.id == 3 ? userProfileOrdersCancelled() : null}>
                                        <p>{item.text}</p>
                                        <div className={`
                                ${window.location.pathname == item?.pathname ? "bg-green-500" : "bg-gray-300"} h-[1px] w-[calc(100%+15px)]
                                `} />
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                    {children}
                </div>
            </div>
        </>
    )
}

export default UserProfileLayout
