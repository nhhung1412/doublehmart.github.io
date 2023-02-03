import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Helmet from "../components/Helmet";
import Services from "../services/Services";
import ProductLists from "../components/UI/ProductLists";
import Clock from "../components/UI/Clock";

import heroImg from "../assets/images/hero-img.png";
import products from "../assets/fake-data/products";
import counterImg from "../assets/images/counter-timer-img.png";


const Home = () => {
  const year = new Date().getFullYear();
  const [trending, setTrending] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // const { data: products, loading } = useGetData('products')

  useEffect(() => {
    const filterTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filterBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );

    const filterMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );

    const filterWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );

    const filterPopularProducts = products.filter(
      (item) => item.category === "watch"
    );

    setTrending(filterTrendingProducts);
    setBestSalesProducts(filterBestSalesProducts);
    setMobileProducts(filterMobileProducts);
    setWirelessProducts(filterWirelessProducts);
    setPopularProducts(filterPopularProducts);
  }, [products]);

  return (
    <>
      <Helmet title={"Home"}>
        <div className="hero">
          <div className="container">
            <div className="hero__section">
              <div className="hero__section__content">
                <p>
                  Trending product in <span>{year}</span>
                </p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Blanditiis nihil excepturi sapiente in accusantium ducimus,
                  aliquid rerum veritatis necessitatibus quisquam minus
                  reiciendis velit molestias repellat animi recusandae, nemo
                  totam at.
                </p>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="hero__section__content__button"
                >
                  <Link to="/shop">shop now</Link>
                </motion.button>
              </div>
              <div className="hero__section__img">
                <img src={heroImg} alt="" />
              </div>
            </div>
          </div>
        </div>
        <Services />
        <div className="products">
          {/* trending product */}
          <div className="container">
            <div className="products__trending">
              <h2 className="products__trending__title">Trending Products</h2>
              <div className="products__trending__lists">
                {loading ? <h1>Loading....</h1> :
                  <ProductLists data={trending} />
                }
              </div>
            </div>
          </div>
          {/* bets sale */}
          <div className="container">
            <div className="products__best-sales">
              <h2 className="products__best-sales__title">Best Sales</h2>
              <div className="products__best-sales__lists">
                {loading ? <h1>Loading....</h1> :
                  <ProductLists data={bestSalesProducts} />
                }
              </div>
            </div>
          </div>
        </div>
        <div className="timer__count">
          <div className="container">
            <div className="timer__count__content">
              <div className="timer__count__content__left">
                <h4>Limited Offer</h4>
                <h3>Quanlity Armchair</h3>
                <Clock />
                <motion.button
                  whileTap={{ scale: 1.1 }}
                  className="timer__count__content__left__btn"
                >
                  <Link to="/shop">Visit Store</Link>
                </motion.button>
              </div>

              <div className="timer__count__content__img">
                <img src={counterImg} alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* new arrivals */}
        <div className="container">
          <div className="new__arrivals">
            <h2 className="new__arrivals__title">New Arrivals</h2>
            <div className="new__arrivals__lists">
              {loading ? <h1>Loading....</h1> :
                <ProductLists data={mobileProducts} />
              }
              {loading ? <h1>Loading....</h1> :
                <ProductLists data={wirelessProducts} />
              }
            </div>
          </div>
        </div>
        {/* popular category */}
        <div className="container">
          <div className="popular__products">
            <h2 className="popular__products__title">Popular in Category</h2>
            <div className="popular__products__lists">
              {loading ? <h1>Loading....</h1> :
                <ProductLists data={popularProducts} />
              }
            </div>
          </div>
        </div>
      </Helmet>
    </>
  );
};

export default Home;
