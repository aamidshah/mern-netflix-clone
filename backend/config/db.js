import mongoose from "mongoose";

import { ENV_VARS } from "./envVars.js";

export const connectDB = async()=>{

  try {
    const con = await mongoose.connect(ENV_VARS.MONGO_URI)
    console.log("mongodb connected successfully " + con.connection.host)

    
  } catch (error) {
    console.log("error connceting to db " + error.message)
    process.exit(1) ;
    // 1 means ther was an error connectiong to db 
  }

} 