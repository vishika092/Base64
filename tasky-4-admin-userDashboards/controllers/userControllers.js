import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';


import UserModel from "../models/User.js";

/* 
  @route  : /api/user/register
  @method : POST
  @body   : { "name": , "email": , "password": , "phone": }
  @description :
    * Reads the users.json file
    * If the email is already in use, sends a 409 (Conflict) response
    * In the body, replaces the plaintext password with its hashed form
    * Pushes the body into the json file, and sends a json success message
*/

let obj = {error :null, title : null, success : null, validationErr : null}

async function userRegisterController(req, res) {
    try {
      const validationErr = validationResult(req);

      // Req Validation Error Handler
      if (!validationErr.isEmpty()) {
          const reqErr = {};

          // Creates an object to render req errors separately
          validationErr.errors.forEach(err => {
              if (err.path in reqErr) reqErr[err.path] += ` ${err.msg}`;
              else reqErr[err.path] = err.msg;
          });
          
          return res.render('register.ejs', { ...obj, validationErr : reqErr });
      }
      const { body } = req;
      
      const user = await UserModel.findOne({ email : body.email });

      // Prohibit a user's double registration
      if (user) {
          return res.render('register', { ...obj, error: 'The User is already Registered!' });
      }
      req.body.password = await bcrypt.hash(body.password, 10); // Hash the password
      await new UserModel(req.body).save(); // Save the new User info in DB

      return res.render('register.ejs', { ...obj, success: 'User Registered Successfully!', });
      
  }
   catch (error) {
      console.log(error);
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
    
      res.cookie('access_token', token, {
        httpOnly: true, // Prevents access via client-side scripts
        secure: true,   // Ensures the cookie is sent only over HTTPS (recommended in production)
        expires : new Date(Date.now() + 24 * 60 * 60 * 1000)
      })

      if(user.role === "user"){
        res.redirect("/user/userDashboard")
      }
      else if(user.role === "admin"){
        res.redirect("/user/adminDashboard")
      }
    }
   
  catch(err){
    console.log(err);
    return res.status(500).json({message : "Internal Server Error. Try Again!"})
    
  }
}

export { userLoginController, userRegisterController };
