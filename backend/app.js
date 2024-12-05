import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import connectDB from "./database/connection.js"
import userRouter from "./routes/userRoutes.js"
import blogRouter from "./routes/blogRoutes.js"
import otpRouter from "./routes/otpRoutes.js"

dotenv.config()

const app=express()
const PORT=process.env.PORT||8080

app.use(express.json())  // to parse the json file
// app.use(express.urlencoded({extended:true})) //yo code le chai data form bata aayo vane ni handle gar vaneko
app.use(cookieParser())  // to verify the token from cookie

app.use(cors({
  origin: '*',
  credentials: true                         
}));

app.use('/', userRouter)
app.use('/',blogRouter)
app.use('/',otpRouter)


app.listen(PORT,()=>{
    console.log(`Server is running on port:${PORT}`)
    connectDB()
})