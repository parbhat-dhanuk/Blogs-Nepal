import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectDB=()=>{
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Database connected')
})

}

export default connectDB