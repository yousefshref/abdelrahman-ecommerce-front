import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthContextProvider } from '../../Contexts/AuthContext';
import { adminDashboard } from '../../Variables/pathes';

const PrivateRoute = () => {

    const navigate = useNavigate()

    const authContext = React.useContext(AuthContextProvider)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            authContext?.getUser().then(res => {
                if (!res) {
                    navigate('/')
                }
                if (res.is_superuser || res.is_shipping_employee) {
                    navigate(adminDashboard())
                } else {
                    navigate('/')
                }
            })
        } else {
            navigate('/')
        }
    }, [])

    return <Outlet />
}

export default PrivateRoute
