const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const {mailSender} = require('../Utilities/NodemailerConfig');
require('dotenv').config();
const bcrypt = require('bcrypt');
const {PasswordResetEmail} = require('../mail/templates/ResetPasswordLinkMail');


//resetPasswordToken
exports.resetPasswordToken = async(req,res) => {
    try{
        //get email from request
        const {email} = req.body;

        //validate the email
        if(!email || !email.includes('@') || !email.includes('.com')){
            return res.status(403).json(
                {
                    success:false,
                    message:'Enter A Valid Email...',
                }
            )
        }

        //validate if this user exits
        const userWithEmail = await User.findOne({email});
        if(!userWithEmail){
            return res.status(404).json(
                {
                    success:false,
                    message:'No User Found With Given Email.. ',
                }
            )
        }

        // ---  generate link  ----

        //generate a random token
        const token = crypto.randomUUID();

        //update the user by adding token and expiration time
        const updatedUserDetails = await User.findByIdAndUpdate(userWithEmail._id,
            {
                token,
                resetPasswordExpires:Date.now()+5*60*1000
            },
            {
                new: true,
            }
        )

        //create url
        const url = `${process.env.FRONT_END_BASE_URL}${token}`;

        console.log(url);

        //send the mail having url
        const title = `Reset Your Password – Study Notion Account Recovery`
        await mailSender(email,title,
            PasswordResetEmail(updatedUserDetails.firstName,url)
        );


        //send the response
        return res.status(200).json(
            {
                success:true,
                message:'Password Reset Link Sent Successfully , Check Your Mail Account',
            }
        )



    }catch(err){
        console.log('Error In Resetting Password');
        console.error(err);
        res.status(500).json(
            {
                success:false,
                message:"Some Error Occured in Resetting Password",
            }
        );
    }
};

//resetPassword in DB
exports.resetPassword = async(req,res) => {
    try{

        //fetch the data from body
        const {token,newPassword,confirmNewPassword} = req.body;

        //validate the data
        if(!newPassword || !confirmNewPassword){
            return res.status(403).json(
                {
                    success:false,
                    message:'Invalid Data Input',
                }
            );
        }
        else if(newPassword!== confirmNewPassword){
            return res.status(401).json(
                {
                    success:false,
                    message:'Passwords do not Match',
                }
            )
        }

        //get the user details using token
        const user = await User.findOne({token});

        //if no user present with given token return resposne invalid token
        if(!user){
            return res.status(404).json(
                {
                    success:false,
                    message:'Invalid Token',
                }
            );
        }

        //if token present check the validity by expires filed invald token
        if(user.resetPasswordExpires < Date.now()){
            return res.status(401).json(
                {
                    success:false,
                    message:'Token Expired',
                }
            )
        }

        //hash the new password to store
        const newHashedPass = await bcrypt.hash( newPassword , 10 );

        //update the user password 
        const newUpdatedUser = await User.findByIdAndUpdate(user._id,
            {
                password:newHashedPass,
            },
            {
                new: true,
            }
        )

        //return thr response
        return res.status(200).json(
            {
                success:true,
                email:newUpdatedUser.email,
                message:'Password Changed Successfully',
            }
        );


    }catch(err){
        console.log('Error in Resetting Password Controller');
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:'Some Error Occured While Changing Password',
            }
        )
    }
};