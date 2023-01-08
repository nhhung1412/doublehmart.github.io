import React from 'react'
import { useGetData } from '../custom-hooks/useGetData'
import { motion } from 'framer-motion'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'


export const AllProducts = () => {

  const { data, loading } = useGetData('products')
  const navigate = useNavigate()

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success('Deleted successfully')
    } catch (error) {
      toast.error(error.message)
    }

  }
  return (
    <Helmet title="All Products">

      <div className='containerDashboard'>
        {
          data.map(item => (
            <div key={item.id} className="allProducts__mobile">
              <img src={item.productImg} alt="" />
              <div className='allProducts__mobile__content'>
                <div ><span>Product: </span>{item.title}</div>
                <div ><span>Category: </span>{item.category}</div>
                <div ><span>Price: </span>{item.price}$</div>
                <motion.button className='allProducts__mobile__content__btn' whileTap={{ scale: 1.2 }} onClick={() => deleteProduct(item.id)}>Remove</motion.button>
              </div>
            </div>
          ))
        }


        <div className='allProducts'>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                loading ? <h1>Loading...</h1> : (
                  data.map(item => (
                    <tr key={item.id}>
                      <td>
                        <img src={item.productImg} alt="" />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.category}</td>
                      <td>{item.price}$</td>
                      <td><motion.button whileTap={{ scale: 1.2 }} onClick={() => deleteProduct(item.id)}>Remove</motion.button></td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
        <motion.button whileTap={{ scale: 1.2 }} className='addProduct_btn' onClick={() => navigate('/dashboard/add-products')}>
          Add New Product
        </motion.button>
      </div>


    </Helmet>
  )
}
