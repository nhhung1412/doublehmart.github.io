import React, { useState, useRef, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
// import {useSelector } from "react-redux";

import { motion } from "framer-motion";
import { addToCart } from "../redux/slices/cartSlice";

import Helmet from "../components/Helmet";
import ProductLists from "../components/UI/ProductLists";


import products from "../assets/fake-data/products";
const ProductDetails = () => {


  // const { data: reviews } = useGetData('reviews')

  const [rating, setRating] = useState(0);
  const [expand, setExpand] = useState(false);
  const [tab, setTab] = useState("desc");

  const reviewUser = useRef("");
  const reviewMsg = useRef("");

  const { id } = useParams();

  const product = products.find(item => item.id === id)

  const dispatch = useDispatch();




  const addItem = () => {
    dispatch(addToCart(product));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTimeout(() => {
      document.submit.reset();
    }, 2000);

    const resolveAfter2Sec = new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );
    toast.promise(resolveAfter2Sec, {
      pending: "Please wait....",
      success: "Added succesfully",
      error: "Added unsuccesfully",
    });
  };

  const relatedProducts = products.filter((e) => e.category === product.category);

  const desRef = useRef(null);
  const hanldeExpand = () => {
    setExpand(!expand);
    if (desRef && expand === true) {
      const desElement = desRef.current;
      const bodyRectTop = document.body.getBoundingClientRect().top;
      const descRectTop = desElement.getBoundingClientRect().top;
      const offset = descRectTop - bodyRectTop;
      window.scrollTo(0, offset);
    }
  };

  return (
    <Helmet title={product.title}>
      <div className="container pt-40">
        <div className="productDetail">
          <div className="productDetail__img">
            <img src={product.imgUrl} alt="" />
          </div>
          <div className="productDetail__content">
            <h2>{product.productName}</h2>
            <h3>{product.category}</h3>
            <div className="productDetail__content__rating">
              <ReactStars
                count={5}
                value={rating}
                size={40}
                isHalf={true}
                edit={false}
                color="#b1b1b1"
                activeColor="#0a1d37"
              />
              <p>
                (<span>{product.avgRating}</span> ratings)
              </p>
            </div>
            <span className="productDetail__content__price">${product.price}</span>
            <p className="productDetail__content__shortDesc">{product.shortDesc}</p>
            <motion.button
              whileTap={{ scale: 1.2 }}
              type="button"
              className="productDetail__content__btn"
              onClick={addItem}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>

      <div className="container pt-40">
        <div className="tab" ref={desRef}>
          <div className="tab__wrapper">
            <h6
              className={`${tab === "desc" ? "active__tab" : ""}`}
              onClick={() => setTab("desc")}
            >
              Description
            </h6>
            <h6
              className={`${tab === "rev" ? "active__tab" : ""}`}
              onClick={() => setTab("rev")}
            >
              Reviews({products.reviews.length})
            </h6>
          </div>
          {tab === "desc" ? (
            <div className={`tab__content ${expand ? "expand" : ""}`}>
              <p>{product.description}</p>
              <button
                className="tab__content__toggleBtn"
                onClick={hanldeExpand}
              >
                {expand ? "Thu gọn" : "Xem thêm"}
              </button>
            </div>
          ) : (
            <div className="tab__review">
              <div className="tab__review__wrapper">
                <ul>
                  {
                    products.reviews.map((item) => (
                      <li key={item.id}>
                        <h3>{item.userName}</h3>
                        <span>({item.rating} ratings)</span>
                        <p>{item.message}</p>
                      </li>
                    ))
                  }

                </ul>
              </div>
              <hr />
              <div className="tab__review__form">
                <h3>Leave your experience</h3>
                <form name="submit" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    ref={reviewUser}
                    required
                  />
                  <ReactStars
                    a11y={true}
                    count={5}
                    value={rating}
                    size={25}
                    isHalf={true}
                    edit={true}
                    color="#b1b1b1"
                    activeColor="#0a1d37"
                    onChange={(newValue) => {
                      setRating(newValue);
                    }}
                  />
                  <textarea
                    row={4}
                    type="text"
                    placeholder="Review message..."
                    ref={reviewMsg}
                    required
                  />
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    type="submit"
                    className="productDetail__content__btn"
                  >
                    Submit
                  </motion.button>
                </form>
              </div>
            </div>
          )}
        </div>
        <div className="other pt-40">
          <h2 className="other__title">You might also like</h2>
          <div className="other__products">
            <ProductLists data={relatedProducts} />
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ProductDetails;
