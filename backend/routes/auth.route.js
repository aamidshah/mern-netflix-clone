
import express from "express"
const router = express.Router()
import { logIn, signUp,logOut,athCheck}   from "../controller/auth.controller.js"
import {protectRoute} from '../middleware/protect.route.js';

// routes 
router.post("/signup", signUp)
router.post("/login", logIn)
router.post("/logout",logOut) 

router.post("/authcheck",protectRoute, athCheck) 


export default router