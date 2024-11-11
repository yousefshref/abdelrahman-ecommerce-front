import React, { useContext, useEffect } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { AuthContextProvider } from '../../../Contexts/AuthContext'
import { UsersContextProvider } from '../../../Contexts/UsersContext'
import { useToast } from '@chakra-ui/react'
import StatesSettings from '../../../Components/AdminSettings/StatesSettings/StatesSettings'

const AdminSettings = () => {
    const userContext = useContext(UsersContextProvider)
    const authContext = useContext(AuthContextProvider)

    const user = authContext?.user

    useEffect(() => {
        authContext?.getUser()
    }, [])

    const [username, setUsername] = React.useState(user?.username)
    useEffect(() => {
        setUsername(user?.username)
    }, [user])

    const handleUpdateUser = async () => {
        await userContext?.updateUser(user?.id, { username }).then(() => authContext?.getUser())
    }


    const toast = useToast()


    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const handleUpdateUserPassword = async () => {
        if (password !== confirmPassword) {
            toast({
                title: 'كلمة المرور غير متطابقة',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        } else {
            await userContext?.updateUserPassword(user?.id, { password }).then(() => authContext?.getUser())
        }
    }
    return (
        <AdminLayout>
            <div className='flex gap-5 md:flex-row flex-col'>
                <div className='p-2 bg-white h-fit shadow-md flex flex-col gap-2 w-full md:w-1/2'>
                    <strong>تغيير اسم المستخدم</strong>
                    <div className='flex flex-col'>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className='p-2 border outline-none border-green-500' placeholder='اسم المستخدم...' />
                        <button onClick={handleUpdateUser} className='p-2 bg-green-500 text-white w-fit mt-2 px-5'>تغيير</button>
                    </div>
                </div>
                <div className='p-2 bg-white shadow-md flex flex-col gap-2 w-full md:w-1/2'>
                    <strong>تغيير كلمة المرور</strong>
                    <div className='flex flex-col gap-3'>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className='p-2 border outline-none border-green-500' placeholder='كلمة المرور...' />
                        <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="text" className='p-2 border outline-none border-green-500' placeholder='تأكيد كلمة المرور...' />
                        <button onClick={handleUpdateUserPassword} className='p-2 bg-green-500 text-white w-fit mt-2 px-5'>تغيير</button>
                    </div>
                </div>
            </div>

            <StatesSettings />
        </AdminLayout>
    )
}

export default AdminSettings
