import User from "../models/userModel.js"
import { sendEmail } from "../utils/email.js"
import bcrypt from "bcryptjs"


export const forgetPassword=async (req,res)=>{
    try {
     const {email}=req.body
     if(!email){
         return res.status(401).json({
             message:"please provide email"
         })
     }
     //check if that email registered or not
     const userExist=await User.findOne({email})
     if(!userExist){
         return res.status(401).json({
             message:"Email is not registered"
         })
     }
     //  Send OTP to that email
    const OTP = Math.floor(100000 + Math.random() * 900000).toString();
     userExist.otp=OTP
     await userExist.save()
    sendEmail({
     email:email,
     subject:"password reset",
     message:`OTP code is:${OTP} Don't share to anyone`
    })
    return res.status(200).json({
     message:"OTP sent successfully"
    })
    } catch (error) {
     console.log(error)
     res.status(500).json({error:`Internal server error`})
    }
 
 }
 
 //Verify OTP
 
 export const verifyOTP= async(req,res)=>{
   try {
     const {email,otp}=req.body
     if(!email||!otp){
         return res.status(401).json({
             message:"Please provide email or OTP"
         })
     }
     //Check if that OTP email exist or not
     const userExist=await User.findOne({email})
 if(!userExist){
     return res.status(401).json({
         message:"Email doesn't exist"
     })
 }
 if(userExist.otp!==otp){
 return res.status(401).json({
     message:"Invalid OTP"
 })
 }
 //dispost the OTP so cannot be used next time
 userExist.otp=undefined
 userExist.otpVerified=true
 await userExist.save()
 return res.status(200).json({
     message:"OTP matched"
 })
   } catch (error) {
     console.log(error)
     res.status(500).json({error:`Internal server error`})
   }
 }
 
 //reset password
 
 export const resetPassword=async(req,res)=>{
     try {
         const {email,newPassword,confirmPassword}=req.body
         if(!email||!newPassword||!confirmPassword){
             return res.status(401).json({
                 message:"please provide email,newPassword,confirmPassword"
             })
         }
         if(newPassword!==confirmPassword){
             return res.status(401).json({
                 message:"newPassword & confirmPasword doesn't match"
             })
         }
         const userExist=await User.findOne({email})
         if(!userExist){
             return res.status(401).json({
                 message:"User Email is not registered"
             })
         }
         if(userExist.otpVerified!==true){
             return res.status(403).json({
                 message:"You cannot perform this action"
             })
         }
         userExist.password=bcrypt.hashSync(newPassword,10)
         userExist.otpVerified=false
         await userExist.save()
         return res.status(200).json({
             message:"Password changed successfully"
         })
     } catch (error) {
         console.log(error)
         res.status(500).json({error:`Internal server error`})
     }
 }