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


    const createState = async (data, setOpenCreate) => {
        try {
            setLoading(true)
            const res = await axios.post('/states/', data)
            setStates([...states, res.data])
            if (setOpenCreate) {
                setOpenCreate(false)
            }
            return res.data
        }
        catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    const updateState = async (id, data, setOpenUpdate) => {
        try {
            setLoading(true)
            const res = await axios.put(`/states/${id}/`, data)
            setStates(states.map(state => state.id === id ? res.data : state))
            if (setOpenUpdate) {
                setOpenUpdate(false)
            }
            return res.data
        }
        catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    const deleteState = async (id) => {
        try {
            setLoading(true)
            const res = await axios.delete(`/states/${id}/`)
            setStates(states.filter(state => state.id !== id))
            return res.data
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <StatesContextProvider.Provider value={{
            loading,
            states, getStates,

            createState,
            updateState,
            deleteState
        }}>
            {children}
        </StatesContextProvider.Provider>
    )
}

export default StatesContext
export const StatesContextProvider = createContext()
