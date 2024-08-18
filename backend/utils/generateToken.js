import JWT from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVars.js'


export const generateTokenAndSendCookie = (userId, res)=>{
  const token = JWT.sign({userId}, ENV_VARS.JWT_SECRET, 
    {expiresIn: '15d'});

    res.cookie("jwt-netflix", token, {
      maxAge:  15*24*60*60*1000,

      // this is uswed to prevent XSS attcks  cross site scrippting attacks 
      httpOnly: true, 
      secure: ENV_VARS.NODE_ENV !== "developement", // only set cookies over https
      sameSite:"strict"
    })
    return token ;

  }