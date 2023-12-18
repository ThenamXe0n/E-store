import React from "react";
import NavBar from "../features/navBar/NavBar";
import ProductList from "../features/product/component/ProductList";

const Home = () => {
  return (
    <div>
      <NavBar>
        {<ProductList></ProductList>}
      </NavBar>
    </div>
  );
};

export default Home;
