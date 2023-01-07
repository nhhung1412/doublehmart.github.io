import React from 'react'
import Helmet from '../components/Helmet/Helmet'

import { useGetData } from '../custom-hooks/useGetData'

export const Dashboard = () => {
  const { data: products } = useGetData('products')
  const { data: users } = useGetData('users')
  return (
    <Helmet title="Dashboard">
      <section>
        <div className="container">
          <div className='dashboard'>
            <div className='dashboard__box'>
              <span>Total Sales</span>
              <h2>$7890</h2>
            </div>
            <div className='dashboard__box'>
              <span>Orders</span>
              <h2>890</h2>
            </div>
            <div className='dashboard__box'>
              <span>Total Products</span>
              <h2>{products.length}</h2>
            </div>
            <div className='dashboard__box'>
              <span>Total Users</span>
              <h2>{users.length}</h2>
            </div>
          </div>
        </div>
      </section>
    </Helmet >
  )
}
