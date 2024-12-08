import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import otpSlice from "./otpSlice"
import blogSlice from "./blogSlice"


const store= configureStore({

    reducer:{
        auth:authSlice,
        otp:otpSlice,
        blog:blogSlice
    }
})
export default store