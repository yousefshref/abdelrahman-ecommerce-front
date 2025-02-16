import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { AuthContextProvider } from '../../Contexts/AuthContext'
import { Link } from 'react-router-dom'
import { signUpPagePath } from '../../Variables/pathes'

const Login = () => {
    const authContext = React.useContext(AuthContextProvider)

    const [username, setUserName] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <div className='mx-auto h-screen'>
            <div className='grid md:grid-cols-2 gap-4 items-center h-[100%]'>
                {/* right */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        authContext.login({ username, password })
                    }}
                    className='h-full p-7 flex flex-col md:justify-around justify-center md:gap-0 gap-14 items-center'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-4xl font-bold'><span className='text-green-500'>مرحبــــا</span> بك مجددا</h1>
                        <p className='text-gray-500'>
                            ولاني عايزك دايما في السيف زوون ف خليت كل حاجه عندك في متجر واحد مضمون خاص بيك وجوا الزوون بتاعتك.
                        </p>
                    </div>

                    <div className='flex flex-col gap-5 w-full'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-gray-500'>اسم المستخدم او البريد الالكتروني</p>
                            <input value={username} onChange={(e) => setUserName(e.target.value)} type='text' className='border w-full border-gray-300 p-2 rounded-md' placeholder='Ex. youremail@gmail.com' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-gray-500'>كلمة المرور</p>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' className='border w-full border-gray-300 p-2 rounded-md' placeholder='' />
                        </div>
                        <div className='flex gap-2 justify-between'>
                            <p className='text-gray-500'>ليس لديك حساب؟ <Link to={signUpPagePath()} className='text-green-500 cursor-pointer'>انشاء حساب جديد</Link></p>
                            <p className='text-gray-500'>نسيت كلمة المرور؟</p>
                        </div>
                        <button className='bg-green-500 text-white w-full p-2 rounded-md py-3'>
                            تسجيل الدخول
                        </button>
                    </div>


                    <div className='flex flex-col gap-2 w-full'>
                        <p className='text-gray-500'>او يمكنك استخدام طرق اخرى</p>
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                authContext.googleLogin(credentialResponse.credential)
                            }}
                            onError={() => {
                                console.log('error')
                            }}
                        />
                    </div>
                </form>

                {/* left */}
                <div
                    style={{
                        backgroundImage: 'url("/login.PNG")',
                    }}
                    className='bg-cover bg-center h-full md:block hidden'
                >
                </div>
            </div>
        </div >
    )
}

export default Login
