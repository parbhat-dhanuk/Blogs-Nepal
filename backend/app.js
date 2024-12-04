import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/connection.js"
dotenv.config()

const app=express()
const PORT=process.env.PORT||8080

app.get('/',(_,res)=>{
  res.send('i am live')
})

app.listen(PORT,()=>{
    console.log(`Server is running on port:${PORT}`)
    connectDB()
})