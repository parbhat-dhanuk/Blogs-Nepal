import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Authform = ({type,submit}) => {
const [data,setData]=useState({
  email:"",
  username:"",
  password:"",
  confirmPassword:""
})



const [visiblePassword,setVisiblePassword]=useState(false)
const [visibleconfirmPassword,setVisibleconfirmPassword]=useState(false)

const[passwordError,setPasswordError]=useState()

const{message} = useSelector((state)=>state.auth)

const [email, setEmail] = useState('');
 



const handleChange=(e)=>{
  setData({
    ...data,
    [e.target.name]:e.target.value.trim()
    
  })
}

const handleSubmit = (e)=>{
  e.preventDefault()
  {type==="Login"&&(submit(data))}
  if(data.password !== data.confirmPassword){
    setPasswordError({
      ...passwordError,
      message:"**password and confirm password didn't match**"
    })
    return
  }

  const emailPattern = /^\S+@\S+\.\S+$/
  if (!data.email.match(emailPattern)) {
    setEmail({
      ...email,
      message:'**Please enter a valid email address**'
    });
    return
  }
  submit(data)
}

  return (
    <>
    <div className="font-[sans-serif] bg-white max-w-4xl flex items-center mx-auto md:h-screen p-4">
    

      <div className="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
        <div className="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
          <div>
            <h4 className="text-white text-lg font-semibold">{type==="Register"?"Create Your Account":"Login Your Account"}</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">{type==="Register"?"Welcome to our registration page! Get started by creating your account":"Welcome to our login page! Get started by login your account"}.</p>
          </div>
          {type==="Register"&&(<div>
            <h4 className="text-white text-lg font-semibold">Simple & Secure Registration</h4>
            <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">Our registration process is designed to be straightforward and secure. We prioritize your privacy and data security.</p>
          </div>)}
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-2 w-full py-6 px-6 sm:px-16">
          <div className="mb-6">

            {/* email validation */}
    <p className='text-red-500 text-2xl mx-20'>{message}</p>
            <h3 className="text-gray-800 text-2xl font-bold">{type==="Register"?"Create an accoun":"Login an accoun"}t</h3>
          </div>

          <div className="space-y-6">
           
          {type==="Register"?(<><div>
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <div className="relative flex items-center">
                <input onChange={handleChange} name="email" type="email"  className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" required />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>

              {/* email validation */}
              <p className='text-red-500 text-sm'>{email?.message}</p>
            </div>


            <div>
              <label className="text-gray-800 text-sm mb-2 block">Name</label>
              <div className="relative flex items-center">
                <input onChange={handleChange} name="username" type="text" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter name" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            

            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input onChange={handleChange}  name="password" type={visiblePassword?"text":"password"}  required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />
                <svg onClick={()=>setVisiblePassword(!visiblePassword)}  xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                 
                {
                  visiblePassword?(
                    <>
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                    <path d="M8 8l112 112" stroke="currentColor" stroke-width="4" />
                    </>
                  ):(<path  d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>)
                 }
                </svg>
                
              </div>
            </div>


            <div>
              <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <div className="relative flex items-center">
                <input onChange={handleChange}  name="confirmPassword" type={visibleconfirmPassword?"text":"password"} required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Confirm password" />


                <svg onClick={()=>setVisibleconfirmPassword(!visibleconfirmPassword)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                 
                  
                  {
                  visibleconfirmPassword?(
                    <>
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                    <path d="M8 8l112 112" stroke="currentColor" stroke-width="4" />
                    </>
                  ):(<path  d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>)
                 }
          
               
                </svg>
              </div>

               {/* password error */}
               <p className='text-red-500 text-sm'>{passwordError?.message}</p>
            </div>
            </>):(<>
              <div>
              
              <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
              <div className="relative flex items-center">
                <input onChange={handleChange} name="email" type="email" required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter email" />
                <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                    <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                    <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                  </g>
                </svg>
              </div>
              
            </div>


            <div>
              <label className="text-gray-800 text-sm mb-2 block">Password</label>
              <div className="relative flex items-center">
                <input onChange={handleChange} name="password" type={visiblePassword?"text":"password"}  required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="Enter password" />
                <svg onClick={()=>setVisiblePassword(!visiblePassword)} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                  
                {
                  visiblePassword?(
                    <>
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                    <path d="M8 8l112 112" stroke="currentColor" stroke-width="4" />
                    </>
                  ):(<path  d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>)
                 }
                </svg>
              </div>

            </div>
            </>)}

            {type==="Login"&& (
              <div className="flex items-center">
              
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                <Link to="/forgetpassword" className="text-blue-600 font-semibold hover:underline ml-1">Forget Password ?</Link>
              </label>
            </div>
            )}
          </div>
          
          <div className="!mt-8">
            <button  type="submit" className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none">
              {type==="Register"?"Create an account":"Login account"}
            </button>
            
          </div>
          <p className="text-gray-800 text-sm mt-6 text-center">{type==="Register"?<p>Already have an account?</p>:<p>Don't have an account?</p>}{type==="Register"? (<Link to="/login" className="text-blue-600 font-semibold hover:underline ml-1">Login here</Link>):( <Link to="/register" className="text-blue-600 font-semibold hover:underline ml-1">Register here</Link>)}</p>
        
        </form>
      </div>
    </div>
    </>
  )
}

export default Authform