
import express from "express";
// import "dotenv/config"      // no need bcz in package.json already pre loaded the .env file

import "./utils/dbConnect.js"    

// Import Routers
import userRouter from "./routers/userRouter.js";
import taskRouter from "./routers/taskRouter.js";


let app = express();
let port = process.env.PORT  || 8089

// App Middlewares 
app.use(express.json());
app.use("/user", userRouter)
app.use("/task", taskRouter)

app.all("*", (req, res) => {
    res.status(404).send("API Not Found!")
})

// http server
app.listen(port, () => {
    console.log("Server running at port ", port);   
})