import React from 'react'
import { Box, Button, Input, FormControl, FormLabel, Heading, Text, VStack, Flex } from '@chakra-ui/react';
import { AuthContextProvider } from '../../../Contexts/AuthContext';
import { adminLoginPage } from '../../../Variables/pathes';
import { Link } from 'react-router-dom';

const AdminRegister = () => {
    const authContext = React.useContext(AuthContextProvider)

    const [username, setUsername] = React.useState('')
    const [first_name, setFirstName] = React.useState('')
    const [last_name, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    const [loading, setLoading] = React.useState(false)


    const handleRegister = async () => {
        if (!username || !first_name || !last_name || !email || !password) {
            alert('يجب عليك ملء جميع الحقول')
        } else {
            setLoading(true)

            const data = {
                username, first_name, last_name, email, password
            }

            await authContext?.register({ data })

            setLoading(false)
        }
    }

    return (
        <div className="flex items-center p-2 justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <Box
                className="w-full max-w-md p-8 bg-opacity-70 bg-gray-800 rounded-lg shadow-lg"
                boxShadow="lg"
            >
                <VStack spacing={4} align="stretch">
                    <Heading
                        className="text-center text-3xl text-white font-bold"
                        size="lg"
                    >
                        اسم الشركة
                    </Heading>
                    <Text className="text-center text-gray-400">
                        الكلام التوضيحي للشركة او ما يسمى بالslug
                    </Text>
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

                    <Flex gap={4}>
                        <FormControl id="first_name">
                            <FormLabel className="text-gray-300">اسمك الاول</FormLabel>
                            <Input
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                                type="first_name"
                                className="bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                                placeholder="اسمك الاول"
                            />
                        </FormControl>
                        <FormControl id="last_name">
                            <FormLabel className="text-gray-300"> الاخير</FormLabel>
                            <Input
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                type="last_name"
                                className="bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                                placeholder="اسمك الاخير"
                            />
                        </FormControl>
                    </Flex>

                    <FormControl id="email">
                        <FormLabel className="text-gray-300">البريد الالكتروني</FormLabel>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="bg-gray-700 text-white border-none focus:ring-2 focus:ring-blue-500"
                            placeholder="البريد الاكتروني"
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
                            لديك حساب بالفعل{" "}
                            <Link to={adminLoginPage()} className="text-blue-500 hover:underline">
                                سجل الدخول
                            </Link>
                        </Text>
                    </Flex>
                    <Button
                        className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
                        size="lg"
                        isLoading={loading}
                        onClick={handleRegister}
                    >
                        تسجيل حساب جديد
                    </Button>
                </VStack>
            </Box>
        </div>
    )
}

export default AdminRegister
