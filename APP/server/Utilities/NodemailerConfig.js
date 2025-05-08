const nodemailer = require('nodemailer');
require('dotenv').config();


exports.mailSender = async(email,title,body) => {
    try{
        
        const transporter = nodemailer.createTransport(
            {
                host: process.env.MAIL_HOST,
                auth:{
                    user:process.env.MAIL_USER,
                    pass:process.env.MAIL_PASS
                },
            }
        );

        const mailInfo = await transporter.sendMail(
            {
                from:"Study Notion Private Limited || Edtech by Chayan Mallick",
                to:`${email}`,
                subject:`${title}`,
                html:`${body}`,
            }
        )

        console.log('Email Info ',mailInfo);
        return mailInfo;

    }catch(err){
        console.error(err);
        console.log('Error In Sending Mail');
    }
};
