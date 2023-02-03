import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db, storage } from '../firebase.config'

import { updateProfile } from "firebase/auth";

import Helmet from "../components/Helmet";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true);
    try {
      setLoading(false);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log(user);
      const fileName = `images/ ${Date.now() + file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        (error) => {
          toast.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

            if (downloadURL) {
              console.log('image: ', file);
              await setDoc(doc(db, 'users', user.uid), {
                displayName: name,
                email: email,
                photoURL: downloadURL,
                timeStamp: serverTimestamp()
              })
              await updateProfile(user, {
                displayName: name,
                photoURL: downloadURL,
              })
            } else {
              console.log('not image url');
              navigate("/signup");
            }
          });
        })




      navigate("/login");
      toast.success("Successfully signed up");
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
    return () => {
      signup()
    }

  }




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
                  value={name}
                  type='text'
                  placeholder='Enter your username'
                  onChange={(e) => setName(e.target.value)}
                  className="signup__form__input"
                  required
                />


                <input
                  value={email}
                  type='text'
                  placeholder='Enter your email'
                  onChange={(e) => setEmail(e.target.value)}
                  className="signup__form__input"
                  required
                />


                <input
                  value={password}
                  type='password'
                  placeholder='Enter your password'
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
                  <img
                    src={file
                      ? URL.createObjectURL(file)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                    alt=""
                  />
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
