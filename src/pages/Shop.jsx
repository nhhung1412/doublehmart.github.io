import React, { useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import ProductLists from "../components/UI/ProductLists";

import products from "../assets/fake-data/products";
const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    const filteredProducts = products.filter(
      (item) => item.category === filterValue
    );
    setProductsData(filteredProducts);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    const searchedProducts = products.filter(
      (item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category === searchTerm
    );

    setProductsData(searchedProducts);
  };
  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <div className="container">
          <div className="shop">
            <div className="shop__filter">
              <select onChange={handleFilter}>
                <option value="all">Filter By Category</option>
                <option value="sofa">Sofa</option>
                <option value="mobile">Mobile</option>
                <option value="chair">Chair</option>
                <option value="watch">Watch</option>
                <option value="wireless">Wireless</option>
              </select>
            </div>
            <div className="shop__filter">
              <select>
                <option>Sort By</option>
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
            <div className="shop__search" onChange={handleSearch}>
              <input type="search" placeholder="Search...." />
              <span>
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="shop__products">
            {productsData.length === 0 ? (
              <h1>No products are found!</h1>
            ) : (
              <ProductLists data={productsData} />
            )}
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Shop;
