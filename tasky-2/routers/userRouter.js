import express from "express"
import jwt from "jsonwebtoken";

let userRouter = express.Router()  // router object

import { userLoginController, userRegisterController } from "../controllers/userControllers.js"
import { signUpValidator, logInValidator, validationErrorHandler } from "../middlewares/validations/validators.js"
import authMiddleware from "../middlewares/auth/userAuth.js"

let obj = {title : null, error : null, success : null, validationErr : null}

userRouter.get("/register", (req, res, next) => {
    res.render("register", {...obj, title : "User Registration Page"})
})

userRouter.get("/login", (req, res, next) => {
    
    res.render("login", {...obj, title : "User Login Page"})
})

userRouter.get("/redirect", (req, res , next) => {
    res.render("redirect", {...obj, title : "Redirection Page"})
})

userRouter.get("/auth", (req, res, next) => {
    res.render("auth", obj )
})

userRouter.post("/auth", async (req, res, next) => {
   try{
    let token = req.headers['x-auth-key'];
    if (!token) {
        return res.status(401).json({error : 'Authentication Failed'})
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET); // throws Error for invalid token
    req.user = payload;
    res.json(payload)
   }catch(err){
        return res.status(403).json({error : 'Authentication Failed'});

   }
})

userRouter.post("/login", logInValidator(), userLoginController)
userRouter.post("/register", signUpValidator(), userRegisterController)

export default userRouter