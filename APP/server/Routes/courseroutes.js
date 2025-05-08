const express = require('express');

const courserouter = express.Router();

//middlewares

const {auth,isAdmin,isInstructor,isStudent} = require('../MiddleWares/Auth');


//controllers


const {categoryPageDetails,createCategory,getCategorys} = require('../Controllers/Category');

const {createCourse,getAllCourses,getCourseDetails,editCourseDetails,setCourseStatus} 
= require('../Controllers/Course');

const {createRating,getAllRatings,getAverageRating,getcourseAllRatings} = require('../Controllers/RatingAndReviews');

const {createSection,deleteSection,updateSection} = require('../Controllers/Section');

const {createSubSection,deleteSubSection,updateSubSection} = require('../Controllers/Subsection');



// ---> routes

// course 
courserouter.post('/createCourse',auth,isInstructor,createCourse);
courserouter.get('/getAllCourses',getAllCourses);
courserouter.post('/getCourseDetails',getCourseDetails);
courserouter.put('/updateCourse',auth,editCourseDetails);
courserouter.post('/updateCourseStatus',auth,setCourseStatus);

// category
courserouter.post('/categoryPageDetails',categoryPageDetails);
courserouter.post('/createCategory',auth,isAdmin,createCategory);
courserouter.get('/getCategorys',getCategorys);

// rating 
courserouter.post('/createRating',auth,isStudent,createRating);
courserouter.get('/getAllRatings',getAllRatings);
courserouter.post('/getAverageRatings',getAverageRating);
courserouter.get('/getCourseAllRatings',getcourseAllRatings);


//section
courserouter.post('/createSection',auth,isInstructor,createSection);
courserouter.put('/deleteSection',auth,isInstructor,deleteSection);
courserouter.put('/updateSection',auth,isInstructor,updateSection);

//subsection
courserouter.post('/createSubSection',auth,isInstructor,createSubSection);
courserouter.post('/deleteSubSection',auth,isInstructor,deleteSubSection);
courserouter.post('/updateSubSection',auth,isInstructor,updateSubSection);





module.exports = courserouter;