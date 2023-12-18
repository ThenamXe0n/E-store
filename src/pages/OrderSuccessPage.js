import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { resetCartAsync } from "../features/cart/cartSlice";
import { selectLoggedInUser } from "../features/Auth/AuthSlice";
import { resetOrder } from "../features/orders/orderSlice";

const OrderSuccessPage = () => {
  const Params = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    //reset cart after placing order
    dispatch(resetCartAsync(user.id));
    //reset Curren_orders so we can place a new order.
    dispatch(resetOrder());
  },[dispatch,user])

  return (
    <>
      {!Params.id && <Navigate to="/" replace={true}></Navigate>}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-3xl font-semibold text-indigo-600">
            Congratulations!
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Your order (Order No. #{Params.id}) has been placed successfully
          </h1>
          <p className="mt-6 text-2xl leading-7 text-gray-600">
            Thankyou for Shopping on Shopkart.
          </p>
          <p className="mt-6 text-lg font-semibold leading-7 text-green-600">
            You can track your order by clicking on My Order button or can find
            in Account » My Orders.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link
              to="/orders"
              className="rounded-md px-3.5 py-2.5 text-sm font-semibold bg-green-600 text-white cursor-pointer hover:bg"
            >
              My Orders <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSuccessPage;
