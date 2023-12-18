import React from "react";
import AdminProductDetails from "../features/Admin/components/AdminProductDetails";
import AdminProductList from "../features/Admin/components/AdminProductList";
import NavBar from "../features/navBar/NavBar";

const AdminHomePage = () => {
  return (
    <NavBar>
      <AdminProductList />
    </NavBar>
  );
};

export default AdminHomePage;
