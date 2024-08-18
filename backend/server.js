import express from  'express'
import path from  'path'
// this protectRoute fuction basically authenticates the user if it si logged in or not and based on that it gives acces to other routes 
import { protectRoute } from './middleware/protect.route.js'
import authRoutes from  "./routes/auth.route.js"
import movieRoutes from  "./routes/movie.route.js"
import tvRoutes from  "./routes/tv.route.js"
import searchRoutes from  "./routes/search.route.js"


import { ENV_VARS } from './config/envVars.js'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'


const app = express()
const PORT = ENV_VARS.PORT
const __dirname = path.resolve()


app.use(express.json())
app.use(cookieParser())



app.use("/api/v1/auth",authRoutes)
.use("/api/v1/movie",protectRoute,movieRoutes)
.use("/api/v1/tv",protectRoute,tvRoutes)
.use("/api/v1/search",protectRoute,searchRoutes)

if(ENV_VARS.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "frontend","dist")))

  app.get("*", (req, res)=>{    
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})}


app.listen(PORT, (req, res)=>{
  console.log("server started successfully at http://localhost:" + PORT)
  connectDB()
}) 
