import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/Auth/component/Protected";
import DefaultErrorPage from "./pages/DefaultErrorPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectLoggedInUser } from "./features/Auth/AuthSlice";
import {
  fetchLoggedInUserAsync,
  fetchLoggedInUserOrdersAsync,
} from "./features/user/userSlice";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import LogOut from "./features/Auth/component/LogOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/Auth/component/ProtectedAdmin";
import AdminHomePage from "./pages/AdminHomePage";
import ProductFormPage from "./pages/ProductFormPage";
import AdminProductsDetailsPage from "./pages/AdminProductDetailsPage";
import AdminOrderPage from "./pages/AdminOrderPage";
import { fetchAllOrdersAsync } from "./features/orders/orderSlice";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHomePage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/logout",
    element: <LogOut />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/Checkout",
    element: (
      <Protected>
        <CheckoutPage></CheckoutPage>
      </Protected>
    ),
  },
  {
    path: "/Product-Details/:id",
    element: <ProductDetailsPage></ProductDetailsPage>,
  },
  {
    path: "/Admin-Product-Details/:id",
    element: <AdminProductsDetailsPage></AdminProductsDetailsPage>,
  },
  {
    path: "/Admin-Order-pannel",
    element: <AdminOrderPage></AdminOrderPage>,
  },
  {
    path: "/ProductForm",
    element: <ProductFormPage></ProductFormPage>,
  },
  {
    path: "/ProductForm/edit/:id",
    element: <ProductFormPage></ProductFormPage>,
  },
  {
    path: "*",
    element: <DefaultErrorPage />,
  },
  {
    path: "/orderSuccess/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/orders",
    element: <UserOrderPage />,
  },
  {
    path: "/UserProfile",
    element: <UserProfilePage />,
  },
]);

function App() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const options = {
    timeout: 5000,
    position: positions.BOTTOM_RIGHT,
  };

  useEffect(() => {
    dispatch(fetchAllOrdersAsync());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
      dispatch(fetchLoggedInUserOrdersAsync(user.id))
    }
  }, [dispatch, user]);

  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
