import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import otpSlice from "./otpSlice"
import blogSlice from "./blogSlice"
import commentSlice from "./commentSlice"


const store= configureStore({

    reducer:{
        auth:authSlice,
        otp:otpSlice,
        blog:blogSlice,
        comment:commentSlice
    }
})
export default store