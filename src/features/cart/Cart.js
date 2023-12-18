import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemsFromCartAsync,
  selectCartItems,
  updateCartAsync,
} from "./cartSlice";
import { selectLoggedInUserInfo } from "../user/userSlice";
import { fetchItemsByUserId } from "./cartAPI";
import { fetchItemsByUserIdAsync } from "./cartSlice";
import { useEffect } from "react";
import { useAlert } from "react-alert";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const products = useSelector(selectCartItems);
  const user = useSelector(selectLoggedInUserInfo);
  const dispatch = useDispatch();
  const alert = useAlert();

  const totalAmount = products.reduce(
    (amount, items) => items.product.price * items.quantity + amount,
    0
  );
  const totalItemInCart = products.reduce(
    (total, items) => items.quantity + total,
    0
  );
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };
  const handleSize = (e, item) => {
    dispatch(updateCartAsync({ id:item.id, size: +e.target.value }));
    console.log(e.target.value);
  };

  const handleRemove = (e, id) => {
    console.log(id)
    dispatch(deleteItemsFromCartAsync(id));
    alert.success("Item is removed from cart!")
  };

  useEffect(()=>{
    dispatch(fetchItemsByUserIdAsync(user.id))
  },[dispatch])


  
  return (
    <>
      {!products.length && <Navigate to="/" replace="true"></Navigate>}
      <div className=" border-b-4 min-w-fit border-gray-400 py-4">
        <h1 className=" text-2xl font-bold bg-stone-800 py-4 px-4 text-white">⟫ My Cart</h1>
      </div>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-3xl my-8 font-semibold tracking-tight text-center text-gray-900">
              Cart Items
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.map((item) => (
                  <li key={item.product.id} className="flex py-6">
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
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => handleQuantity(e, item)}
                            value={item.quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>

                        <div className="flex">
                          <button
                            onClick={(e) => handleRemove(e, item.id)}
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
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
              <p>₹ {totalAmount}</p>
            </div>
            <div className="flex justify-between my-2 text-base font-medium text-gray-900">
              <p>Total Items in Cart</p>
              <p>{totalItemInCart} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 pl-2 hover:text-indigo-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
