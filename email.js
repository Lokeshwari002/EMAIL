const nodemailer=require('nodemailer')
require("dotenv").config();
const email = process.env.EMAIL_USER;
const password = process.env.EMAIL_PASS;


const transport=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:email,
        pass:password
    },
    tls:{
        rejectUnauthorized:false
    }
})

const sendMail=async(to,otp)=>{
    const emailOptions={
        from:"",
        to,
        subject:"Your otp is ",
        text:`<h3>your otp is ${otp}</h3>`

    }
   return await transport.sendMail(emailOptions)
}

module.exports={sendMail};
