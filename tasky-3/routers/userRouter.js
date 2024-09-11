import express from "express"
import jwt from "jsonwebtoken";

let userRouter = express.Router()  // router object

let obj = {title : null, error : null, success : null, validationErr : null}


import { userLoginController, userRegisterController } from "../controllers/userControllers.js"
import { signUpValidator, logInValidator, validationErrorHandler } from "../middlewares/validations/validators.js"
import isLoggedIn from "../middlewares/auth/isLoggedIn.js";


userRouter.get("/register", (req, res, next) => {
    res.render("register", {...obj, title : "User Registration Page"})
})

// before rendering the login page , check if the cookie is present
userRouter.get("/login",isLoggedIn,  (req, res, next) => {
    
    res.render("login", {...obj, title : "User Login Page"})
})

userRouter.get("/logout", (req, res, next) => {
    return res.clearCookie("access_token", {
        sameSite : "strict",   // strict or none has to be there  (if none , secure true has to be there)
        // secure : true       // this will clear the cookie from storage
    }).status(302).redirect("/user/login")
})


userRouter.post("/login", logInValidator(), userLoginController)
userRouter.post("/register", signUpValidator(), userRegisterController)

export default userRouter