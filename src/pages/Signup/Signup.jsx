import { GoogleLogin } from '@react-oauth/google'
import React from 'react'
import { AuthContextProvider } from '../../Contexts/AuthContext'
import { Link } from 'react-router-dom'
import { loginPagePath } from '../../Variables/pathes'

const Signup = () => {
    const authContext = React.useContext(AuthContextProvider)

    const [username, setUserName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [first_name, setFirstName] = React.useState('')
    const [last_name, setLastName] = React.useState('')
    const [password, setPassword] = React.useState('')

    return (
        <div className='mx-auto h-screen'>
            <div className='grid md:grid-cols-2 gap-4 items-center h-[100%]'>
                {/* right */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        authContext.register({ data: { username, email, first_name, last_name, password } })
                    }}
                    className='h-full p-7 flex flex-col md:justify-around justify-center md:gap-0 gap-14 items-center'>
                    <div className='flex gap-2 items-center mb-3'>
                        <h1 className='text-3xl'>Safe <span className='text-green-500'>Zone</span></h1>
                        <img src="/logo.png" alt="safe zone" className='w-20' />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex gap-4'>
                            <div className='flex flex-col gap-2 w-full'>
                                <p className='text-gray-500'>الاسم الاول</p>
                                <input value={first_name} onChange={(e) => setFirstName(e.target.value)} type='text' className='border w-full border-gray-300 p-2 rounded-md' placeholder='Ex. youssef' />
                            </div>
                            <div className='flex flex-col gap-2 w-full'>
                                <p className='text-gray-500'>الاسم الثاني</p>
                                <input value={last_name} onChange={(e) => setLastName(e.target.value)} type='text' className='border w-full border-gray-300 p-2 rounded-md' placeholder='Ex. shreef' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-gray-500'>اسم المستخدم</p>
                            <input value={username} onChange={(e) => setUserName(e.target.value)} type='text' className='border w-full border-gray-300 p-2 rounded-md' placeholder='Ex. youssef_shreef_' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-gray-500'>البريد الالكتروني</p>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' className='border w-full border-gray-300 p-2 rounded-md' placeholder='Ex. youremai@email.com' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-gray-500'>كلمة المرور</p>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' className='border w-full border-gray-300 p-2 rounded-md' placeholder='' />
                        </div>
                        <div className='flex gap-2 justify-between'>
                            <p className='text-gray-500'>هل لديم حساب بالفعل <Link to={loginPagePath()} className='text-green-500 cursor-pointer'>تسجيل الدخول</Link></p>
                        </div>
                        <button className='bg-green-500 text-white w-full p-2 rounded-md py-3'>
                            انشاء الحساب
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
                        backgroundImage: 'url("/signup.PNG")',
                    }}
                    className='bg-cover bg-center h-full md:block hidden'
                >
                </div>
            </div>
        </div >
    )
}

export default Signup
