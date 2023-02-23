import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './layaout/Header';


const ProtectedRoutes = () => {

    const nameTrainer = useSelector(store => store.nameTrainer);

    if(nameTrainer) {
        return (
            <>
                
                <Header/>
                <Outlet />
            </>
        )
    }else {
        return <Navigate to="/"/>
    }

}

export default ProtectedRoutes