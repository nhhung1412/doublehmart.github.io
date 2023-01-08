import React, { useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { motion } from "framer-motion";
import userIcon from "../../assets/images/user-icon.png";

import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";

import { getTotals } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    });
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleToggleMenu = () => {
    menuRef.current.classList.toggle("activeMenu");
  };
  const toggleActionProfile = () => {
    profileRef.current.classList.toggle("showActionProfile");
  };

  const mainNav = [
    {
      display: "home",
      path: "home",
    },
    {
      display: "shop",
      path: "shop",
    },
    {
      display: "cart",
      path: "cart",
    },
  ];

  return (
    <>
      <header ref={headerRef}>
        <div className="container">
          <div className="nav">
            <NavLink to="home" className="nav__logo">
              <div className="nav__logo__icon">
                <i className="fa-solid fa-store"></i>
              </div>
              <div className="nav__logo__name">
                <span>DoubleH Mart</span>
              </div>
            </NavLink>

            <div className="nav__menu" ref={menuRef}>
              <ul className="nav__menu__lists" onClick={handleToggleMenu}>
                {mainNav.map((item, index) => (
                  <NavLink
                    to={item.path}
                    key={index}
                    className="navv__menu__lists__item"
                  >
                    <li>
                      <span>{item.display}</span>
                    </li>
                  </NavLink>
                ))}
              </ul>
              <div className="nav__menu__close">
                <span onClick={handleToggleMenu}>
                  <i className="fa-regular fa-circle-xmark"></i>
                </span>
              </div>
            </div>

            <div className="nav__icons">
              <span className="nav__icons__fav">
                <motion.i
                  whileTap={{ scale: 1.2 }}
                  className="fa-regular fa-heart"
                ></motion.i>
                <span className="nav__icons__badge">1</span>
              </span>

              <span className="nav__icons__cart">
                <Link to="/cart">
                  <motion.i
                    whileTap={{ scale: 1.2 }}
                    className="fa-solid fa-bag-shopping"
                  ></motion.i>
                </Link>

                <span className="nav__icons__badge">
                  {cart.cartTotalQuantity}
                </span>
              </span>

              <div className="nav__icons__profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt=""
                  onClick={toggleActionProfile}
                />
                <div
                  className="nav__icons__profile__actions"
                  onClick={toggleActionProfile}
                  ref={profileRef}
                >
                  {currentUser ? (
                    <div className="nav__icons__profile__actions__logout">
                      <h5>
                        Username: <span>{currentUser.displayName}</span>
                      </h5>
                      <h5>
                        Email: <span>{currentUser.email}</span>
                      </h5>
                      <motion.button whileTap={{ scale: 1.1 }} onClick={logout}>
                        Logout
                      </motion.button>
                      <motion.button whileTap={{ scale: 1.1 }}>
                        <Link to="/dashboard/total">
                          Dashboard
                        </Link>
                      </motion.button>
                    </div>
                  ) : (
                    <div className="nav__icons__profile__actions__logsign">
                      <motion.button whileTap={{ scale: 1.1 }}>
                        <Link to="/login">Login</Link>
                      </motion.button>
                      <motion.button whileTap={{ scale: 1.1 }}>
                        <Link to="/signup">Signup</Link>
                      </motion.button> <motion.button whileTap={{ scale: 1.1 }}>
                        <Link to="/dashboard/total">Dashboard</Link>
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>

            </div>
            <div
              className="nav__icons__mobile__menu"
              onClick={handleToggleMenu}
            >
              <span>
                <i className="fa-solid fa-bars"></i>
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
