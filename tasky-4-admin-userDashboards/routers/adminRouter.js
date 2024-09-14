import express from "express"
import {authMiddleware, isAdmin} from "../middlewares/auth/userAuth.js";

let adminRouter = express.Router();


adminRouter.get("/" ,authMiddleware,isAdmin, (req, res, next) => {
    return res.send("Welcome To Admin Router")
})

export default adminRouter