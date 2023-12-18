import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../features/product/ProductListSlice";
import authReducer from "../features/Auth/AuthSlice";
import cartReducer from "../features/cart/cartSlice";
import orderReducer from "../features/orders/orderSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    product: ProductReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
});
