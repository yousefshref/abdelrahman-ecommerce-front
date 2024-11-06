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

    return (
        <UsersContextProvider.Provider value={{
            users,
            getUsers,

            updateUser,

            salesUsers,
            getSalesUsers,
        }}>
            {children}
        </UsersContextProvider.Provider>
    )
}


export default UsersContext
export const UsersContextProvider = createContext()