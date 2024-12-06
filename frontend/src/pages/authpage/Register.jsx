import { useEffect } from 'react'
import Authform from './Authform'
import { useDispatch, useSelector } from 'react-redux'
import { register, setStatus } from '../../redux/authSlice'
import { useNavigate } from 'react-router-dom'
import STATUS from '../../status/status'

const Register = () => {
       const dispatch=useDispatch()
       const navigate=useNavigate()
       const {status}=useSelector((state)=>state.auth)
    const handleRegister=(data)=>{
      dispatch(register(data))
    }

    useEffect(()=>{
        if(status===STATUS.SUCCESS){
          navigate("/login")
          dispatch(setStatus(null))
        }
        },[status])


  return (
    <Authform type="Register" submit={handleRegister}/>
  )
}

export default Register