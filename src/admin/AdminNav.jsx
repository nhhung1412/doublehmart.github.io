import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom';

import { motion } from "framer-motion";

import useAuth from '../custom-hooks/useAuth'

export const AdminNav = () => {

  const headerRef = useRef(null)
  const { currentUser } = useAuth()

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

  return (
    <div className='wrapper'>
      <header ref={headerRef} className="headerNav">
        <div className="container">
          <div className='AdNav'>
            <NavLink to="/" className="AdNav__logo">
              <div className="AdNav__logo__icon">
                <i className="fa-solid fa-store"></i>
              </div>
              <div className="AdNav__logo__name">
                <span>DoubleH Mart</span>
              </div>
            </NavLink>

            <div className='AdNav__search'>
              <input type="search" placeholder='Search....' />
              <span >
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>

            <div className="AdNav__icons">
              <span className="AdNav__icons__bell">
                <motion.i
                  whileTap={{ scale: 1.2 }}
                  className="fa-regular fa-bell"
                ></motion.i>
              </span>

              <span className="AdNav__icons__gear">
                <motion.i
                  whileTap={{ scale: 1.2 }}
                  className="fa-solid fa-gear"
                ></motion.i>
              </span>

              <div className="AdNav__icons__profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser && currentUser.photoURL}
                />
              </div>

            </div>
          </div>
        </div>
      </header >
    </div>
  )
}
