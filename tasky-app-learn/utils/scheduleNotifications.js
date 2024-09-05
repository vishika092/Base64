import sendSMS from "./sendSMS.js"
import { scheduleJob, scheduledJobs} from 'node-schedule';

let jobs = {}

async function scheduleNotifications(info){
    let {reminders, toPhoneNum, task, deadline, taskid} = info
    
    reminders.forEach((reminder, i) => {
        let msgBody =  `Reminder ${i + 1} to finish your task: "${task}" by ${deadline.toString()}.`;

        let job = scheduleJob(`${taskid}-${i}`, reminder, async () => {
          try{
            const msg = {msgBody, toPhoneNum}
               // await sendSMS(msg);
            sendSMS(msg)
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