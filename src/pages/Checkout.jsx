import React, { useRef } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import Helmet from "../components/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/slices/cartSlice";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const addressRef = useRef("");
  const cityRef = useRef("");
  const postalRef = useRef("");
  const countryRef = useRef("");

  const submit = (e) => {
    e.preventDefault();
    let checkoutProfile = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      postal: postalRef.current.value,
      country: countryRef.current.value,
    };
    setTimeout(() => {
      console.log(checkoutProfile);
      document.submit.reset();
      dispatch(clearCart());
    }, 2000);
    const resolveAfter2Sec = new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );
    toast.promise(resolveAfter2Sec, {
      pending: "Please wait....",
      success: "Ordered succesfully",
      error: "Ordered unsuccesfully",
    });
  };
  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <div className="container">
          <div className="grid">
            <div className="col-08">
              <h5>Billing Information</h5>
              <form id="submit" name="submit" onSubmit={submit}>
                <input
                  ref={nameRef}
                  type="text"
                  placeholder="Enter your name"
                  required
                />
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <input
                  ref={phoneRef}
                  type="text"
                  placeholder="Phone number"
                  required
                />
                <input
                  ref={addressRef}
                  type="text"
                  placeholder="Street address"
                  required
                />
                <input ref={cityRef} type="text" placeholder="City" required />
                <input
                  ref={postalRef}
                  type="text"
                  placeholder="Postal Code"
                  required
                />
                <input
                  ref={countryRef}
                  type="text"
                  placeholder="Country"
                  required
                />
              </form>
            </div>
            <div className="col-04">
              <div className="checkout__cart">
                <h5>
                  Total Item:
                  <span>{cart.cartTotalQuantity}</span>
                </h5>
                <h5>
                  Subtotal:<span>${cart.cartTotalAmount}</span>
                </h5>
                <h5>
                  Shipping:<span>$20</span>
                </h5>
                <h3>
                  Total cost:<span>${cart.cartTotalAmount + 20}</span>
                </h3>
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="checkout__cart__btn"
                  form="submit"
                >
                  Place an order
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Checkout;
