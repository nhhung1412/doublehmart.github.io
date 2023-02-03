import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/slices/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addItem = () => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <div className="product__card">
        <Link to={`/shop/${item.id}`}>
          <div className="product__card__img">
            <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" onClick={() => window.scrollTo(0, 0)} />
          </div>
        </Link>
        <div className="product__card__contents">
          <div className="product__card__contents__top">
            <h3 >
              {item.productName}
            </h3>
            <span>{item.category}</span>
          </div>
          <div className="product__card__contents__bottom">
            <h3>${item.price}</h3>
            <motion.span whileTap={{ scale: 1.2 }} onClick={addItem}>
              <i className="fa-solid fa-plus"></i>
            </motion.span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
