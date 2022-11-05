import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";

import Helmet from "../components/Helmet/Helmet";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const storageRef = ref(storage, `images/ ${Date.now() + userName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // update user profile
            await updateProfile(user, {
              displayName: userName,
              photoURL: downloadURL,
            });
            // store user data in firebase database
            await setDoc(doc(db, "user", user.uid), {
              uid: user.uid,
              displayName: userName,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
      setLoading(false);
      toast.success("Account created succesfully");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong!");
    }
  };
  return (
    <Helmet title="Signup">
      <section>
        <div className="container">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <div className="signup">
              <h3 className="signup__title">Signup</h3>
              <form action="" className="signup__form" onSubmit={signup}>
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="signup__form__input"
                  required
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="signup__form__input"
                  required
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="signup__form__input"
                  required
                />

                <label className="signup__form__input__file">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  Choose your avatar profile
                </label>
                <motion.button
                  whileTap={{ scale: 1.2 }}
                  type="submit"
                  className="signup__form__btn"
                >
                  Create an Account
                </motion.button>
                <p className="signup__form__desc">
                  Already have an account?
                  <Link to="/login"> Login</Link>
                </p>
              </form>
            </div>
          )}
        </div>
      </section>
    </Helmet>
  );
};

export default Signup;
