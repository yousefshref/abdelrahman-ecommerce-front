import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import { adminDashboard, adminLoginPage, adminOrders, adminProducts, adminRegisterPage, adminSettings, adminUsers, cancelOrder, cartPage, loginPagePath, orderConfirm, productDetails, productsPage, signUpPagePath, trackOrders, userProfile, userProfileOrdersCancelled, userProfileOrdersDeliverd } from "./Variables/pathes";
import TrackOrders from "./pages/TrackOrders/TrackOrders";
import AdminLogin from "./pages/Admin/Login/AdminLogin";
import AdminPage from "./pages/Admin/AdminPage/AdminPage";
import AdminProducts from "./pages/Admin/Products/AdminProducts";
import AdminOrders from "./pages/Admin/Orders/AdminOrders";
import AdminUsers from "./pages/Admin/AdminUsers/AdminUsers";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AdminRegister from "./pages/Admin/AdminRegister/AdminRegister";
import AdminSettings from "./pages/Admin/AdminSettings/AdminSettings";
import Products from "./pages/Products/Products";
import CancelOrder from "./pages/CancelOrder/CancelOrder";
import OrderConfirm from "./pages/OrderConfirm/OrderConfirm";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import UserProfile from "./pages/UserProfile/UserProfile";
import UserProfileOrdersDeliverd from "./pages/UserProfileOrdersDeliverd/UserProfileOrdersDeliverd";
import UserProfileOrdersCancelled from "./pages/UserProfileOrdersCancelled/UserProfileOrdersCancelled";
import { Suspense } from "react";


function App() {
  return (
    <Suspense fallback={null}>
      <div className="font">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path={productDetails(":id")} element={<ProductDetails />} />
          <Route path={cartPage()} element={<Cart />} />
          <Route path={trackOrders()} element={<TrackOrders />} />
          <Route path={productsPage()} element={<Products />} />
          <Route path={cancelOrder()} element={<CancelOrder />} />
          <Route path={orderConfirm()} element={<OrderConfirm />} />
          <Route path={loginPagePath()} element={<Login />} />
          <Route path={signUpPagePath()} element={<Signup />} />
          {/* profile */}
          <Route path={userProfile()} element={<UserProfile />} />
          <Route path={userProfileOrdersDeliverd()} element={<UserProfileOrdersDeliverd />} />
          <Route path={userProfileOrdersCancelled()} element={<UserProfileOrdersCancelled />} />

          {/* admin */}
          <Route path={adminLoginPage()} element={<AdminLogin />} />
          <Route path={adminRegisterPage()} element={<AdminRegister />} />

          <Route element={<PrivateRoute />}>
            <Route path={adminProducts()} element={<AdminProducts />} />
            <Route path={adminOrders()} element={<AdminOrders />} />
            <Route path={adminUsers()} element={<AdminUsers />} />
            <Route path={adminSettings()} element={<AdminSettings />} />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
