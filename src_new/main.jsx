import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductsContext from "./Contexts/ProductsContext.jsx";
import CartContext from "./Contexts/CartContext.jsx";
import StateContext from "./Contexts/StatesContext.jsx";
import CategoryContext from "./Contexts/CategoryContext.jsx";
import OrderContext from "./Contexts/OrderContext.jsx";
import AuthContext from "./Contexts/AuthContext.jsx";
import UsersContext from "./Contexts/UsersContext.jsx";
import AlertContext from "./Contexts/AlertContext.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <ChakraProvider>
      <GoogleOAuthProvider clientId={"113071870770-6v09dj39vjveg3etc2i1r2ikj9aqsjn0.apps.googleusercontent.com"}>
        <AuthContext>
          <ProductsContext>
            <CartContext>
              <StateContext>
                <OrderContext>
                  <CategoryContext>
                    <UsersContext>
                      <AlertContext>
                        <App />
                      </AlertContext>
                    </UsersContext>
                  </CategoryContext>
                </OrderContext>
              </StateContext>
            </CartContext>
          </ProductsContext>
        </AuthContext>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </BrowserRouter>
  // </StrictMode>
);
