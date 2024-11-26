import express from 'express';
import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import "../utils/dbConnect.js";
import { loginValidation, registerValidation, validationErrorResult } from '../middlewares/validation/validations.js';
import sendMail from '../utils/sendMail.js';
import redisClient from '../utils/redisClient.js';
import sendSMS from '../utils/sendSMS.js';


let userRouter = express.Router();





// Login Route
userRouter.post("/login", loginValidation, validationErrorResult, async (req, res) => {
    try {
      const { email } = req.body;
  
      let user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const randomString = (Math.random().toString().slice(2, 8));

      // console.log(randomString);
      
      await redisClient.set(`otp_${email}`, randomString,  { EX: 10 * 60 })

      sendMail({toAddress : email, subject : `OTP - ${randomString}`, body : `<div>${randomString}</div>`})
      return res.json({success : "OTP Sent in Inbox"})

      // await sendSMS(randomString, user.phone)
      // return res.json({success : "OTP Sent. Check your SMS"})
  

      
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  });

  userRouter.post("/resend-otp", async (req, res) => {
    try{
        let {email} = req.body;
        
        const randomString = (Math.random().toString().slice(2, 8));

        await redisClient.set(`otp_${email}`, randomString,  { EX: 10 * 60 });

        sendMail({toAddress : email, subject : `OTP - ${randomString}`, body : `<div>${randomString}</div>`})
          return res.json({  success: "OTP Sent Successfully. Check Inbox" });
       }
       catch(err){
        console.log(err);
        return res.status(500).json({error : "Server Error"})
        
       }
  })

  userRouter.post("/verify-otp", async(req, res) => {
   try{
    let {otp, email} = req.body;
    

    let user = await UserModel.findOne({email});
    if(!user){
        return res.status(400).json({error : "User Doesnt Exist"})
    }

    let OTP = await redisClient.get(`otp_${email}`);
    if(!OTP){
        return res.status(400).json({error : "OTP is invalid or expired !"})
    }
    if(OTP !== otp){
        return res.status(400).json({error : "Incorrect OTP Entered"})
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        'vishika',
        { expiresIn: '1h' }
      );

      await redisClient.del("otp")
      console.log("token deleted");
      
  
      return res.json({ token, success: "Login Successful" });
   }
   catch(err){
    console.log(err);
    return res.status(500).json({error : "Server Error"})
    
   }
  })


  
  // Register Route
  userRouter.post("/register", registerValidation, validationErrorResult, async (req, res) => {
    try {
      const { email, name, phone } = req.body;
  
      let found = await UserModel.findOne({ email });
      if (found) {
        return res.status(400).json({ error: "User already exists" });
      }
      const newUser = new UserModel({
        name,
        email,
        phone,
      });
  
      await newUser.save();
  
      res.status(201).json({ success: "User Registered" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  });



  export default userRouter;