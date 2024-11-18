import express from 'express'
import { editTaskValidation, taskValidation, validationErrorResult } from '../middlewares/validation/validations.js';
import authMiddleware from '../middlewares/auth/userAuth.js';
import TaskModel from '../models/Schema.js';

let todoRouter = express.Router();

todoRouter.use(authMiddleware)

todoRouter.post("/add", taskValidation, validationErrorResult,  (req, res) => {
    try{
        let {tasks} = req.body;
        tasks.forEach(async (task) => {
            let t = new TaskModel({task, user : req.user.id})
            await t.save()
        })
        res.status(200).json({success : "Task Created"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Something Went Wrong!"})
        
    }
})


todoRouter.get("/all-tasks",  async (req, res) => {
    
    try{
        let task = await TaskModel.find({user : req.user.id})
        res.json({ success : task})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Something Went Wrong!"})

        
    }
})


todoRouter.put("/edit/:taskid",  editTaskValidation, validationErrorResult,   async (req, res) => {
  try{
    let taskid = req.params.taskid
    let {task, isCompleted} = req.body
    let found = await TaskModel.findById(taskid)
    if(!found){
        res.status(404).json({error : "Task not Found"})
    }
    isCompleted = isCompleted ? true : false
    await TaskModel.updateOne({_id : taskid}, {$set : {task, isCompleted}})
    res.status(200).json({success : "Task updated Successfully"})
  }
  catch(err){
    console.log(err);
    res.status(500).json({error : "Something Went Wrong!"})
    
}

})


todoRouter.delete("/delete/:taskid", async (req, res) => {
    try{
    let taskid = req.params.taskid
    let found = await TaskModel.findById(taskid)
    if(!found){
        res.status(404).json({error : "Task not Found"})
    }
    await TaskModel.deleteOne({_id : taskid})
    return res.status(200).json({success : "Task deleted Successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Something Went Wrong!"})
    }
})


export default todoRouter;