import { api } from "./server"

export const server = api
// export const server = 'https://abdelrahmanecommerce.pythonanywhere.com/'

export const productDetails = (id) => `/products/${id}/`


export const cartPage = () => `/cart/`


export const trackOrders = () => `/orders/track/`
export const productsPage = () => `/products/`

// admin
export const adminLoginPage = () => `/admin/login/`
export const adminRegisterPage = () => `/admin/register/`

export const adminDashboard = () => `/admin/`
export const adminProducts = () => `/admin/products/`
export const adminOrders = () => `/admin/orders/`
export const adminSettings = () => `/admin/settings/`

export const adminUsers = () => `/admin/users/`

