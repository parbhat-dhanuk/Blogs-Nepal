import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import otpSlice from "./otpSlice"


const store= configureStore({

    reducer:{
        auth:authSlice,
        otp:otpSlice
    }
})
export default store