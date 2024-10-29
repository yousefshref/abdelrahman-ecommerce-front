import { Button, Input } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'
import { UsersContextProvider } from '../../Contexts/UsersContext'

const UserTableRow = ({ user }) => {
    const [is_shipping_employee, setIs_shipping_employee] = React.useState(user?.is_shipping_employee)
    const [commission, setCommission] = React.useState(user?.commission)

    useEffect(() => {
        setIs_shipping_employee(user?.is_shipping_employee)
        setCommission(user?.commission)
    }, [user])


    const [isUpdate, setIsUpdate] = React.useState(false)


    const usersContext = useContext(UsersContextProvider)

    const [loading, setLoading] = React.useState(false)

    const handleUpdateUser = async () => {
        setLoading(true)
        const data = {
            is_shipping_employee,
            commission
        }

        await usersContext?.updateUser(user.id, data)

        setLoading(false)
        setIsUpdate(false)
    }

    return (
        <>
            <tr className='bg-white'>
                <td className="border px-4 py-2 text-nowrap">{user.id}</td>
                <td className="border px-4 py-2 text-nowrap">{user.username}</td>
                <td className="border px-4 py-2 text-nowrap">{user.first_name} {" - "} {user.last_name}</td>
                <td className="border px-4 py-2 text-nowrap">{user.email ? user.email : <span className='text-red-500'>لا يوجد</span>}</td>
                <td className="border px-4 py-2 text-nowrap">
                    <select
                        value={is_shipping_employee}
                        onChange={(e) => {
                            setIsUpdate(true)
                            setIs_shipping_employee(e.target.value)
                        }}
                        className='w-full'
                    >
                        <option value={true}>نعم</option>
                        <option value={false}>لا</option>
                    </select>
                </td>
                <td className="border px-4 py-2 text-nowrap">
                    <Input
                        value={commission} onChange={(e) => {
                            setIsUpdate(true)
                            setCommission(e.target.value)
                        }}
                        className='w-full'
                        size="sm"
                        type="number"
                    />
                </td>
                <td className="border px-4 py-2 text-nowrap">
                    <Button
                        colorScheme={"green"}
                        size="sm"
                        onClick={() => {
                            handleUpdateUser()
                        }}
                        className='w-full'
                        disabled={!isUpdate}
                        isLoading={loading}
                    >
                        حفظ
                    </Button>
                </td>
            </tr>
        </>
    )
}

export default UserTableRow
