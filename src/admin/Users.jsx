import React from 'react'
import { useGetData } from '../custom-hooks/useGetData'
import { motion } from 'framer-motion'
import { db } from '../firebase.config'
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import Helmet from '../components/Helmet/Helmet'

export const Users = () => {
    const { data, loading } = useGetData('users')

    const deleteUser = async (id) => {
        try {
            await deleteDoc(doc(db, "users", id));
            toast.success('Deleted successfully')
        } catch (error) {
            toast.error(error.message)
        }

    }
    return (
        <Helmet title="Users">
            <section>
                <div className='container'>
                    <div className='allUsers'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loading ? <h1>Loading...</h1> : (
                                        data?.map(user => (
                                            <tr key={user.id}>
                                                <td>
                                                    <img src={user.photoURL} alt="" />
                                                </td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td><motion.button whileTap={{ scale: 1.2 }} onClick={() => deleteUser(user.id)}>Remove</motion.button></td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Helmet>
    )
}
