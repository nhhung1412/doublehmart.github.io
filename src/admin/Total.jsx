import React from 'react'
import Helmet from '../components/Helmet/Helmet'

import { useGetData } from '../custom-hooks/useGetData'

export const Total = () => {
  const { data: products } = useGetData('products')
  const { data: users } = useGetData('users')


  return (
    <Helmet title="Total">
      <div className="containerDashboard">
        <div className='total'>
          <div className='total__box'>
            <span>Total Sales</span>
            <h2>$7890</h2>
          </div>
          <div className='total__box'>
            <span>Orders</span>
            <h2>890</h2>
          </div>
          <div className='total__box'>
            <span>Total Products</span>
            <h2>{products.length}</h2>
          </div>
          <div className='total__box'>
            <span>Total Users</span>
            <h2>{users.length}</h2>
          </div>
        </div>
      </div>

    </Helmet >
  )
}
