import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
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


    const { isOpen, onOpen, onClose } = useDisclosure();
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');


    const userContext = useContext(UsersContextProvider)

    const [loading2, setLoading2] = React.useState(false)

    const handleSendReportToSales = async () => {
        const data = {
            user_id: user.id,
            date_from: fromDate,
            date_to: toDate
        }

        setLoading2(true)
        await userContext?.sendReportToSales(data, onClose)
        setLoading2(false)
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
                    <button
                        onClick={onOpen}
                        className='p-2 px-4 bg-green-200 transition-all hover:rounded-xl active:bg-green-300 w-full'
                    >
                        ارسال
                    </button>

                    {/* Modal for Date Picker */}
                    <Modal isOpen={isOpen} onClose={loading2 ? null : onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader className='font'>هل تريد في تاريخ معين ؟</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-4">
                                    <Input
                                        type="date"
                                        placeholder="From"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                    />
                                    <Input
                                        type="date"
                                        placeholder="To"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                    />
                                </div>
                            </ModalBody>
                            {
                                loading2 ? null :
                                    <ModalFooter className='flex gap-5'>
                                        <Button size={"sm"} colorScheme="blue" mr={3} onClick={onClose}>
                                            Close
                                        </Button>
                                        <Button size={"sm"} colorScheme="green" onClick={() => {
                                            handleSendReportToSales()
                                        }}>
                                            Submit
                                        </Button>
                                    </ModalFooter>
                            }
                        </ModalContent>
                    </Modal>
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
                <td className="border px-4 py-2 text-nowrap">
                    <Button
                        colorScheme={"red"}
                        size="sm"
                        onClick={() => {
                            userContext?.deleteUser(user?.id)
                        }}
                        className='w-full'
                        isLoading={loading}
                    >
                        حذف
                    </Button>
                </td>
            </tr>
        </>
    )
}

export default UserTableRow
