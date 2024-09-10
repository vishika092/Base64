import mongoose from "mongoose";


// type: mongoose.Schema.Types.ObjectId: Indicates that the user field holds an ObjectId that references another document.
// ref: 'User': Specifies that this ObjectId points to a document in the User collection.

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    task: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    reminders: [Date]
})

const TaskModel = mongoose.model('Task', taskSchema, 'tasks');

export default TaskModel;