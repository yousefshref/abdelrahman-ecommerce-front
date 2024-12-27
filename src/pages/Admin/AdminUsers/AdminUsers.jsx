import React, { useContext, useEffect } from 'react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { UsersContextProvider } from '../../../Contexts/UsersContext'
import UserTableRow from '../../../Components/Users/UserTableRow'
import { Box, Button, Flex, Input } from '@chakra-ui/react'

import Loading from '../../../Components/Loading/Loading'

const AdminUsers = () => {
    const usersContext = useContext(UsersContextProvider)

    const users = usersContext?.users

    const usersLoading = usersContext?.loading


    if (usersLoading) {
        return <Loading />
    }
    return (
        <AdminLayout>

            <Box className='mb-10'>
                <Flex gap={4} className='flex md:flex-row flex-col'>
                    <Input
                        placeholder="بحث بالأسم او البريد او الID"
                        sx={{
                            backgroundColor: "white",
                        }}
                        size={"sm"}
                        className="w-full"
                    />
                    <Button
                        colorScheme="green"
                        size={"sm"}
                        className="flex-shrink-0"
                    >
                        ابحث
                    </Button>
                </Flex>
            </Box>


            <div className='w-full max-w-full overflow-x-scroll'>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-start text-nowrap bg-lime-200">ID</th>
                            <th className="px-4 py-2 text-start text-nowrap bg-lime-200">اليوزرنيم</th>
                            <th className="px-4 py-2 text-start text-nowrap bg-lime-200">الاسم</th>
                            <th className="px-4 py-2 text-start text-nowrap bg-lime-200">البريد الالكتروني</th>
                            <th className="px-4 py-2 text-start text-nowrap bg-lime-200 w-[150px]">هل سيلز</th>
                            <th className="px-4 py-2 text-start text-nowrap bg-lime-200">كوميشن</th>
                            <th className="px-4 py-2 text-start text-nowrap bg-lime-200">ارسال بريد بالأداء</th>
                            <th className="px-4 py-2 text-start text-nowrap bg-lime-200"></th>
                            <th className="px-4 py-2 text-start text-nowrap bg-lime-200"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => (
                            <UserTableRow key={user?.id} user={user} />
                        ))}
                    </tbody>
                </table>
            </div>


        </AdminLayout>
    )
}

export default AdminUsers
