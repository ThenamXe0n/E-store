import React from "react";
import ProductDetails from "../features/product/component/ProductDetails";
import NavBar from "../features/navBar/NavBar";
import AdminProductDetails from "../features/Admin/components/AdminProductDetails";
const AdminProductsDetailsPage = () => {
  return (
    <NavBar>
      <AdminProductDetails></AdminProductDetails>
    </NavBar>
  );
};

export default AdminProductsDetailsPage;
