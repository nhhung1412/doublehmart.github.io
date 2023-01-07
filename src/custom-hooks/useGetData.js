import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { collection, onSnapshot } from "firebase/firestore";

export const useGetData = (collectionName) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const collectionRef = collection(db, collectionName)

    useEffect(() => {
        //  firebase firestore realtime update
        const getData = onSnapshot(collectionRef, (snapshot) => {
            try {
                setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            } catch (error) {
                throw new Error(error)
            }
        });
        return () => {
            getData();
        }
    }, [])

    return { data, loading }
}
