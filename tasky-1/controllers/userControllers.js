import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import UserModel from "../models/User.js";


/* 
  @route  : /api/user/register
  @method : POST
  @body   : { "fname": , "email": , "password": , "phone": }
  @description :
    * Reads the users.json file
    * If the email is already in use, sends a 409 (Conflict) response
    * In the body, replaces the plaintext password with its hashed form
    * Pushes the body into the json file, and sends a json success message
*/

async function userRegisterController(req, res) {
  try {
    let { body } = req;
    let isUserExist = await UserModel.findOne({ email: body.email });
    if (isUserExist) {
     return res.status(409).send("User Already Registered!");
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    const user = new UserModel(body);
    await user.save();

    // send email to verify user email
    //  verification link format  : /user/verify/email=EMAIL&token=RANDOMSTRING  (12 to 15 character random string)   --> store random string in db for 10 min  (email as key and random string as value)   
    // another get api   --> db logic  --> render success or failure
    // if u click link    --> isVerfied becomes true in db 
    // then redirect to login
    return res.send("User Registered Successfully !");

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error. Try Again!' });
  }
}

/* 
  @route  : /api/user/login
  @method : POST
  @body   : { "email": , "password": }
  @description :
    * Reads the users.json file
    * For valid email and password, sends an OTP
    * If the email or password is invalid, sends 401 status with a JSON message
*/

async function userLoginController(req, res) {
  try{
    let {password, email} = req.body;

    let user = await UserModel.findOne({email})
    if(!user){
      return res.status(404).send("User Doesn't Exists!");
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
      return res.status(401).send("Incorrect Password Entered!");
    }
    let payload = {
        id: user._id,
        email: user.email,
        phone: user.phone
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({message : "User Logged In successfully !", token})
  }
  catch(err){
    console.log(err);
    return res.status(500).json({message : "Internal Server Error. Try Again!"})
    
  }
}

export { userLoginController, userRegisterController };
