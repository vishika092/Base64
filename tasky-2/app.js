
import express from "express";
// import "dotenv/config"      // no need bcz in package.json already pre loaded the .env file

import "./utils/dbConnect.js"    

// Import Routers
import userRouter from "./routers/userRouter.js";
import taskRouter from "./routers/taskRouter.js";


let app = express();
let port = process.env.PORT  || 8080


// set the view engine to EJS
app.set("view engine", "ejs")

// Body parser to listen to json data
app.use(express.json());

// listen to url data  frpm form  (parse the url encoded data from views) 
app.use(express.urlencoded({ extended: true }))


app.use(express.static("public"))    // serve public folder under /
app.use("/user", userRouter)
app.use("/task", taskRouter)



app.all("*", (req, res) => {
    res.status(404).send("API Not Found!")
})

// http server
app.listen(port, () => {
    console.log("Server running at port ", port);   
})