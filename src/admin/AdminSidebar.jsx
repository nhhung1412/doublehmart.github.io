import React from 'react'
import { NavLink } from 'react-router-dom'

export const AdminSidebar = () => {

    const adminNav = [
        { display: "Dashboard", path: '/dashboard/total' },
        { display: "All Products", path: '/dashboard/all-products' },
        { display: "Orders", path: '/dashboard/orders' },
        { display: "Users", path: '/dashboard/users' },
    ]

    return (
        <>
            <div className='admin__menu'>
                <div className="admin__menu__navigation">
                    <ul className="admin__menu__navigation__list">
                        {
                            adminNav.map((item, index) => (
                                <li key={index}>
                                    <NavLink className={navClass => navClass.isActive ?
                                        "admin__menu__navigation__list__active" : ''} to={item.path} end>
                                        {item.display}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
