import axios from 'axios'
import React, { createContext } from 'react'

const ProductsContext = ({ children }) => {

    // axios.defaults.baseURL = 'http://127.0.0.1:8000'
    // axios.defaults.baseURL = 'http://172.20.10.4:8000'
    // axios.defaults.baseURL = 'http://172.20.10.2:8000'
    // axios.defaults.baseURL = 'http://192.168.56.1:8000'
    axios.defaults.baseURL = 'https://abdelrahmanecommerce.pythonanywhere.com'

    const [loading, setLoading] = React.useState(true)
    const [products, setProducts] = React.useState([])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const res = await axios.get('/products/')
            setProducts(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    const createProduct = async (data) => {
        try {
            setLoading(true)
            const res = await axios.post('/products/create/', data, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            setProducts([...products, res.data])
            return res.data
        } catch (err) {
            // 400
            if (err.response.status === 400) {
                alert("تأكد من صحة البيانات")
            }
            // 500
            if (err.response.status === 500) {
                alert("حدث خطأ ما")
            }
            console.log(err);
        } finally {
            setLoading(false)
        }
    }




    const updateProduct = async (id, data, setUpdated = null) => {
        try {
            setLoading(true)
            const res = await axios.put(`products/update/${id}/`, data, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                },
            })
            setProducts(products.map(product => product.id === id ? res.data : product))
            setUpdated(false)
            return res.data
        } catch (err) {
            // 404
            // 400
            // 500
            console.log(err);
        } finally {
            setLoading(false)
        }
    }




    const [product, setProduct] = React.useState({})

    const fetchProduct = async (id) => {
        try {
            setLoading(true)
            const res = await axios.get(`/products/${id}/`)
            setProduct(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }





    const handleDeleteProduct = async (id) => {
        try {
            setLoading(true)
            const res = await axios.delete(`/products/delete/${id}/`, {
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
            setProducts(products.filter(product => product.id !== id))
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ProductsContextProvider.Provider value={{
            loading, setLoading,
            products, setProducts,
            fetchProducts,
            product, setProduct,
            fetchProduct,

            updateProduct,

            createProduct,

            handleDeleteProduct
        }}>
            {children}
        </ProductsContextProvider.Provider>
    )
}


export default ProductsContext
export const ProductsContextProvider = createContext()

