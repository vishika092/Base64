import express from "express"

let userRouter = express.Router()  // router object

import { userLoginController, userRegisterController } from "../controllers/userControllers.js"
import { signUpValidator, logInValidator, validationErrorHandler } from "../middlewares/validations/validators.js"

userRouter.post("/login", logInValidator(), validationErrorHandler, userLoginController)
userRouter.post("/register", signUpValidator(), validationErrorHandler, userRegisterController)

export default userRouter