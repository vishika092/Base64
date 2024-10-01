// server.js  --> design an api with get   
// route name   -->   /heavy-task
// if i hit this  --> invoke job.js function
//   send the final counter as output


// design worker.js file  --> write this heavy file


//  keep a sepratrate repo  

import express from 'express';
import process from "process"
import  performHeavyTask  from './job.js';

const app = express();
const PORT = 3000;

app.get('/heavy-task', (req, res) => {
    try {
        console.log(process.pid);
        
        const counter = performHeavyTask();
        return res.status(200).json({ counter });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
