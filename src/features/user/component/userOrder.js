import React from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../Auth/AuthSlice";
import { fetchLoggedInUserOrdersAsync } from "../userSlice";
import { selectLoggedInUserOrders } from "../userSlice";
import { useEffect } from "react";
import NavBar from "../../navBar/NavBar";
import { selectOrders } from "../../orders/orderSlice";

export const UserOrder = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectLoggedInUserOrders);
  // const products =  orders.products

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
    console.log(user.id);
    console.log(orders);
  }, []);

  return (
    <>
      {!orders.length && <Navigate to="/" replace="true"></Navigate>}
      <NavBar>
        <div className=" border-b-4 min-w-fit border-gray-400 mx-5 py-4">
          <h1 className=" text-2xl font-bold bg-stone-800 py-4 px-4 text-white">
            ⟫ My Orders
          </h1>
        </div>
        <div>
          {orders.map((userOrders) => (
            <div>
              <div>
                <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                      Order # {userOrders.id}
                    </h1>
                    <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                      Order Status : {userOrders.status}
                    </h3>
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {userOrders.products.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.thumbnail}
                                alt={item.product.title}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.href}>{item.product.title}</a>
                                  </h3>
                                  <p className="ml-4">₹{item.product.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.brand}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Qty :{item.product.quantity}
                                  </label>
                                </div>

                                <div className="flex"></div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>₹ {userOrders.totalAmount}</p>
                    </div>
                    <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                      <p>Total Items in Cart</p>
                      <p>{userOrders.totalItems} items</p>
                    </div>
                    <div className="border-2 p-5 border-blue-40 bg-blue-700 rounded-2xl">
                      <p className="mt-1 truncate text-xm font-bold leading-5 text-white">
                        {userOrders.selectedAddress.Name}
                      </p>
                      <p className="mt-0.5 text-m text-white">
                        Shipping Address : {userOrders.selectedAddress.adddress}
                        ,{userOrders.selectedAddress.city} ,
                        {userOrders.selectedAddress.state}
                      </p>
                      <p className="text-sm leading-6 text-white">
                        contact no : {userOrders.selectedAddress.contact} <br />
                        Email : {userOrders.selectedAddress.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </NavBar>
    </>
  );
};
