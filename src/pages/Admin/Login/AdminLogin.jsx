import React from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import { AuthContextProvider } from '../../../Contexts/AuthContext';
import { Link } from 'react-router-dom';
import { adminRegisterPage } from '../../../Variables/pathes';

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
    return (
        // <div className="flex items-center p-2 justify-center min-h-screen bg-gradient-to-br from-black/40 to-black">
        //     <Box
        //         className="w-full max-w-md p-8 bg-opacity-70 bg-green-800/40 backdrop-blur-sm rounded-lg shadow-lg z-20"
        //         boxShadow="lg"
        //     >
        //         <VStack spacing={4} align="stretch">
        //             <Heading
        //                 className="text-center text-3xl text-white font-bold flex gap-2 items-center justify-center"
        //                 size="lg"
        //             >
        //                 <p>Safe Zone</p>
        //                 <img loading="lazy" src="/logo.png" className='w-[70px]' alt="" />
        //             </Heading>
        //             <FormControl id="username">
        //                 <FormLabel className="text-gray-300">اسم الحساب</FormLabel>
        //                 <Input
        //                     value={username}
        //                     onChange={(e) => setUsername(e.target.value)}
        //                     type="username"
        //                     className="bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="ادخل اسم حساب الادمن"
        //                 />
        //             </FormControl>
        //             <FormControl id="password">
        //                 <FormLabel className="text-gray-300">كلمة المرور</FormLabel>
        //                 <Input
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                     type="password"
        //                     className="bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
        //                     placeholder="Enter your password"
        //                 />
        //             </FormControl>
        //             <Flex>
        //                 <Text className="text-gray-400">
        //                     ليس لديك حساب؟{" "}
        //                     <Link to={adminRegisterPage()} className="text-blue-500 hover:underline">
        //                         سجل هنا
        //                     </Link>
        //                 </Text>
        //             </Flex>
        //             <Button
        //                 className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
        //                 size="lg"
        //                 onClick={() => {
        //                     if (loading) {

        //                     } else {
        //                         handleLogin()
        //                     }
        //                 }}
        //             >
        //                 {
        //                     loading ? ("جار التسجيل...") : "تسجيل الدخول"
        //                 }
        //             </Button>
        //         </VStack>
        //     </Box>
        // </div>

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
                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault()
                    handleLogin()
                }}>
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
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition duration-300"
                        onClick={() => {
                            if (loading) {

                            } else {
                                handleLogin()
                            }
                        }}
                    >
                        تسجيل الدخول
                    </button>
                </form>
                <div className="flex justify-between items-center text-gray-300 text-sm mt-4">
                    <Text className="text-gray-200">
                        ليس لديك حساب؟{" "}
                        <Link to={adminRegisterPage()} className="text-blue-300 hover:underline">
                            سجل هنا
                        </Link>
                    </Text>
                </div>
            </div>
        </div >
    );
};

export default AdminLogin;
