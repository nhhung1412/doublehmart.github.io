import React from "react";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__content__col1">
            <Link to="home" className="footer__content__col1__logo">
              <div className="footer__content__col1__logo__icon">
                <i className="fa-solid fa-store"></i>
              </div>
              <div className="footer__content__col1__logo__name">
                <span>DoubleH Mart</span>
              </div>
            </Link>

            <div className="footer__content__col1__description">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae aspernatur qui nam similique ullam reprehenderit vel
                obcaecati accusantium tempora provident necessitatibus sit,
                ipsum amet, explicabo praesentium ut perferendis dolor aliquam.
              </p>
            </div>
          </div>
          <div className="footer__content__col2">
            <ul className="footer__content__col2__title">
              <h4>Top Categories</h4>
              <li>
                <Link>
                  <p>Mobile Phones</p>
                </Link>
              </li>
              <li>
                <Link>
                  <p>Modern Sofa</p>
                </Link>
              </li>
              <li>
                <Link>
                  <p>Arm Chair</p>
                </Link>
              </li>
              <li>
                <Link>
                  <p>Smart Watches</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__content__col3">
            <ul className="footer__content__col3__title">
              <h4>Useful Links</h4>
              <li>
                <Link>
                  <p>Shop</p>
                </Link>
              </li>
              <li>
                <Link>
                  <p>Cart</p>
                </Link>
              </li>
              <li>
                <Link>
                  <p>Login</p>
                </Link>
              </li>
              <li>
                <Link>
                  <p>Privacy Policy</p>
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer__content__col4">
            <ul className="footer__content__col4__title">
              <h4> Contact</h4>
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <span> 71 Nguyen Tri Phuong, Da Nang st.</span>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <span> +084123456789</span>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <span> doublehmart@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="copyright">
        Copyright 2022 developed by Huu Hung Ng. All rights reversed
      </p>
    </footer>
  );
};

export default Footer;
