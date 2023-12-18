import React, { useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedProducts,
  createProductAsync,
  fetchAllProductByIdAsync,
  selectAllProducts,
  selectBrands,
  selectCategories,
  selectedProductbyId,
  updateProductsAsync,
} from "../../product/ProductListSlice";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { fetchAllProductById } from "../../product/ProductListAPI";
import { useAlert } from "react-alert";
import { useLayoutEffect } from "react";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const selectedProduct = useSelector(selectedProductbyId);
  const brand = useSelector(selectBrands);
  const category = useSelector(selectCategories);
  const params = useParams();
  const alert = useAlert();
  const options = {
    timeout: 5000,
    position: positions.TOP_CENTER,
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchAllProductByIdAsync(params.id));
    }
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectedProduct && params.id) {
      setValue("title", selectedProduct.title);
      setValue("price", selectedProduct.price);
      setValue("discountPercentage", selectedProduct.discountPercentage);
      setValue("stock", selectedProduct.stock);
      setValue("rating", selectedProduct.rating);
      setValue("description", selectedProduct.description);
      setValue("brand", selectedProduct.brand);
      setValue("category", selectedProduct.category);
      setValue("thumbnail", selectedProduct.thumbnail);
      setValue("image1", selectedProduct.images[0]);
      setValue("image2", selectedProduct.images[1]);
      setValue("image3", selectedProduct.images[2]);
      setValue("image4", selectedProduct.images[3]);
    } else {
      dispatch(clearSelectedProducts());
    }
  }, [dispatch,selectedProduct, params.id, setValue]);

  return (
    <Provider template={AlertTemplate} {...options}>
    <form
      onSubmit={handleSubmit((data) => {
        const product = { ...data };

        product.images = [
          product.image1,
          product.image2,
          product.image3,
          product.image4,
        ];
        delete product["image1"];
        delete product["image2"];
        delete product["image3"];
        delete product["image4"];
        product.discountPercentage = +product.discountPercentage;
        product.price = +product.price;
        product.stock = +product.stock;
        product.rating = +product.rating;
        console.log(product);

        if (params.id) {
          product.id = params.id;
          dispatch(updateProductsAsync(product));
          reset();
          alert.show('Product details has been updated successfully')
        } else {
          dispatch(createProductAsync(product));
          reset();
          alert.success('New Product has been added successfully!')
        }
      })}
    >
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Product Details
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 px-4">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("title", {
                    required: "product title is require",
                  })}
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  {...register("price", {
                    required: "product price is require",
                  })}
                  name="price"
                  id="price"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <br />
            <div className="sm:col-span-2">
              <label
                htmlFor="discountPercentage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                DiscountPercentage
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("discountPercentage")}
                  name="discountPercentage"
                  id="discountPercentage"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("stock", {
                    required: "stock of product is require",
                  })}
                  name="stock"
                  id="stock"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-1">
              <label
                htmlFor="rating"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Rating
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("rating")}
                  name="rating"
                  id="rating"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  id="description"
                  name="description"
                  {...register("description", {
                    required: "product description is require",
                  })}
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="brands"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brands
              </label>
              <div className="mt-2">
                <select
                  id="brands"
                  name="brands"
                  {...register("brand")}
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {brand.map((brand) => (
                    <option value={brand.value}>{brand.value}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Categories
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  {...register("category", {
                    required: "product category is require",
                  })}
                  name="category"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {category.map((categories) => (
                    <option value={categories.value}>{categories.value}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Thumbnail url
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("thumbnail", {
                    required: "product thumbnail is require",
                  })}
                  name="thumbnail"
                  id="street-thumbnail"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Image 1
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image1", {
                    required: "product title is require",
                  })}
                  name="image1"
                  id="image1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Image 2
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image2", {
                    required: "product title is require",
                  })}
                  name="image2"
                  id="image2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="image3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Image 3
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image3", {
                    required: "product title is require",
                  })}
                  name="image3"
                  id="image3"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="image4"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Product Image 4
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("image4", {
                    required: "product title is require",
                  })}
                  name="image4"
                  id="image4"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <Link to="/admin">
          {" "}
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
        </Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </Provider>
  );
};

export default ProductForm;
