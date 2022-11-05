import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import {
  removeFromCart,
  decreaseCart,
  increaseCart,
  clearCart,
  getTotals,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const totalAmount = useSelector((state) => state.cart.cartTotalAmount);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const decreaseItem = (item) => {
    dispatch(decreaseCart(item));
  };

  const increaseItem = (item) => {
    dispatch(increaseCart(item));
  };

  const clearAllItems = () => {
    dispatch(clearCart());
  };

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <div className="container cart">
          {/* show mobile */}
          <div className="cart__mobile">
            {cart.cartItems.length === 0 ? (
              <h1>Your cart is currently empty!</h1>
            ) : (
              <div>
                {cart.cartItems.map((item) => (
                  <div className="cart__mobile__wrapper" key={item.id}>
                    <img src={item.imgUrl} alt="" />

                    <div className="cart__mobile__wrapper__content">
                      <h4>{item.productName}</h4>

                      <div className="cart__mobile__wrapper__content__bottom">
                        <span className="cart__mobile__wrapper__content__bottom__price">
                          ${item.price}
                        </span>
                        <div className="cart__mobile__wrapper__content__bottom__quantity">
                          <motion.span
                            whileTap={{ scale: 1.5 }}
                            onClick={() => increaseItem(item)}
                            className="cart__mobile__wrapper__content__bottom__quantity__plus"
                          >
                            <i className="fa-solid fa-plus qty"></i>
                          </motion.span>
                          <span className="cart__mobile__wrapper__content__bottom__quantity__quantities">
                            {item.cartQuantity}
                          </span>
                          <motion.span
                            whileTap={{ scale: 1.5 }}
                            onClick={() => decreaseItem(item)}
                            className="cart__mobile__wrapper__content__bottom__quantity__minus"
                          >
                            <i className="fa-solid fa-minus qty"></i>
                          </motion.span>
                        </div>
                      </div>
                    </div>
                    <div
                      onClick={() => removeItem(item)}
                      className="cart__mobile__wrapper__remove"
                    >
                      <span style={{ fontSize: "0.7rem" }}>Remove</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="cart__left">
            {cart.cartItems.length === 0 ? (
              <h1>Your cart is currently empty!</h1>
            ) : (
              <table className="pc">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.cartItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.imgUrl} alt="" />
                      </td>
                      <td>{item.productName}</td>
                      <td>${item.price}</td>
                      <td>
                        <div className="quantity">
                          <motion.span
                            whileTap={{ scale: 1.5 }}
                            onClick={() => increaseItem(item)}
                          >
                            <i className="fa-solid fa-plus qty"></i>
                          </motion.span>
                          {item.cartQuantity}
                          <motion.span
                            whileTap={{ scale: 1.5 }}
                            onClick={() => decreaseItem(item)}
                          >
                            <i className="fa-solid fa-minus qty"></i>
                          </motion.span>
                        </div>
                      </td>
                      <td>${item.price * item.cartQuantity}</td>
                      <motion.td
                        whileTap={{ scale: 1.2 }}
                        onClick={() => removeItem(item)}
                      >
                        <i className="fa-regular fa-trash-can trash"></i>
                      </motion.td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="cart__right">
            <div className="sticky">
              <div className="cart__right__header">
                <h5>Subtotal</h5>
                <span>${totalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout!</p>
              <div>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="cart__right__btn"
                >
                  <Link to="/checkout">Check out</Link>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="cart__right__btn"
                  onClick={() => clearAllItems()}
                >
                  Clear Cart
                </motion.button>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="cart__right__btn"
                >
                  <Link to="/shop">Continue Shopping</Link>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Cart;
