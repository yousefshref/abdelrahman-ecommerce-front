import { api } from "./server"

export const server = api
// export const server = 'https://abdelrahmanecommerce.pythonanywhere.com/'

export const productDetails = (id) => `/products/${id}/`


export const cartPage = () => `/cart/`

export const trackOrders = () => `/orders/track/`
export const productsPage = () => `/products/`

export const orderConfirm = () => `/confirm/`

export const cancelOrder = () => `/orders/cancel/`

export const userProfile = () => `/profile/`
export const userProfileOrdersDeliverd = () => `/profile/orders/devilerd/`
export const userProfileOrdersCancelled = () => `/profile/orders/cancelled/`

// auth
export const loginPagePath = () => `/auth/login/`
export const signUpPagePath = () => `/auth/register/`


// admin
export const adminLoginPage = () => `/admin/login/`
export const adminRegisterPage = () => `/admin/register/`

export const adminDashboard = () => `/admin/`
export const adminProducts = () => `/admin/products/`
export const adminOrders = () => `/admin/orders/`
export const adminSettings = () => `/admin/settings/`

export const adminUsers = () => `/admin/users/`

