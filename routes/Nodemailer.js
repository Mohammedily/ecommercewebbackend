const nodemailer = require("nodemailer");


  
module.exports = async(email, subject, text) => {
    try {
        const transporter =  nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.PORT,
            secure: process.env.secure,
            auth:{
                user: process.env.user,
                pass: process.env.PASS
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
       
         console.log("email sent Sucessfully");
    } catch (error) {
        console.log("email not sent!");

      console.log(error);


      return error;
    }

};