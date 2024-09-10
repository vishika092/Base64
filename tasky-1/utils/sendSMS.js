import twilio from "twilio"

// Account SID, which uniquely identifies your account.
//  Auth Token , used for authenticating API requests.

let {TWILIO_SID : sid,
    TWILIO_AUTH : auth,
    FROM_PHONE_NUM : num} = process.env


// This creates a new Twilio client instance, allowing you to interact with the Twilio API using your account credentials.
let client = twilio(sid, auth);

async function sendSMS({msgBody, toPhoneNum}){
    try{
        // let sms = await client.messages.create({
        //     body : msgBody,
        //      to : toPhoneNum,
        //     from : num
        // })
        console.log(msgBody);
        
        
    }
    catch(err){
        console.log(err);
        
    }
}

export default sendSMS;