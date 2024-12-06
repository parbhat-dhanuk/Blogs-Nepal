import React from 'react'
import Authform from './Authform'

const Login = () => {

    const handleLogin=async(data)=>{
   console.log(data)
    }


  return (
    <Authform type="Login" submit={handleLogin} />
  )
}

export default Login