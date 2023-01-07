import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase.config";
import { signOut } from "firebase/auth";


import Helmet from "../components/Helmet/Helmet";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({})
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userInputs = [
    {
      id: 'username',
      type: 'text',
      placecholder: 'Enter your username',
    },
    {
      id: 'email',
      type: 'text',
      placecholder: 'Enter your email',
    },
    {
      id: 'password',
      type: 'password',
      placecholder: 'Enter your password'
    }
  ]

  // 
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value })
  }
  // sign up
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fileName = `images/ ${Date.now() + file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      uploadTask.on(
        (error) => {
          toast.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            setData({ ...data, img: downloadURL })
            // update user profile 
            await updateProfile(user, {
              displayName: data.username,
              photoURL: downloadURL,
            });
            // store user data in firebase database
            await setDoc(doc(db, "users", user.uid), {
              ...data,
              photoURL: downloadURL,
              timeStamp: serverTimestamp()
            });
          });
        }
      );
      setLoading(false);
      toast.success("Account created succesfully");
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.message);
        });

    } catch (error) {
      setLoading(false);
      toast.error("something went wrong!");
    }

    return () => {
      signup()
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
                {
                  userInputs.map((input) => (
                    <input

                      id={input.id}
                      type={input.type}
                      placeholder={input.placecholder}
                      onChange={handleInput}
                      className="signup__form__input"
                      required
                    />
                  ))
                }
                <label className="signup__form__input__file">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  Choose your avatar profile
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
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
