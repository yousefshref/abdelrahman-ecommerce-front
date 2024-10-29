import axios from 'axios'
import React, { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminDashboard } from '../Variables/pathes'

const AuthContext = ({ children }) => {
    const navigate = useNavigate()

    const [loading, setLoading] = React.useState(false)

    const login = async (data) => {
        setLoading(true)
        try {
            // 200
            const res = await axios.post('/login/', data)
            localStorage.setItem('token', res.data.token)
            if (res.data.user.is_superuser || res.data.user.is_shipping_employee) {
                navigate(adminDashboard())
            }
            console.log(res.data);

        } catch (err) {
            // 404 not found
            if (err.response.status === 404) {
                alert("تأكد من صحة اسم الحساب وكلمة المرور")
            }
            console.log(err);
        } finally {
            setLoading(false)
        }
    }



    const register = async ({ data }) => {
        setLoading(true)
        try {
            const res = await axios.post('/register/', data)
            localStorage.setItem('token', res.data.token)
            if (res.data.user.is_superuser) {
                navigate(adminDashboard())
            } else {
                navigate('/')
            }
            return res.data
        } catch (err) {
            if (err.response.status == 400) {
                alert("اسم الحساب موجود بالفعل")
            }
            console.log(err);
        } finally {
            setLoading(false)
        }
    }



    const [user, setUser] = React.useState({})

    const getUser = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/user/', {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            setUser(res.data)
            return res.data
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }



    return (
        <AuthContextProvider.Provider value={{
            loading,
            login,

            getUser,
            user,

            register
        }}>
            {children}
        </AuthContextProvider.Provider>
    )
}


export default AuthContext
export const AuthContextProvider = createContext()

