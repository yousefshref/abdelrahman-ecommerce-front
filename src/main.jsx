import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ProductsContext from "./Contexts/ProductsContext.jsx";
import CartContext from "./Contexts/CartContext.jsx";
import StateContext from "./Contexts/StatesContext.jsx";
import CategoryContext from "./Contexts/CategoryContext.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import OrderContext from "./Contexts/OrderContext.jsx";
import AuthContext from "./Contexts/AuthContext.jsx";
import UsersContext from "./Contexts/UsersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AuthContext>
          <ProductsContext>
            <CartContext>
              <StateContext>
                <OrderContext>
                  <CategoryContext>
                    <UsersContext>
                      <App />
                    </UsersContext>
                  </CategoryContext>
                </OrderContext>
              </StateContext>
            </CartContext>
          </ProductsContext>
        </AuthContext>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>
);
