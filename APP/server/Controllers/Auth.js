const OTP = require('../Models/OTP');
const otpGenerator = require('otp-generator');
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const Profile = require('../Models/Profile');
const jwt = require('jsonwebtoken');
const { mailSender } = require('../Utilities/NodemailerConfig');
require('dotenv').config();

const { passwordUpdated } = require('../mail/templates/passwordUpdate');
const { client } = require('../Config/GoogleSignInClient');


//send Otp
exports.sendOtp = async (req, res) => {
    try {

        //take out email from body
        const { email } = req.body;

        ///check if user already exits
        const UserWithEmail = await User.findOne({ email });

        //yes
        if (UserWithEmail) {
            return res.status(201).json(
                {
                    success: false,
                    message: 'User Already Exits With Given Email',
                }
            )
        }

        //no
        //generate a otp
        var otp = otpGenerator.generate(6,
            {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            }
        );
        console.log('Otp is ', otp);

        var otpExits = await OTP.findOne({ otp });

        //otp exits
        while (otpExits) {
            otp = otpGenerator.generate(6,
                {
                    lowerCaseAlphabets: false,
                    upperCaseAlphabets: false,
                    specialChars: false,
                }
            );

            otpExits = await OTP.findOne({ otp })

        }

        //otp dont exits
        //try to create a otp entry in otp collection in db

        //cretae the payload
        const payload = {
            email,
            otp,
        };

        //make the entry
        const otpDetails = await OTP.create(payload);

        console.log(otpDetails);


        //send a response 
        return res.status(200).json(
            {
                success: true,
                message: 'OTP Sent Successfully',
            }
        );

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error In Sending Otp in Controller Auth',
            }
        );
    }
}


//sign Up Handler
exports.signUp = async (req, res) => {
    try {

        //data from body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,

        } = req.body;

        //validate data
        if (
            !firstName || !lastName || !email || !password || !confirmPassword || !otp

            || !email.includes('@') || !email.includes('.com')
        ) {
            return res.status(403).json(
                {
                    success: false,
                    message: 'Data Provided is Valid',
                }
            )
        }

        //match the two passwords
        if (password !== confirmPassword) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'Password And Confirm Password Value do not match. Please Try Again',
                }
            )
        }


        //check user already exits
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'User is Already Registered',
                }
            )
        }

        //find most recent OTP for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log('Recent Otp is ', recentOtp);

        //validate two OTPs
        if (recentOtp.length === 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'OTP expired Try Again'
                }
            )
        }
        else if (recentOtp.at(0).otp !== otp) {
            return res.status(403).json(
                {
                    success: false,
                    message: 'OTPS do not Match',
                }
            )
        }

        //otp matches
        //try to hash the password
        let hashedPassword = null;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json(
                {
                    success: false,
                    message: 'Error in Hashing The Password',
                }
            );
        }

        //make a entry in db
        const profile = await Profile.create(
            {
                contactNumber,
                gender: null,
                dateOfBirth: null,
                about: null,
            }
        );

        const UserEntry = await User.create(
            {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                accountType,
                contactNumber,
                additionalDetails: profile._id,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`, //api dicebear
            }
        );

        //return res 
        return res.status(200).json(
            {
                success: true,
                message: 'Sign Up Succesfull',
                UserEntry,
            }
        );

    } catch (err) {
        res.status(500).json(
            {
                success: false,
                message: "Error in Signing You In. Try Again Later",
            }
        )
    }
}


//Log In handler
exports.signIn = async (req, res) => {
    try {

        //fetch the data from body
        const { email, password } = req.body;

        //check if the data is valid
        if (
            !email || !password || !email.includes('@') || !email.includes('.com')
        ) {
            res.status(400).json(
                {
                    success: false,
                    message: 'Data Entered Is Not Valid',
                }
            )
        }

        //check if the user is registered or have the entry in the db
        const userExits = await User.findOne({ email }).populate("additionalDetails").exec();

        //no user found
        if (!userExits) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'User Is Not Registered',
                }
            );
        }

        //if user exits check if the passwords are valid 
        const passwordsMatched = await bcrypt.compare(password, userExits.password);
        if (!passwordsMatched) {
            return res.status(403).json(
                {
                    success: false,
                    message: 'Incorrect Passwords',
                }
            );
        }

        //user present and password match create a token for this user
        const payload = {
            email: userExits.email,
            role: userExits.accountType,
            userId: userExits._id,
            isGoogleAccount:userExits.isGoogleAccount,
        }
        const Token = jwt.sign(payload, process.env.JWT_SECRET_KEY,
            {
                expiresIn: '3d',
            }
        );


        //store the token in the browsers cookie for a given valid time 
        const cookieOptions = {
            httpOnly: true,
            secure:true,
            sameSite: "None", // Important for cross-site
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        }


        //send a response with success and a cookie created
        const user = userExits.toObject();
        user.token = Token;
        user.password = undefined;


        //send the response
        res.cookie("AuthCookie", Token, cookieOptions).status(200).json(
            {
                success: true,
                message: 'User Signed In Successfully',
                user,
            }
        );


    } catch (err) {
        res.status(500).json(
            {
                success: false,
                message: 'Error In Logging You In. Please Try Again Later',
            }
        )
    }
}


//change PassWord
exports.changePassword = async (req, res) => {
    try {

        //parse the new password from body
        //get the new Password ,confirm new Password
        const { newPassword, oldPassword } = req.body;
        const user = req.user;
        const authToken = req.cookies.AuthCookie;

        const reqUser = await User.findById(user.userId);

        console.log('reqUser',reqUser);

        if(reqUser.isGoogleAccount){
            //validate the new passwords and the confirm password
            if (!newPassword ) {
                return res.status(402).json(
                    {
                        success: false,
                        message: "Enter Valid Details ,Fileds Cant Be empty"
                    }
                )
            }
        }
        else{
            //validate the new passwords and the confirm password
            if (!newPassword || !oldPassword) {
                return res.status(402).json(
                    {
                        success: false,
                        message: "Enter Valid Details ,Fileds Cant Be empty"
                    }
                )
            }

        }

        //check password entered is correct
        const isPassCorrect = await bcrypt.compare(oldPassword, reqUser.password);
        console.log('pakk');
        if (!isPassCorrect && !reqUser.isGoogleAccount) {
            return res.status(401).json({
                success: false,
                message: 'Wrong Password',
            });

        }

        //hash the newpass
        const newHashedPassword = await bcrypt.hash(newPassword, 10);



        //upadte the password in db
        const updatedUser = await User.findByIdAndUpdate(user.userId, {
            password: newHashedPassword,
            isGoogleAccount:false,
        }, { new: true });


        const title = `Important: Your Study Notion Password Was Recently Changed`;

        const mailInfo = await mailSender(user.email, title,
            passwordUpdated(user.email, updatedUser.firstName + " " + updatedUser.lastName)
        );

        console.log('Mail for passWordchange', mailInfo);



        //return response
        return res.status(200).json(
            {
                success: true,
                message: 'Password Changed Successfully',
                updatedUser,
            }
        );



    } catch (err) {
        console.log('Problem in Chnaging Password');
        console.error(err);
        return res.status(500).json(
            {
                success: false,
                message: 'Some Error Occured In Changing Password Try Again Later',
            }
        )
    }
};

//sign in with google
exports.signInwithGoogle = async (req, res) => {
    try {
        const { credential,accountType } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        console.log(payload);


        if (!payload.email_verified) {
            return res.status(401).json({
                success: false,
                message: 'User Authentication Failed',
            });
        }


        const userExits = await User.findOne({
            email: payload.email,
        }).populate("additionalDetails").populate("courses").exec();

        console.log(userExits);


        if (userExits) {
            logInHandler(userExits,res);
        }
        else{
            const body = {
                firstName:payload.given_name,
                lastName:payload.family_name??payload.given_name,
                email:payload.email,
                accountType,
                userImage:payload.picture,
                password:Math.random().toString(36).substring(2,20),
                contactNumber:'0000000000',
            };
            const signedUpData = await signUpHandler(body);
            console.log(signedUpData);
            if(signedUpData.success){
                logInHandler(signedUpData.user,res);
            }
            else{
                return res.status(401).json({
                     success: false,
                     message: 'Problem In Signing You In',
                });
            }
        }


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Problem Occurred in Signing You In',
        });
    }
};



async function logInHandler(userExits,res) {
    //user present and password match create a token for this user
    const payload = {
        email: userExits.email,
        role: userExits.accountType,
        userId: userExits._id,
        isGoogleAccount:userExits.isGoogleAccount,
    }
    const Token = jwt.sign(payload, process.env.JWT_SECRET_KEY,
        {
            expiresIn: '3d',
        }
    );


    //store the token in the browsers cookie for a given valid time 
    const cookieOptions = {
        httpOnly: true,
        secure:true,
        sameSite: "None", // Important for cross-site
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    }


    //send a response with success and a cookie created
    const user = userExits.toObject();
    user.token = Token;
    user.password = undefined;


    //send the response
    res.cookie("AuthCookie", Token, cookieOptions).status(200).json(
        {
            success: true,
            message: 'User Signed In Successfully',
            user,
        }
    );
}

async function signUpHandler(req) {
    const {
        firstName,
        lastName,
        email,
        password,
        accountType,
        contactNumber,
        userImage,

    } = req;

    console.log(req);

    //validate data
    if (
        !firstName || !lastName || !email || !password 

        || !email.includes('@') || !email.includes('.com')
    ) {
        return {
            success:false,
            message:'Problem In Data'
        };;
    }


    //try to hash the password
    let hashedPassword = null;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    }
    catch (err) {
        console.error(err);
        return {
            success:false,
            message:'Problem in Bcrypt'
        };
    }

    //make a entry in db
    const profile = await Profile.create(
        {
            contactNumber,
            gender: null,
            dateOfBirth: null,
            about: null,
        }
    );

    const UserEntry = await User.create(
        {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            contactNumber,
            additionalDetails: profile._id,
            image: userImage,
            isGoogleAccount:true,
        }
    );

    return {
        success:true,
        user:UserEntry,
    };
}

/*

{
[server]   iss: 'https://accounts.google.com',
[server]   azp: '984085196341-vvmjhuic84uspk73rvsrkchlk6ql2f0d.apps.googleusercontent.com',
[server]   aud: '984085196341-vvmjhuic84uspk73rvsrkchlk6ql2f0d.apps.googleusercontent.com',
[server]   sub: '100343727517357429733',
[server]   email: 'chayanmallick2003@gmail.com',
[server]   email_verified: true,
[server]   nbf: 1746784142,
[server]   name: 'CHAYAN MALLICK',
[server]   picture: 'https://lh3.googleusercontent.com/a/ACg8ocIBzZ4mEpkFI9YMEsPCvb42A-90GULiTRPSHV2kWhYqJmUioPmo=s96-c',
[server]   given_name: 'CHAYAN',
[server]   family_name: 'MALLICK',
[server]   iat: 1746784442,
[server]   exp: 1746788042,
[server]   jti: 'c6bc1e2bcbe7878d34ff1e2435aa5c16b6c19d7b'
[server] }

*/