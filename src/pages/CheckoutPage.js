import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import NavBar from "../features/navBar/NavBar";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemsFromCartAsync,
  selectCartItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/Auth/AuthSlice";
import {
  createOrderAsync,
  selectCurrentOrder,
  selectCurrentOrderStatus,
} from "../features/orders/orderSlice";

const CheckoutPage = () => {
  const user = useSelector(selectLoggedInUser);
  const [open, setOpen] = useState(true);
  const defaultAddress = user.address[0];
  const [selectedAddress, setSelectedAddress] = useState(defaultAddress);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const products = useSelector(selectCartItems);
  const currentOrder = useSelector(selectCurrentOrder);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const totalAmount = products.reduce(
    (amount, items) => items.product.price * items.quantity + amount,
    0
  );
  const totalItemInCart = products.reduce(
    (total, items) => items.quantity + total,
    0
  );
  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ ...item, quantity: +e.target.value }));
  };
  const handleSize = (e, item) => {
    dispatch(updateCartAsync({ ...item, size: e.target.value }));
    console.log(e.target.value);
  };

  const handleRemove = (e, id) => {
    dispatch(deleteItemsFromCartAsync(id));
  };

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.address[e.target.value]);
    console.log(paymentMethod);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
    console.log(selectedAddress);
  };

  const handleOrder = (e) => {
    const order = {
      products,
      user:user.id,
      selectedAddress,
      paymentMethod,
      totalAmount,
      totalItemInCart,
      status: "pending", //order status can be changed by admin when order is delivered
    };
    dispatch(createOrderAsync(order));
    console.log(order);
  };

  return (
    <NavBar>
      {currentOrder && (
        <Navigate
          to={`/orderSuccess/${currentOrder.id}`}
          replace={true}
        ></Navigate>
      )}

      <div className=" border-b-4 min-w-fit border-gray-400 mx-5 py-4 ">
        <h1 className=" text-2xl font-bold bg-stone-800 py-4 px-4 text-white">
          {" "}
          ⟫ My Cart ⟫ checkout
        </h1>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-5">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 ">
          <div className="lg:col-span-3">
            <form
              className="bg-white px-5 py-12 mt-12"
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  updateUserAsync({ ...user, address: [...user.address, data] })
                );
                reset();
              })}
            >
              <div className="space-y-12 p-12">
                <h1 className="text-center text-2xl font-bold tracking-wide">
                  Checkout
                </h1>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("Name", {
                            required: "User-name is required",
                          })}
                          id="first-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="contact"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contact no.
                      </label>
                      <div className="mt-2">
                        <input
                          type="tel"
                          {...register("contact", {
                            required: "contact is required",
                          })}
                          id="constact"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                          })}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("adddress", {
                            required: "Address is required",
                          })}
                          id="address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("PinCodes", {
                            required: "PinCode is required",
                          })}
                          id="postal-code"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Select from the existing Addresses
                  </p>
                  <ul role="list" className="divide-y divide-gray-100">
                    {user.address.map((person, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 py-5"
                      >
                        <div className="flex gap-x-4">
                          <input
                            onChange={handleAddress}
                            id=""
                            value={index}
                            name="Address"
                            checked={selectedAddress===user.address[index]}
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="Payment"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          ></label>
                          {/* <img
                          className="h-12 w-12 flex-none rounded-full bg-gray-50"
                          src={person.imageUrl}
                          alt=""
                        /> */}
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {person.adddress}
                            </p>
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {person.city} ,{person.state}
                            </p>

                            <p className="mt-1 truncate text-xs leading-5 text-black">
                              {person.Name}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              contact no : {person.contact} <br />
                              Email : {person.email}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payments
                      </legend>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        These are delivered via SMS to your mobile phone.
                      </p>
                      <div className="mt-6 space-y-6">
                        <div className="flex items-center gap-x-3">
                          <input
                            id="Payment"
                            onChange={handlePayment}
                            value="cash"
                            checked={paymentMethod === "cash"}
                            name="Payment"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="Payment"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash on Delivery(COD)
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="Payment"
                            onChange={handlePayment}
                            name="Payment"
                            value="UPI"
                            checked={paymentMethod === "UPI"}
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="Payment"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            UPI Payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Check out item Section */}
          <div className="lg:col-span-2">
            <div className="mx-auto bg-white pt-10 mt-12 max-w-7xl px-2 sm:px-2 lg:px-6">
              <h2 className="text-2xl font-semibold">Cart</h2>
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {products.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.product.thumbnail}
                            alt={product.product.imageAlt}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.product.href}>{product.product.name}</a>
                              </h3>
                              <p className="ml-4">₹{product.product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500 mb-5 ">
                              <label
                                htmlFor="Quantity"
                                className="inline text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty
                              </label>
                              <select
                                className="ml-8"
                                onChange={(e) => handleQuantity(e, product)}
                                value={product.quantity}
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>

                              {product.size && (
                                <>
                                  {" "}
                                  <label
                                    htmlFor="Quantity"
                                    className="inline text-sm font-medium leading-6 ml-5 text-gray-900"
                                  >
                                    size
                                  </label>
                                  <select
                                    onChange={(e) => handleSize(e, product)}
                                    value={product.size}
                                    className="ml-8"
                                  >
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                  </select>
                                </>
                              )}
                            </div>

                            <div className="flex">
                              <button
                                onClick={(e) => handleRemove(e, product.id)}
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
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹{totalAmount}</p>
                </div>
                <div className="flex justify-between my-3 text-base font-medium text-gray-900">
                  <p>total Items</p>
                  <p>{totalItemInCart} Items</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    onClick={handleOrder}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => setOpen(false)}
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
        </div>
      </div>
    </NavBar>
  );
};

export default CheckoutPage;
