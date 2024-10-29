import axios from 'axios'
import React, { createContext } from 'react'

const CategoryContext = ({ children }) => {
    const [loading, setLoading] = React.useState(true)

    const [categories, setCategories] = React.useState([])

    const fetchCategories = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/categories/')
            setCategories(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }
    return (
        <CategoryContextProvider.Provider value={{
            loading,
            categories,
            fetchCategories
        }}>
            {children}
        </CategoryContextProvider.Provider>
    )
}


export default CategoryContext
export const CategoryContextProvider = createContext()
