import sendSMS from "./sendSMS.js"
import { scheduleJob, scheduledJobs} from 'node-schedule';
import sendMail from "./sendMail.js";
let jobs = {}

async function scheduleNotifications(info){
    let {reminders, toPhoneNum, task, deadline, taskid, email} = info
    
    reminders.forEach((reminder, i) => {
        // let msgBody =  `Reminder ${i + 1} to finish your task: "${task}" by ${deadline.toString()}.`;

        let job = scheduleJob(`${taskid}-${i}`, reminder, async () => {
          try{
            // const msg = {msgBody, toPhoneNum}
               // await sendSMS(msg);
               sendMail({
                toAddress : email,
                subject :  `Reminder ${i + 1} - Vishika Tasky Solutions`,
                emailContent : `
                <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Task Reminder</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                  color: #333;
                }
                p {
                  font-size: 16px;
                  line-height: 1.6;
                  color: #555;
                }
                .reminder {
                  background-color: #f9f9f9;
                  padding: 10px;
                  margin: 10px 0;
                  border-left: 4px solid #28a745;
                }
                .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  color: #888;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Task Reminder</h1>
                
                <p>Hi there,</p>
                <p>Here are your reminders to complete the task: <strong>"${task}"</strong>.</p>
                
            
                <div class="reminder">
                  <p><strong>Reminder ${i + 1}:</strong> ${reminder}</p>
                </div>
                
                <p>The task must be completed by <strong>${deadline.toString()}</strong>.</p>
                
                <p>If you have any questions, feel free to reach out.</p>
                
                <p class="footer">Reminder ID: ${taskid}</p>
              </div>
            </body>
            </html>
            
                `
            })

          }
          catch(err){
            console.log(err);
          }
            
        })
        
    })
}



function cancelJobs(taskid) {
    const jobsKeys = Object.keys(scheduledJobs);
    
    jobsKeys
        .filter(key => key.split('-')[0] === taskid)
        .forEach(key => scheduledJobs[key].cancel());
}

export {scheduleNotifications, cancelJobs}