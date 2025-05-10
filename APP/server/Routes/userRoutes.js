const express = require('express');

const userrouter = express.Router();

//middlewares

const {auth} = require('../MiddleWares/Auth');


//controllers

const {changePassword,sendOtp,signIn,signUp, signInwithGoogle} = require('../Controllers/Auth');

const {resetPassword,resetPasswordToken} = require('../Controllers/ResetPassword');

const {getStats} = require('../Controllers/Stats');

const {createCourseProgress} = require('../Controllers/CourseProgress');



// ---> routes
userrouter.put('/changePassword',auth,changePassword);
userrouter.post('/getOtp',sendOtp);
userrouter.post('/signin',signIn);
userrouter.post('/signup',signUp);

userrouter.post('/sigInWithGoogle',signInwithGoogle);

userrouter.get('/getStats',getStats);

userrouter.post('/resetPassword',resetPassword);
userrouter.post('/resetPasswordToken',resetPasswordToken);



//courseProgress Routes 
userrouter.post('/makeCompleteVideoRequest',auth,createCourseProgress);





module.exports = userrouter;