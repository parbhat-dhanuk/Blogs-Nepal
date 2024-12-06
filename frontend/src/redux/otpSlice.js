import { createSlice } from "@reduxjs/toolkit";
import STATUS from "../status/status";
import API from "../http";


const otpSlice=createSlice({
    name:"otp",
    initialState:{
        user:"",
        token:null,
        status:null
    },
    reducers:{
        setUser(state,action){
            state.user=action.payload
        },
        setStatus(state,action){
           state.status=action.payload
        },
        setToken(state,action){
            state.token=action.payload
        }
    }
})

export const {setUser,setStatus,setToken}=otpSlice.actions

export default otpSlice.reducer





//forgetpassword

export function forgetpassword(data){
  return async function forgetpasswordThunk(dispatch){
    try {
      dispatch(setStatus(STATUS.LOADING))
      const response=await API.post('/forgetPassword',data)
      if(response.status===200){
        dispatch(setUser(data))
        dispatch(setStatus(STATUS.SUCCESS))
      }

    } catch (error) {
        dispatch(setStatus(STATUS.ERROR))
    }
  }
}


// otp verify

export function otpverify(data){
  return async function otpverifyThunk(dispatch){
    try {
      dispatch(setStatus(STATUS.LOADING))
     const response= await API.post('/verifyotp',data)
     if(response.status===200){
      dispatch(setStatus(STATUS.SUCCESS))
     }

    } catch (error) {
        dispatch(setStatus(STATUS.ERROR))
    }
  }
}

// change password

export function changepassword(data){
  return async function changepasswordThunk(dispatch){
    try {
      dispatch(setStatus(STATUS.LOADING))
      const response=await API.post('/resetpassword',data)
      if(response.status===200){
        dispatch(setStatus(STATUS.SUCCESS))
      }
    } catch (error) {
        dispatch(setStatus(STATUS.ERROR))
    }
  }
}
