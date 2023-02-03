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
      </Route>

      <Route path="signup" element={<Signup />} />
      <Route path="login" element={<Login />} />

    </Routes>
  );
};

export default Routers;
