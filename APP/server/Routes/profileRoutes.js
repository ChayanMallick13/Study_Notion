const express = require('express');

const profilerouter = express.Router();

//middlewares

const {auth} = require('../MiddleWares/Auth');


//controllers


const {contactUsHandler} = require('../Controllers/ContactUs');

const {getAllUserDetails,updateProfile,cancelAccountDeleteRequest,makeAccountDeleteRequest
    ,getAllUserCourses,updateProfilePicture,
checkDeleteStatus} 
= require('../Controllers/Profile');




// ---> routes
profilerouter.delete('/makedeleteRequestt',auth,makeAccountDeleteRequest);
profilerouter.post('/cancelDeleteRequest',auth,cancelAccountDeleteRequest);
profilerouter.get('/getAllUsersDetails',auth,getAllUserDetails);
profilerouter.put('/updateProfile',auth,updateProfile);
profilerouter.post('/contactUs',contactUsHandler);

//update profile picture
profilerouter.put('/updateProfilePicture',auth,updateProfilePicture);

//get all enrolled courses
profilerouter.get('/getAllEnrolledCourses',auth,getAllUserCourses);

profilerouter.post('/getDeletionStatus',checkDeleteStatus);


module.exports = profilerouter;