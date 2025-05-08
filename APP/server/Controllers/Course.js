const Course = require('../Models/Course');
const User = require('../Models/User');
const { UploadFileToCloudinary } = require('../Utilities/Uploader');
const { fileRemoveFromCloudinary } = require('../Utilities/FileRemover');
const Categorys = require('../Models/Category');


//create course handler
exports.createCourse = async(req,res) => {
    try {

        //data fetch from body
        const {courseName,CourseDescription,whatYouWillLearn,price,Category,tags,instructions} = req.body;

        //take out the thumbnail
        const {thumnail} = req.files;

        //get the id of the user from req entereed in the midlleware Auth
        const userId = req.user.userId;

        console.log(req.body);

        //validation
        if(!courseName || !CourseDescription || !whatYouWillLearn || !price || 
            !Category || !tags || !instructions){
            return res.status(400).json(
                {
                    success:false,
                    message:'All Fields Are Required',
                }
            );
        }

        //check instructor validation
        const instructorDetails = await User.findById(userId);
        console.log(instructorDetails);
        if(!instructorDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:'Problem in Finding the Instructor',
                }
            );
        }

        //check Category is valid or not
        const CategoryDetails = await Categorys.findOne({
            name:Category,
        });
        if(!CategoryDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:'Category Details Not Found'
                }
            );
        }

        console.log(CategoryDetails);

        //upload the thumbail image to cloudinary
        const ThumbnailImageUploadDetails = 
        await UploadFileToCloudinary(thumnail,process.env.THUMBNAILS_FOLDER_NAME);

        //make a entry for new course
        const newcourse = await Course.create(
            {
                courseName,
                CourseDescription:CourseDescription,
                instructor:instructorDetails._id,
                price,
                whatYouWillLearn,
                thumnail:ThumbnailImageUploadDetails.secure_url,
                Category:CategoryDetails._id,
                tags:JSON.parse(tags),
                instructions:JSON.parse(instructions),
            }
        );

        //make the course entry into the user courses
        const UpdatedUserDetails = await User.findByIdAndUpdate(instructorDetails._id,
            {
                $push: {
                    courses: newcourse._id,
                }
            },
            {
                new:true,
            }
        );

        //make the entry in the Category schema
        const updatedCategory = await Categorys.findByIdAndUpdate(CategoryDetails._id,
            {
                $push: {
                    course:newcourse._id,
                }
            },
            {
                new:true,
            }
        );

        //return the response
        return res.status(200).json(
            {
                success:true,
                message:'Course Created Successfully',
                course:newcourse,
            }
        );
        
    } catch (error) {
        console.log('Error in course Creation');
        console.error(error);
        return res.status(500).json(
            {
                success:false,
                message:'Error in Creating Course',
                error:error.message,
            }
        );
    }
}

//get all courses handler
exports.getAllCourses = async(req,res) => {
    try {
        const allCourses = await Course.find(
            {
                courseName:{ $exists: true },
                price:{ $exists: true },
                thumnail:{ $exists: true },
                instructor:{ $exists: true },
                ratingAndReviews:{ $exists: true },
                studentsEnrolled:{ $exists: true },
            }
        ).populate('instructor').populate('Category').populate('ratingAndReviews')
        .populate({
            path:"courseContent",
            populate:{
                path:"subSections",
            }
        })
        .exec();
        return res.status(200).json(
            {
                success:true,
                message:'Courses Fetched Successfully',
                allCourses,
            }
        )
    } catch (err) {
        console.error(err);
        return res.status(500).json(
            {
                success:true,
                message:'Error in Fetching Courses',
            }
        );
    }
}

//for a specific course get alll the details 
exports.getCourseDetails = async(req,res) => {
    try {

        //extract the course if from the body of req
        const {courseId} = req.body;
        
        //extract all courses from the database 
        const CourseDetails = await Course.findById(courseId)
        .populate({
            path: 'instructor',
            populate: {
                path: 'additionalDetails',
            },
        })
        .populate({
            path:'Category',
        })
        .populate({
            path:'ratingAndReviews',
            populate:{
                path:'user',
            }
        })
        .populate({
            path:'courseContent',
            populate:{
                path:'subSections'
            }
        })
        .populate({
            path:'studentsEnrolled',
        }).populate("Category")
        .exec();

        //no details to show 
        if(!CourseDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:'Some Error Occurred , Invalid Course ID',
                }
            );
        }

        //print to console the details 
        console.log(CourseDetails);

        return res.status(200).json(
            {
                success:true,
                message:'Course Details Fetched Successfully',
                courseDetails:CourseDetails,
            }
        );

    } catch (err) {
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:'Some Error Occured while Fetching Course Details',
            }
        );
    }
}

exports.editCourseDetails = async(req,res) => {
    try {
        const {courseName,CourseDescription,whatYouWillLearn,price,
            Category,tags,instructions,courseId,status='Draft'
        } = req.body;

        const thumbnail = req.files.thumnail;

        //check if the course exists
        const courseReq = await Course.findById(courseId);

        if(!courseReq){
            return res.status(404).json({
                 success: false,
                 message: 'No Such Course Found',
            });
            
        }

        //check Category is valid or not
        const CategoryDetails = await Categorys.findOne({
            name:Category,
        });
        if(!CategoryDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:'Category Details Not Found'
                }
            );
        }

        //remove previous image
        try{
            await fileRemoveFromCloudinary(courseReq.thumnail,'image');
        }catch(err){
            console.log('No File on Cloudinary');
        }

        //upload new image
        const imgUplaodDetails = await UploadFileToCloudinary(thumbnail,process.env.THUMBNAILS_FOLDER_NAME);

        const reqCourse = await Course.findByIdAndUpdate(courseId,{
            courseName,
            CourseDescription,
            whatYouWillLearn,
            price,
            thumnail:imgUplaodDetails.secure_url,
            Category:CategoryDetails._id,
            tags:JSON.parse(tags),
            instructions:JSON.parse(instructions),
            status:status,
        },{new:true}).populate('instructor').populate('Category').populate('ratingAndReviews')
        .populate({
            path:"courseContent",
            populate:{
                path:"subSections",
            }
        })
        .exec();

        return res.status(200).json({
             success: true,
             message: 'Successfuly Updated The Course',
             course:reqCourse,
        });
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({
             success: false,
             message: 'Some Error Occurred',
        });
    }
}


exports.setCourseStatus = async (req, res) => {
    try {
        const {courseId,status} = req.body;
        if(!courseId||!status){
            return res.status(402).json({
                 success: false,
                 message: 'All Fields Are Neccessary',
            });
        }

        //get the course
        const courseDetails = await Course.findById(courseId);
        if(!courseDetails){
            return res.status(404).json({
                 success: false,
                 message: 'No Such Course Found',
            });
        }

        //update the course
        const newCourse = await Course.findByIdAndUpdate(courseId,{
            status,
        },{new:true});

        return res.status(200).json({
             success: true,
             message: 'Successfully Updated The course',
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error in Setting Course Status',
        });
    }
};