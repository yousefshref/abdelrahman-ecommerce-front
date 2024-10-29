import axios from 'axios'
import React, { createContext } from 'react'

const StatesContext = ({ children }) => {


    const [loading, setLoading] = React.useState(true)

    const [states, setStates] = React.useState([])


    const getStates = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/states/')
            setStates(res.data)
        }
        catch (err) {
            console.log(err)
        } finally {
            setLoading(true)
        }
    }

    return (
        <StatesContextProvider.Provider value={{
            loading,
            states, getStates
        }}>
            {children}
        </StatesContextProvider.Provider>
    )
}

export default StatesContext
export const StatesContextProvider = createContext()
