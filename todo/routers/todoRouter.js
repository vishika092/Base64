import express, { json } from 'express'
import { editTaskValidation, taskValidation, validationErrorResult } from '../middlewares/validation/validations.js';
import authMiddleware from '../middlewares/auth/userAuth.js';
import TaskModel from '../models/Schema.js';
import redisClient from '../utils/redisClient.js';

let todoRouter = express.Router();

todoRouter.use(authMiddleware)

todoRouter.post("/add", taskValidation, validationErrorResult,  async (req, res) => {
    try{
        let {tasks} = req.body;
       
            let t = new TaskModel({tasks, user : req.user.id})
            await t.save()
            await redisClient.del(`${req.user.id}`);

        res.status(200).json({success : "Task Created"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : "Something Went Wrong!"})
        
    }
})

todoRouter.get("/current-todo", async (req, res) => {
  try{
    let data = await redisClient.get(`${req.user.id}`)
    if(data){
        return res.json({success : JSON.parse(data)})
    }
  
    return res.json({success : [""]})
  }
  catch(err){
    console.log(err);
        res.status(500).json({error : "Something Went Wrong!"})
  }
})

todoRouter.post("/change-todo", async (req, res) => {
    try{
        let {tasks} = req.body;
        await redisClient.set(`${req.user.id}`, JSON.stringify(tasks))
    
    return res.send({success : true});
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
    let {tasks, isCompleted} = req.body
    let found = await TaskModel.findById(taskid)
    if(!found){
        res.status(404).json({error : "Task not Found"})
    }
    isCompleted = isCompleted ? true : false
    await TaskModel.updateOne({_id : taskid}, {$set : {tasks, isCompleted}})
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