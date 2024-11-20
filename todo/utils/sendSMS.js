import twilio from 'twilio'

async function sendSMS(otp, phone) {
    console.log(phone);
    
                        
    const fromPhoneNum = "+12283007193";
    const toPhoneNum = phone;
    const accountSid = "ACf0c9b8f62f5cf7925ef7e8d2ff6e9039";
    const authToken = "6a3c897115e20e612fa299b6911ac305";
    const client = twilio(accountSid, authToken);

    try {
        const message = await client.messages.create({
            body: `Your OTP is: ${otp}`,
            to: toPhoneNum, 
            from: fromPhoneNum, 
        });
        console.log("Message sent successfully!");
        return 1;  
    } catch (err) {
        console.log(err);
        return;
    }
}


export default sendSMS