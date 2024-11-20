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
        <div className="flex items-center p-2 justify-center min-h-screen bg-gradient-to-br from-black/40 to-black">
            <Box
                className="w-full max-w-md p-8 bg-opacity-70 bg-green-800/40 backdrop-blur-sm rounded-lg shadow-lg z-20"
                boxShadow="lg"
            >
                <VStack spacing={4} align="stretch">
                    <Heading
                        className="text-center text-3xl text-white font-bold flex gap-2 items-center justify-center"
                        size="lg"
                    >
                        <p>Safe Zone</p>
                        <img loading="lazy" src="/logo.png" className='w-[70px]' alt="" />
                    </Heading>
                    <FormControl id="username">
                        <FormLabel className="text-gray-300">اسم الحساب</FormLabel>
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="username"
                            className="bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                            placeholder="ادخل اسم حساب الادمن"
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel className="text-gray-300">كلمة المرور</FormLabel>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </FormControl>
                    <Flex>
                        <Text className="text-gray-400">
                            ليس لديك حساب؟{" "}
                            <Link to={adminRegisterPage()} className="text-blue-500 hover:underline">
                                سجل هنا
                            </Link>
                        </Text>
                    </Flex>
                    <Button
                        className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
                        size="lg"
                        onClick={() => {
                            if (loading) {

                            } else {
                                handleLogin()
                            }
                        }}
                    >
                        {
                            loading ? ("جار التسجيل...") : "تسجيل الدخول"
                        }
                    </Button>
                </VStack>
            </Box>
        </div>
    );
};

export default AdminLogin;
