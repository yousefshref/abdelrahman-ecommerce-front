import React, { createContext } from 'react'

const AlertContext = ({ children }) => {
    const [showAlert, setShowAlert] = React.useState(false)
    return (
        <AlertContextProvider.Provider value={{
            showAlert,
            setShowAlert
        }}>
            {children}
        </AlertContextProvider.Provider>
    )
}

export default AlertContext
export const AlertContextProvider = createContext()