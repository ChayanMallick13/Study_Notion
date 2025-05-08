const mongoose = require('mongoose');
const {mailSender} = require('../Utilities/NodemailerConfig');
const { otpTemplate } = require('../mail/templates/emailVerificationTemplate');



const OTPSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
        },

        otp:{
            type:String,
            required:true,
        },

        createdAt: {
            type:Date,
            default:Date.now,
            expires: 5*60*1000,
        },
    }
);

//post hook middleware to send the email of otp
async function sendVerificationEmail(email,otp){
    try{
        const title = 'Verify Your Email to Get Started with Study Notion';

        const mailResponse = await mailSender(email,title,
            otpTemplate(otp)
        );
        console.log('Otp Sent Successfully',mailResponse);
    }
    catch(err){
        console.log('Error In Sending OTP middleWare');
        console.error(err);
    }
};

OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})



module.exports = mongoose.model("OTP",OTPSchema);