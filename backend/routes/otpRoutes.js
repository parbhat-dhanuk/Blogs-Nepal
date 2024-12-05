import express from "express"
import { forgetPassword, resetPassword, verifyOTP } from "../controllers/passwordReset.js"

const router=express.Router()

router.post('/forgetPassword', forgetPassword)
router.post('/verifyotp', verifyOTP)
router.post('/resetpassword', resetPassword)


export default router