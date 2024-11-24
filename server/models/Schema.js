import mongoose from "mongoose";



const TaskSchema = new mongoose.Schema({
  tasks: {
    type: [String],
    required: true, 
  },
  isCompleted : {
    type : Boolean,
    required : true,
    default : false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Referencing the User model
    required: true,
  }
});

let TaskModel = mongoose.model('Task', TaskSchema);

export default TaskModel ;
