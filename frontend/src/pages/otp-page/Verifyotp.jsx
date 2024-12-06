import { useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {  otpverify, setStatus } from "../../redux/otpSlice"
import { Link, useNavigate } from "react-router-dom"
import STATUS from "../../status/status"


const Verifyotp = () => {
  const {user,status}=useSelector((state)=>state.otp)
  const dispatch=useDispatch()
  const navigate=useNavigate()
 
const [otp,setOtp]=useState({
  email:user.email,
  otp:""
})

const handleChange=(e)=>{
  setOtp({
    ...otp,
    [e.target.name]:e.target.value
  })
}


const handleSubmit=(e)=>{
e.preventDefault()
dispatch(otpverify(otp))
}

useEffect(()=>{
  if(status===STATUS.SUCCESS){
    navigate("/changepassword")
    dispatch(setStatus(null))
  }
},[status])

  return (
   
  
<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>OTP Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email {user?.email}</p>
        </div>
      </div>

      <div>
        <form >
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            <div className="relative">
                  <input onChange={handleChange} type="text"  name="otp" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm" required aria-describedby="email-error" />
                </div>
            </div>

            <div className="flex flex-col space-y-5">
              <div>
                <button onClick={handleSubmit} className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                  Verify OTP
                </button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p> <Link className="flex flex-row items-center text-blue-600" to="/forgetpassword" >Resend</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default Verifyotp