import {User} from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { generateTokenAndSendCookie } from '../utils/generateToken.js';

export const signUp = async (req,res)=>{
  try {
    const{email,password, username} = req.body
    if(!email || !password || !username){
      return res.status(404).json({
        success:false, message: "All feilds are required "
      })
    }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        return res.status(400).json({success:false, message:"invalid Email"})
      }

      if (password.length <6){
        return res.status(400).json({success:false, message:"Password must be at least 6 characters "})
      }

      const existingUserByEmail = await User.findOne({email:email})
      if(existingUserByEmail){
        return res.status(400).json({success:false, message:"Email already exists"})
      }
    
      const existingUserByUsername = await User.findOne({username:username})
      if(existingUserByUsername){
        return res.status(400).json({success:false, message:"Username already exists"})
      }

// it is used to hash the password fro security purpose
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)



      const PROFILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
      const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

      // now create a user in db 
      const newUser = new User({
        email,
        password:hashedPassword,
        username,
        image
      })

     
      generateTokenAndSendCookie(newUser._id, res);
        await newUser.save()
         
        // remove passworfd from response 
        res.status(201).json({success:true, message:"User created successfully", user: {
          ...newUser._doc,
        password: "",
      } })
           
    

  } catch (error) {
    res.status(500).send({success:false , message:"Internal Server Error"})
    
  }
}


export const logIn = async (req,res)=>{
  try {

    const {email, password} = req.body;

    if(!email || !password){
      return res.status(404).json({success:false, message: "All feilds are required "})
    }
      const user = await User.findOne({email:email})
      if(!user){
      return res.status(404).json({success:false, message: "invalid credentials"})

    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    generateTokenAndSendCookie(user._id,res);

    res.status(201).json({success:true, message:"logged in  successfully", 
      user: {
      ...user._doc,
    password: ""
  }
  } )


  } catch (error) {
    console.error(error.message)
    res.status(500).send({success:false, message:"Internal Server Error"})
    
  }
}



export const logOut = async (req,res)=>{
  

  try {
    // destroy the cookie
    res.clearCookie("jwt-netflix")
    res.status(200).json({success:true, message: "Logged out successfully"})
   
    
  } catch (error) {
    console.log("error in logout controller", error.message)
    res.status(400).json({success:false, message: "internal server error"})
    
  }
  
}

export const athCheck = async(req, res)=>{
  try {
    res.status(200).json({success:true, user: req.user})
    
  } catch (error) {
    console.log("error in authcheck controller", error.message)
    res.status(500).json({success:false, message: "Internal server error"})
    
  }
}