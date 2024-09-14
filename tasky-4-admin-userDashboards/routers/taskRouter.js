import express from "express"

let taskRouter = express.Router();

// GET: /api/tasks/:taskid
// GET: /api/tasks/all
// POST: /api/tasks/add
// PUT: /api/tasks/edit/:taskid
// DELETE: /api/tasks/delete/:taskid

import { getTaskController, addTaskController, getAllTasksController, deleteTaskController, editTaskController } from "../controllers/taskControllers.js";
import {validationErrorHandler, addTaskValidator, taskIdValidator, editTaskValidator} from "../middlewares/validations/validators.js"
import {authMiddleware, isUser} from "../middlewares/auth/userAuth.js"

taskRouter.use(authMiddleware, isUser);

//the route /api/tasks/all should be defined before the route /api/tasks/:taskid. This way, Mongoose doesn't try to cast "all" as an ObjectId.

taskRouter.get("/add", (req, res, next) => {
    res.render("addTask", {title : "Add Task Page", error : null, success : null, validationErr : null, token : null})
})

taskRouter.get("/all", getAllTasksController)
taskRouter.get("/:taskid", taskIdValidator(), validationErrorHandler, getTaskController)
taskRouter.post("/add",  addTaskValidator() , addTaskController)
// taskRouter.put("/edit/:taskid" ,editTaskValidator(), validationErrorHandler, editTaskController)
// taskRouter.delete("/delete/:taskid",taskIdValidator(), validationErrorHandler, deleteTaskController)

export default taskRouter