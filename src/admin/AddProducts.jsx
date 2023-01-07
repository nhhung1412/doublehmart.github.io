import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'

import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'

import { useNavigate } from 'react-router-dom'

export const AddProducts = () => {

  const [enterTitle, setEnterTitle] = useState('')
  const [enterShortDesc, setEnterShortDesc] = useState('')
  const [enterDescription, setEnterDescription] = useState('')
  const [enterPrice, setEnterPrice] = useState('')
  const [enterCategory, setEnterCategory] = useState('')
  const [enterProductImg, setEnterProductImg] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const addProduct = async (e) => {
    e.preventDefault()
    setLoading(true)
    // add product to the firebase database
    try {
      const fileName = `productImages/${Date.now() + enterProductImg.name}`
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

      uploadTask.on(
        () => {
          toast.error('images not uploaded')
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, 'products'), {
              title: enterTitle,
              shortDesc: enterShortDesc,
              description: enterDescription,
              price: enterPrice,
              category: enterCategory,
              productImg: downloadURL,
            })
          })
        })
      setLoading(false)
      toast.success("product successfully added!")
      navigate("/dashboard/all-products")
    } catch (error) {
      setLoading(false)
      toast.error('product not added')
    }
  }

  return (
    <Helmet title="Add Product">
      <section>
        <div className="container">
          <form className='addProducts' onSubmit={addProduct}>
            {loading ? <h1>Loading...</h1> : (
              <>
                <h4 className='addProducts__title'>Add Product</h4>

                <div className="addProducts__formGroup">
                  <span className='addProducts__formGroup__title'>Product title</span>
                  <input required type="text" placeholder='Double Soda' value={enterTitle} onChange={e => setEnterTitle(e.target.value)} />
                </div>

                <div className="addProducts__formGroup">
                  <span className='addProducts__formGroup__title'>Short Description</span>
                  <input required type="text" placeholder='Lorem....' value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} />
                </div>

                <div className="addProducts__formGroup">
                  <span className='addProducts__formGroup__title'>Description</span>
                  <input required type="text" placeholder='Description' value={enterDescription} onChange={e => setEnterDescription(e.target.value)} />

                </div>

                <div className="addProducts__formGroup">
                  <div>
                    <span className='addProducts__formGroup__title'>Price</span>
                    <input required type="number" placeholder='$100' value={enterPrice} onChange={e => setEnterPrice(e.target.value)} />
                  </div>
                  <div>
                    <span className='addProducts__formGroup__title'>Category</span>
                    <select required name="" id="" value={enterCategory} onChange={e => setEnterCategory(e.target.value)}>
                      <option>Select Category</option>
                      <option value="chair">Chair</option>
                      <option value="sofa">Sofa</option>
                      <option value="mobile">Mobile</option>
                      <option value="watch">Watch</option>
                      <option value="wireless">Wireless</option>
                    </select>
                  </div>
                </div>

                <div className="addProducts__formGroup">
                  <span className='addProducts__formGroup__title'>Product Image</span>
                  <label>
                    <input type="file" onChange={e => setEnterProductImg(e.target.files[0])} />
                    <img alt='' src={enterProductImg ? URL.createObjectURL(enterProductImg) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} />
                  </label>
                </div>

                <motion.button whileTap={{ scale: 1.2 }} className='addProducts__btn' type='submit'>
                  Add Product
                </motion.button>
              </>
            )}


          </form>
        </div>
      </section>
    </Helmet>
  )
}
