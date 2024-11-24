import nodemailer  from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, 
    auth: {
      user: "7b8f62001@smtp-brevo.com",
      pass: "C6sH3OBfnPaU7yS0",
    },
  });

//  left side is node mailer  , right side brevo values
async function sendMail(emailInfo){
    try{
          const info = await transporter.sendMail({
            from: '"Vishika Enterprise" <mail@vishika.life>', // sender address
            // send multiple people by sepreting by comma
            to: emailInfo.toAddress, // list of receivers   
            subject: emailInfo.subject, // Subject line
            html: emailInfo.body, 
          });
        
          console.log("Message sent: %s", info.messageId);
    }
    catch(err){
        console.log(err);      
    }
}

// lesser the code in body faster the mail

export default sendMail