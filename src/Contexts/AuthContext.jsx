import axios from 'axios'
import React, { createContext, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { adminDashboard, adminOrders, adminProducts, adminSettings, adminUsers } from '../Variables/pathes'
import { useToast } from '@chakra-ui/react'
import { useGoogleLogin } from '@react-oauth/google'

const AuthContext = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [loading, setLoading] = React.useState(false)


    const toast = useToast()

    const login = async (data) => {
        setLoading(true)
        try {
            // 200
            const res = await axios.post('/login/', data)
            localStorage.setItem('token', res.data.token)
            if (res?.data?.user?.is_superuser) {
                navigate(adminProducts())
            }
            if (res?.data?.user?.is_shipping_employee) {
                navigate(adminOrders())
            }
        } catch (err) {
            // 404 not found
            if (err.response.status === 404) {
                // alert("تأكد من صحة اسم الحساب وكلمة المرور")
                toast({
                    title: "تأكد من صحة اسم الحساب وكلمة المرور",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                });
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
                // alert("اسم الحساب موجود بالفعل")
                toast({
                    title: "اسم الحساب موجود بالفعل",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                });
            }
            console.log(err);
        } finally {
            setLoading(false)
        }
    }


    const googleLogin = async (credentialToken) => {
        setLoading(true)
        try {
            const res = await axios.post('google-auth/', { token: credentialToken })
            localStorage.setItem('token', res.data.token)
            if (res?.data?.user?.is_superuser) {
                navigate(adminProducts())
            } else {
                if (res?.data?.user?.is_shipping_employee) {
                    navigate(adminOrders())
                } else {
                    navigate('/')
                }
            }
            return res.data
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }



    const [user, setUser] = React.useState({})

    const getUser = async () => {
        if (localStorage.getItem('token')) {
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
    }

    const allowedLocations = [adminDashboard(), adminProducts(), adminOrders(), adminSettings(), adminUsers(), '/']
    useEffect(() => {
        if (allowedLocations.includes(location.pathname)) {
            getUser()
        }
    }, [location])



    const logout = () => {
        localStorage.removeItem('token')
        setUser({})
        navigate('/')
    }



    return (
        <AuthContextProvider.Provider value={{
            loading,
            login,

            googleLogin,

            getUser,
            user,

            register,
            logout
        }}>
            {children}
        </AuthContextProvider.Provider>
    )
}


export default AuthContext
export const AuthContextProvider = createContext()

