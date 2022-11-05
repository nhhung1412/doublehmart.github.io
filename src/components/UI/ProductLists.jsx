import React from "react";
import ProductCard from "./ProductCard";

const ProductLists = ({ data }) => {
  return (
    <>
      {data.map((item, index) => (
        <ProductCard key={index} item={item} />
      ))}
    </>
  );
};

export default ProductLists;
