const jwt = require('jsonwebtoken');
const User = require('../Models/User');


//auth
exports.auth = async(req,res,next) => {
    try{

        // console.log('cookies :- ',req.cookies);

        //take the token from cookie if present
        const AuthToken = req.cookies.AuthCookie || req.body.token 
        || req.header("Authorisation")?.replaceAll("Bearer ","");

        // console.log(AuthToken);
        //token not present
        if(!AuthToken){
            return res.status(401).json(
                {
                    success:false,
                    message:'Token Not Found',
                }
            );
        }

        //check token validity
        try{
            const userDetails = jwt.verify(AuthToken,process.env.JWT_SECRET_KEY);

            //check if the user is present in the db also
            const userInDb = await User.findById(userDetails.userId);

            if(!userInDb){
                return res.status(404).json({
                     success: false,
                     logoutUser:true,
                     message: 'User is Not Registed , Sign Up First',
                });
            }

            // console.log("User Details in Auth MiddleWare ",userDetails);
            req.user = userDetails;
            next();
        }catch(err){
            return res.status(404).json(
                {
                    success:false,
                    message:'Invalid Token Error',
                }
            );
        }

    }catch(err){
        console.log('Error In Authenticating User');
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:'Error in Authenticating You',
            }
        );
    }
};

//isStudent
exports.isStudent = async(req,res,next) => {
    try{
        const {user} = req;

        if(user.role.toLowerCase() !== 'student'){
            return res.status(401).json(
                {
                    success:false,
                    message:'Not a Student Type User Invalid Access',
                }
            );
        }

        next();

    }
    catch(err){
        console.log('Some Error Occured in authorizing Student');
        return res.status(500).json(
            {
                success:false,
                message:'Some Error Occured in authorizing Student',
            }
        )
    }
};

//isInstructor
exports.isInstructor = async(req,res,next) => {
    try{
        const {user} = req;

        if(user.role.toLowerCase() !== 'instructor'){
            return res.status(401).json(
                {
                    success:false,
                    message:'Not a Instructor Type User Invalid Access',
                }
            );
        }

        next();

    }
    catch(err){
        console.log('Some Error Occured in authorizing Instructor');
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:'Some Error Occured in authorizing Instructor',
            }
        )
    }
};

//isAdmin
exports.isAdmin = async(req,res,next) => {
    try{
        const {user} = req;

        if(user.role.toLowerCase() !== 'admin'){
            return res.status(401).json(
                {
                    success:false,
                    message:'Not a Admin Type User Invalid Access',
                }
            );
        }

        next();

    }
    catch(err){
        console.log('Some Error Occured in authorizing Admin');
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:'Some Error Occured in authorizing Admin',
            }
        )
    }
};