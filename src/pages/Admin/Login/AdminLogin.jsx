import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { AuthContextProvider } from '../../../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import { adminRegisterPage } from '../../../Variables/pathes';
import { GoogleLogin } from '@react-oauth/google';

const AdminLogin = () => {
    const authContext = React.useContext(AuthContextProvider)

    const loading = authContext?.loading

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleLogin = () => {
        const data = {
            username, password
        }
        authContext?.login(data)
    }

    const handleGoogleLogin = () => {
        authContext?.googleLogin()
    }
    return (
        <div className="min-h-screen relative bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: "url('/Safe Zone.png')" }}>
            <div className='absolute top-0 left-0 w-full h-full bg-black opacity-50' />
            <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-sm">
                {/* <h1 className="text-4xl text-white font-semibold text-center mb-4">Safe Zone</h1> */}
                <Heading
                    className="text-center text-3xl text-white font-bold flex gap-2 items-center justify-center"
                    size="lg"
                >
                    <p>Safe Zone</p>
                    {/* <img loading="lazy" src="/logo.png" className='w-[70px]' alt="" /> */}
                </Heading>
                <p className="text-gray-300 text-center mb-6 mt-3">
                    سجل الدخول لمنصة safe zone لاستكمال عملك
                </p>
                <div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
                            البريد الالكتروني
                        </label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
                            كلمة المرور
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition duration-300"
                        onClick={(e) => {
                            if (loading) {

                            } else {
                                e.preventDefault()
                                handleLogin()
                            }
                        }}
                    >
                        تسجيل الدخول
                    </button>
                </div>
                <div className="flex justify-between items-center text-gray-300 text-sm mt-4">
                    <Text className="text-gray-200">
                        ليس لديك حساب؟{" "}
                        <Link to={adminRegisterPage()} className="text-blue-300 hover:underline">
                            سجل هنا
                        </Link>
                    </Text>
                </div>
                <div className='flex flex-col mt-4 text-center text-white'>
                    <p>او قم بالستجيل بطرق اخرى</p>

                    <div className='my-0.5' />

                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            authContext?.googleLogin(credentialResponse.credential)
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        width={"300"}
                    />

                </div>
            </div>
        </div >
    );
};

export default AdminLogin;
