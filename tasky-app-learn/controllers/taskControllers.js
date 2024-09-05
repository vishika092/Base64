import TaskModel from "../models/Task.js";
import {getReminders} from "../utils/reminders.js"
import { cancelJobs, scheduleNotifications } from "../utils/scheduleNotifications.js";

async function getTaskController(req, res) {
  try {
        const { id } = req.user;
        const task = await TaskModel.findOne({ _id: req.params.taskid, user: id }, '-__v -_id -user');

        if (!task) {
            return res.status(404).json({ message: "Task Not Found!" });
        }
        return res.status(200).json(task);
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error. Try Again!" });
  }
}

async function getAllTasksController(req, res){
    try{
        const {id} = req.user;
        const task = await  TaskModel.find({user : id}, "-__v -_id -user")
        if (task.length === 0) {
            return res.status(404).json({ message: "No Tasks Found !" });
        }
        return res.status(200).json(task);


    }catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error. Try Again!" });
      }

}


async function addTaskController(req, res){
    try {
        let {body} = req;
        let {id, phone} = req.user
        body.reminders = getReminders(body.deadline);
        body.deadline = new Date(body.deadline)
        body.user = id

        let task = new TaskModel(body)
        await task.save()
        scheduleNotifications({reminders : body.reminders, toPhoneNum: phone, task : body.task, deadline : body.deadline, taskid : task._id });
        res.send("Task Added Successfully !")

      } catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error. Try Again!" });
      }

}

async function deleteTaskController(req,res){
    try{
    let {id} = req.user
    const task = await TaskModel.deleteOne({ _id: req.params.taskid , user: id });
    const deleteCount = task.deletedCount;

    // For invalid taskid, deleteCount is 0
    if (!deleteCount) {
        return res.status(404).json({ message: "Task Not Found." });
    }
    return res.send("Task Deleted Successfully !")
    }
    catch (err) {
        console.log(err);
        return res
          .status(500)
          .json({ message: "Internal Server Error. Try Again!" });
      }
    
}

async function editTaskController(req, res){
   try{
    const { id ,phone} = req.user;
    let {deadline, task, status} = req.body
        let taskDoc = await TaskModel.findOne({ _id: req.params.taskid, user: id });

        if (!taskDoc) {
            return res.status(404).json({ message: "Task Not Found!" });
        }

       let reminders = getReminders(deadline)
        deadline = new Date(deadline)


        await TaskModel.updateOne(
            {_id : req.params.taskid, user : id},
            { $set: { task, status, deadline, reminders } }
        );
        cancelJobs(taskDoc._id);
        
        if(!status){
             scheduleNotifications({reminders, toPhoneNum: phone, task , deadline, taskid : taskDoc._id})
        }

        return res.send("Task Updated Successfully !")
   }catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal Server Error. Try Again!" });
  }
   

}

export { getTaskController , addTaskController, getAllTasksController, deleteTaskController, editTaskController};
