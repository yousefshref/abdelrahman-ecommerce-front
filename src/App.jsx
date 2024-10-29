import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import { adminDashboard, adminLoginPage, adminOrders, adminProducts, adminRegisterPage, adminUsers, cartPage, productDetails, trackOrders } from "./Variables/pathes";
import TrackOrders from "./pages/TrackOrders/TrackOrders";
import AdminLogin from "./pages/Admin/Login/AdminLogin";
import AdminPage from "./pages/Admin/AdminPage/AdminPage";
import AdminProducts from "./pages/Admin/Products/AdminProducts";
import AdminOrders from "./pages/Admin/Orders/AdminOrders";
import AdminUsers from "./pages/Admin/AdminUsers/AdminUsers";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AdminRegister from "./pages/Admin/AdminRegister/AdminRegister";


function App() {
  return (
    <div className="font">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path={productDetails(":id")} element={<ProductDetails />} />

        <Route path={cartPage()} element={<Cart />} />

        <Route path={trackOrders()} element={<TrackOrders />} />

        {/* admin */}
        <Route path={adminLoginPage()} element={<AdminLogin />} />
        <Route path={adminRegisterPage()} element={<AdminRegister />} />

        <Route element={<PrivateRoute />}>
          <Route path={adminDashboard()} element={<AdminPage />} />
          <Route path={adminProducts()} element={<AdminProducts />} />
          <Route path={adminOrders()} element={<AdminOrders />} />
          <Route path={adminUsers()} element={<AdminUsers />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
