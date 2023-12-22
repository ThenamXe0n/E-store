import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchProductsByFilter,
  fetchCategories,
  fetchBrands,
  fetchAllProductById,
  createProduct,
} from "./ProductListAPI";
import { updateProducts } from "./ProductListAPI";

const initialState = {
  products: [],
  categories: [],
  brands: [],
  status: "idle",
  totalItems: 0,
  selectedProduct : null,
};

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchProductsByFilterAsync = createAsyncThunk(
  "product/fetchProductsByFilter",
  async ({ filter, sort, pagination,admin }) => {
    const response = await fetchProductsByFilter(filter, sort, pagination,admin);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateProductsAsync = createAsyncThunk(
  'product/updateProducts',
  async (update) => {
    const response = await updateProducts(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const fetchAllProductByIdAsync = createAsyncThunk(
  "product/fetchAllProductById",
  async (id) => {
    const response = await fetchAllProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/createProduct",
  async (productData) => {
    const response = await createProduct(productData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const ProductSlice = createSlice({
  name: " product",
  initialState,
  reducers: {
    clearSelectedProducts: (state) => {
      state.selectedProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.product;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(updateProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex((product)=>product.id === action.payload.id);
        state.products[index]= action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      });
  },
});

export const { clearSelectedProducts } = ProductSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectCategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectedProductbyId = (state) => state.product.selectedProduct;
export const selectedProductListStatus = (state) => state.product.status;

export default ProductSlice.reducer;
