import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { createContext } from 'react'

const CategoryContext = ({ children }) => {
    const toast = useToast()


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

    const createCategory = async ({ data }, onClose) => {
        try {
            const res = await axios.post('/categories/create/', data)
            setCategories([...categories, res.data])
            toast({
                title: "تم اضافة القسم بنجاح",
                // description: "Your item has been successfully added to the cart.",
                status: "success",
                duration: 3000, // 3 seconds
                isClosable: true,
                position: "bottom-left",
                variant: "subtle", // Optional: You can use subtle for a softer effect
            })
            onClose()
        } catch (err) {
            // 400
            if (err.response.status === 400) {
                toast({
                    title: "تأكد من صحة البيانات",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                })
            }
            // 500
            if (err.response.status === 500) {
                toast({
                    title: "حدث خطأ ما",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                })
            }
            console.log(err)
        }
    }


    const updateCategory = async (id, data, onClose) => {
        try {
            setLoading(true)
            const res = await axios.put(`/categories/update/${id}/`, data)
            setCategories(categories?.map((category) => category.id === id ? res.data : category))
            toast({
                title: "تم تعديل القسم بنجاح",
                // description: "Your item has been successfully added to the cart.",
                status: "success",
                duration: 3000, // 3 seconds
                isClosable: true,
                position: "bottom-left",
                variant: "subtle", // Optional: You can use subtle for a softer effect
            })
            onClose()
        } catch (err) {
            // 404
            if (err.response.status === 404) {
                toast({
                    title: "القسم غير موجود",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                })
            }
            // 400
            if (err.response.status === 400) {
                toast({
                    title: "تأكد من صحة البيانات",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                })
            }
            // 500
            if (err.response.status === 500) {
                toast({
                    title: "حدث خطأ ما",
                    // description: "Your item has been successfully added to the cart.",
                    status: "error",
                    duration: 3000, // 3 seconds
                    isClosable: true,
                    position: "bottom-left",
                    variant: "subtle", // Optional: You can use subtle for a softer effect
                })
            }
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    const deleteCategory = async (id) => {
        try {
            const res = await axios.delete(`/categories/delete/${id}/`)
            setCategories(categories.filter((category) => category.id !== id))
            return res.data
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <CategoryContextProvider.Provider value={{
            loading,
            categories,
            fetchCategories,
            createCategory,
            updateCategory,
            deleteCategory
        }}>
            {children}
        </CategoryContextProvider.Provider>
    )
}


export default CategoryContext
export const CategoryContextProvider = createContext()
