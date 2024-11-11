import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { createContext } from 'react'

const UsersContext = ({ children }) => {

    const [users, setUsers] = React.useState([])

    const getUsers = async () => {
        if (localStorage.getItem('token')) {
            const res = await axios.get('/users/', {
                headers: {
                    ...(localStorage.getItem('token') ? { Authorization: `Token ${localStorage.getItem('token')}` } : {})
                }
            });
            setUsers(res.data)
        }
    }


    const [user, setUser] = React.useState({})

    const getUser = async (id) => {
        const res = await axios.get(`/users/${id}/`, {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        });
        setUser(res.data)
        return res.data
    }

    const updateUser = async (id, data) => {
        try {
            const res = await axios.put(`/users/${id}/update/`, data, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })

            const newUsers = users.map((user) => {
                if (user.id === id) {
                    return res.data
                } else {
                    return user
                }
            })
            setUsers(newUsers)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }



    const [salesUsers, setSalesUsers] = React.useState([])

    const getSalesUsers = async () => {
        const res = await axios.get('/users/sales/', {
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        });

        setSalesUsers(res.data)
    }



    const updateUserPassword = async (id, data) => {
        try {
            const res = await axios.put(`/users/${id}/update-password/`, data, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            return res.data
        } catch (err) {
            console.log(err)
        }
    }


    const taost = useToast()

    const sendReportToSales = async (data, onClose) => {
        try {
            const res = await axios.post('/users/sales/send-report/', data, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            taost({
                title: 'تم ارسال التقرير بنجاح',
                status: 'success',
                duration: 3000,
                isClosable: true
            })
            onClose()
            return res.data
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <UsersContextProvider.Provider value={{
            users,
            getUsers,

            updateUser,

            salesUsers,
            getSalesUsers,
            updateUserPassword,

            sendReportToSales,

            user,
            getUser,
        }}>
            {children}
        </UsersContextProvider.Provider>
    )
}


export default UsersContext
export const UsersContextProvider = createContext()