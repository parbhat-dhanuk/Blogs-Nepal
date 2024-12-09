import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Protected = ({children}) => {
    const {token}=useSelector((state)=>state.auth)
    const isAuthenticated=token||localStorage.getItem("access-token")

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    }else{
        return(
           <>
            {children}
           </>
        )
    }
  return (
    <div>Protected</div>
  )
}

export default Protected