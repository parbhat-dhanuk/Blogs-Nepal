import React, { useEffect } from 'react'
import Authform from './Authform'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, setStatus } from '../../redux/authSlice'
import STATUS from '../../status/status'

const Login = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {status}=useSelector((state)=>state.auth)

    const handleLogin=(data)=>{
      dispatch(login(data))
    }


    useEffect(()=>{
      if(status===STATUS.SUCCESS){
        dispatch(setStatus(null))
        navigate("/blogs")
        
      }
    },[status])

  return (
    <Authform type="Login" submit={handleLogin} />
  )
}

export default Login