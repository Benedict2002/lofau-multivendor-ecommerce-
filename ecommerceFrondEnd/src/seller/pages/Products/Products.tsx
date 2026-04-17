import React from "react";
import AddProduct from "./AddProduct";
import ProductTable from "./ProductTable";

const Products = () => {
  return (
    <div>
      {" "}
      <h1 className="font-bold text-xl mb-5"> All Products</h1>
      <ProductTable />
    </div>
  );
};

export default Products;
