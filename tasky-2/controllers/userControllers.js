import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';


import UserModel from "../models/User.js";
import sendMail from "../utils/sendMail.js";

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

let obj = {error :null, title : null, success : null, validationErr : null, token : null}

async function userRegisterController(req, res) {
  try {
    const reqErrors = validationResult(req);

    if (!reqErrors.isEmpty()) {
        const errors = reqErrors.errors.reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
        }, {});
    
        return res.render("register", {...obj, validationErr : errors}) 
      }

    let { body } = req;
    let isUserExist = await UserModel.findOne({ email: body.email });
    if (isUserExist) {
     return res.render("register", {...obj, error :  "User Already Registered!"});
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);
    body.password = hashedPassword;

    const user = new UserModel(body);
    await user.save();
    
    return res.render("register", {...obj, success :  "User Registered Successfully"})

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
    const reqErrors = validationResult(req);

    if (!reqErrors.isEmpty()) {
        const errors = reqErrors.errors.reduce((acc, err) => {
            acc[err.path] = err.msg;
            return acc;
        }, {});
    
        return res.render("login", {...obj, validationErr : errors}) 
      }

    let {password, email} = req.body;

    let user = await UserModel.findOne({email})
    if(!user){
      return res.render("login", {...obj, error : "Invalid Credentials Entered !"});
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
      return res.render("login", {...obj, error : "Invalid Credentials Entered !"});
    }
    let payload = {
        id: user._id,
        email: user.email,
        phone: user.phone
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    
      return res.render("redirect", {...obj, token});
    }
  catch(err){
    console.log(err);
    return res.status(500).json({message : "Internal Server Error. Try Again!"})
    
  }
}

export { userLoginController, userRegisterController };
