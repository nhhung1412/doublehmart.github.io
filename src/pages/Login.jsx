import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import Helmet from "../components/Helmet/Helmet";

import { auth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setLoading(false);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      toast.success("Successfully logged in");
      navigate("/checkout");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Login">
      <section>
        <div className="container">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="login">
              <h3 className="login__title">Login</h3>
              <form action="" className="login__form" onSubmit={signIn}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login__form__input"
                  required
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login__form__input"
                  required
                />
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  type="submit"
                  className="login__form__btn"
                >
                  Login
                </motion.button>
                <p className="login__form__desc">
                  Don't have an account?
                  <Link to="/signup"> Create an account</Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </Helmet>
  );
};

export default Login;
