import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../navBar/NavBar";
import { updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { selectLoggedInUser } from "../../Auth/AuthSlice";

export function UserProfile() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const [selectEditFormIndex, setSelectedEditFormIndex] = useState(-1);
  const [showaddAddressForm, setShowaddAddressForm] = useState(false);
  const [showProfilePictureForm, setShowProfilePictureForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const handleRemove = (e, index) => {
    const newUser = { ...user, address: [...user.address] };
    newUser.address.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, address: [...user.address] };
    newUser.address.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    console.log(newUser);
    setSelectedEditFormIndex(-1);
  };

  const handleEditForm = (index) => {
    const address = user.address[index];
    setSelectedEditFormIndex(index);
    setValue("Name", address.Name);
    setValue("contact", address.contact);
    setValue("email", address.email);
    setValue("adddress", address.adddress);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("PinCodes", address.PinCodes);
  };

  const handleAdd = (address) => {
    const newUser = { ...user, address: [...user.address, address] };
    dispatch(updateUserAsync(newUser));
    setShowaddAddressForm(false);
  };
 
  const handleProfile = (profileUrl) =>{
    const picture = (Object.values(profileUrl).toString());
    const newProfile = {...user,profile:picture}
    console.log(newProfile)
    dispatch(updateUserAsync(newProfile));
    alert('Profile Picture Uploaded Successfully')
    reset()

  }
  

  return (
    <NavBar>
      <div className=" border-b-4 min-w-fit border-gray-400 mx-5 py-4 ">
        {user && user.role === "admin" ? null : (
          <h1 className=" text-2xl font-bold bg-stone-800 py-4 px-4 text-white">
            ⟫ My Profile
          </h1>
        )}
        {user && user.role === "admin" ? (
          <h1 className=" text-2xl font-bold bg-stone-800 py-4 px-4 text-white">
            ⟫ Admin Profile
          </h1>
        ) : null}
      </div>
      <div className="mx-auto mt-12 bg-white max-w-7xl p-10 ">
        {user && user.role !== "admin" ? (
          <h1 className="text-black text-3xl font-bold border-b-4 border-green-500 max-w-fit mx-auto my-5">
            {" "}
            User Profile
          </h1>
        ) : null}
        {user && user.role === "admin" ? (
          <h1 className="text-black text-3xl font-bold border-b-4 border-green-500 max-w-fit mx-auto my-5">
            {" "}
            Admin Profile
          </h1>
        ) : null}
        <img
          src={user.profile}
          alt="profile"
          className="h-52 w-52 rounded-full object-cover object-center mx-auto my-8"
        />
        <div className="flex justify-center mb-4 ">
          <button
            className="px-5 py-2 bg-green-600 text-white"
            onClick={() => {
              if (!showProfilePictureForm) {
                setShowProfilePictureForm(true);
              } else {
                setShowProfilePictureForm(false);
              }
            }}
          >
            {" "}
            Edit Profile Photo
          </button>
        </div>
        {showProfilePictureForm ? (
          <div className="w-2/4 mb-4 mx-auto">
            <form
              onSubmit={handleSubmit((data) => {
                console.log(data)
               handleProfile(data)
              })}
            >
              {" "}
              <label
                htmlFor="profile"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile url
              </label>
              <input
                type="text"
                {...register("profile", {
                  required: "User-name is required",
                })}
                id="profile"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button className="px-5 my-3 py-2 bg-green-600 text-white">
                save
              </button>{" "}
            </form>
          </div>
        ) : null}

        <div className="max-w-fit mx-auto">
          <h3 className="text-2xl text-center font-bold leading-7 text-gray-900">
            {user.Name}
          </h3>
          <p className="mt-1 max-w-2xl text-base font-semibold leading-6 text-green-600">
            {user.email}
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-base font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user.Name}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-base font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user.email}
              </dd>
            </div>
            {showaddAddressForm === true ? (
              <form
                className="bg-white px-5 py-12 mt-12"
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  handleAdd(data);
                  reset();
                })}
              >
                <div className="space-y-12">
                  <h1 className="text-center text-2xl font-bold tracking-wide">
                    Add New Address
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
                            id="Name"
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
                            id="contact"
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
                          htmlFor="PinCodes"
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
                            id="PinCodes"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            ) : null}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              {showaddAddressForm === false ? (
                <button
                  onClick={() => setShowaddAddressForm(true)}
                  className="p-1 rounded-xl bg-blue-700 text-white  hover:bg-green-700 "
                >
                  {" "}
                  Add new Address
                </button>
              ) : null}
              {showaddAddressForm === true ? (
                <button
                  onClick={() => setShowaddAddressForm(false)}
                  className="p-1 rounded-xl bg-red-700 max-w-fit px-6 text-white"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </dl>
        </div>
        <div className="border-y-1 border-gray-100 py-4">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Address
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 ">
            Your added Address
          </p>
          {user.address.map((person, index) => (
            <>
              <div>
                <div className="lg:col-span-3">
                  {selectEditFormIndex === index ? (
                    <form
                      className="bg-white px-5 py-12 mt-12"
                      onSubmit={handleSubmit((data) => {
                        console.log(data);
                        handleEdit(data, index);
                        reset();
                      })}
                    >
                      <div className="space-y-12">
                        <h1 className="text-center text-2xl font-bold tracking-wide">
                          Edit Address
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
                                  id="Name"
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
                                  id="contact"
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
                            onClick={() => {
                              setSelectedEditFormIndex(-1);
                            }}
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
                      </div>
                    </form>
                  ) : null}
                </div>
              </div>
              <ul className="divide-y  divide-gray-100">
                <li key={index}>
                  <div className="  mt-2 p-5 flex gap-x-4 border-4 border-sky-600 rounded-xl sm:grid sm:grid-cols-2 sm:gap-4 ">
                    <div className="min-w-0 flex-auto">
                      <div>
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {person.adddress} , {person.city} ,{person.state}
                        </p>

                        <p className="mt-1 truncate text-xs leading-5 text-black">
                          {person.Name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm leading-6 text-gray-900">
                          contact no : {person.contact} <br />
                          Email : {person.email}
                        </p>
                      </div>
                    </div>
                    <div className="hidden justify-around sm:flex sm:flex-col sm:item-end">
                      <button
                        onClick={(e) => handleEditForm(index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleRemove(e, person.id)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          ))}
        </div>
      </div>
    </NavBar>
  );
}
