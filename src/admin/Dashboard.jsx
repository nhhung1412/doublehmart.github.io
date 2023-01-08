import React from 'react'
import { AdminNav } from './AdminNav'
import { AdminSidebar } from './AdminSidebar'
import { Outlet } from 'react-router-dom'
export const Dashboard = () => {
    return (
        <div>
            <AdminNav />
            <div className='dashboard'>
                <AdminSidebar />
                <Outlet />
            </div>
        </div>
    )
}
