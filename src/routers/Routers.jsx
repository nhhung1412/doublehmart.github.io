import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";
import Shop from "../pages/Shop";
import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

import { AddProducts } from "../admin/AddProducts";
import { AllProducts } from "../admin/AllProducts";
import { Total } from "../admin/Total";
import { Dashboard } from "../admin/Dashboard";
import { Users } from "../admin/Users";
import { Orders } from "../admin/Orders";



const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="shop" element={<Shop />} />
      <Route path="shop/:id" element={<ProductDetails />} />
      <Route path="cart" element={<Cart />} />

      <Route path='/*' element={<ProtectedRoute />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="dashboard" element={<Dashboard />} >
          <Route path="total" element={<Total />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="add-products" element={<AddProducts />} />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Route>



      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

    </Routes>
  );
};

export default Routers;
