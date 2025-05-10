const User = require('../Models/User');
const Profile = require('../Models/Profile');
const Course = require('../Models/Course');
const  Reciept = require('../Models/Reciept');
const { fileRemoveFromCloudinary } = require('../Utilities/FileRemover');
const Scheduled_Deletions = require('../Models/Scheduled_Deletions');
const cron = require('node-cron');
const { UploadFileToCloudinary } = require('../Utilities/Uploader');
const CourseProgress = require('../Models/CourseProgress');
const RatingAndReview = require('../Models/RatingAndReview');

// checks the url is from cloudinary or not 
function isCloudinaryUrl(url) {
    return url.includes('res.cloudinary.com');
}
  

//update the user profile
exports.updateProfile = async (req, res) => {
    try {
        //take out the details from the req body
        const {firstName,lastName, gender, dateOfBirth = "", about = "", contactNumber } = req.body;

        //take out the user details
        const { userId } = req.user;

        //validation
        if (!gender || !contactNumber || !userId) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'All Field are Required',
                }
            );
        }

        //find the user in db
        const requiredUser = await User.findById(userId);
        if (!requiredUser) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Error in Finding The User',
                }
            );
        }

       

        //update the required details in the profle with its id from user details additional details
        const profileId = requiredUser.additionalDetails;
        const UpdatedProfile = await Profile.findByIdAndUpdate(profileId,
            {
                gender,
                dateOfBirth,
                about,
                contactNumber,
            }, {
            new: true,
        }
        );

        //log the data in console
        console.log(UpdatedProfile);

        //update the basic details of user directly
        const updatedUser = await User.findByIdAndUpdate(requiredUser._id,{
            firstName,
            lastName,
        },{new:true}).populate("additionalDetails").exec();

        updatedUser.password = null;

        //log
        console.log(updatedUser);

        //return response
        return res.status(200).json(
            {
                success: true,
                message: 'Profile Data Updated Successfully',
                updatedUser,
            }
        );

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: 'Error in Updating the Profile',
            }
        );
    }
};

//cancel account delete handler
exports.cancelAccountDeleteRequest = async (req, res) => {
    try {

        //take out the id of user from body
        const { userId } = req.user;

        //to make a cancel request remove this user id from scheduled requests model
        const deletedUserRequest = await Scheduled_Deletions.findOneAndDelete(
            {
                userId,
            }
        );

        //check if this users does not existed in request
        if (!deletedUserRequest) {
            return res.status(404).json({
                success: false,
                message: 'No such User with deletion Request Exits',
            });

        }

        //return successful response of request cancel
        return res.status(200).json({
            success: true,
            message: 'Account Recovered Successfully , Deletion Request Forbidden',
        });


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error Occured in Canceling Delete Request',
        });

    }
}

//make account deletion request account will be deleted after 7 days
exports.makeAccountDeleteRequest = async (req, res) => {
    try {

        const { userId } = req.user;

        //validate the user 
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'No User Found With That id',
            });

        }


        //make check if this user has already made previous request
        const previousReq = await Scheduled_Deletions.findOne(
            {
                userId,
            }
        );
        if (previousReq) {
            return res.status(403).json({
                success: false,
                message: 'Dupliucate request Submitted',
            });

        }

        //if no previous request make a new request for thsi user id

        //make a delete request entry into scheduled deletions
        const newReq = await Scheduled_Deletions.create(
            {
                userId,
                scheduledTime: Date.now() ,
            } // 3 * 24 * 60 * 60 * 1000
        );

        //return successfull response
        return res.status(200).json({
            success: true,
            message: 'Request Submitted For deletion , Account will be deleted after 7 days',
        });


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error in Making Deletion Request',
        });
    }
};

//get the details of a user full details
exports.getAllUserDetails = async (req, res) => {
    try {

        //take out the user id
        const { userId } = req.user;

        //get all the data response
        const UserDetails = await User.findById(userId)
            .populate('additionalDetails')
            .populate("courses")
            .populate("courseProgress")
            .exec();

        //validate the user details 
        if (!UserDetails) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'No User Found',
                }
            )
        }

        //return successfull response
        return res.status(200).json(
            {
                success: true,
                message: 'User Details Fetched Successfully',
                UserDetails,
            }
        );

    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: 'Some Error Occurred In Fetching User Details',
            }
        )
    }
};

//delete Account
const deleteAccount = async (userId) => {
    try {

        //validate
        const UserReq = await User.findById(userId);
        if (!UserReq) {
            return;
        }

        //check if the user is student
        if (UserReq.accountType.toLowerCase() === 'student') {
            //unenroll this user from all the courses
            for (const courseId of UserReq.courses) {
                await Course.findByIdAndUpdate(courseId,
                    {
                        $pull: {
                            studentsEnrolled: userId,
                        }
                    }, {
                    new: true,
                }
                )
            }
            for (const courseId of UserReq.courseProgress) {
                await CourseProgress.findByIdAndDelete(courseId);
            }
        }

        //delete any review given by the user
        const DeletedInfoReview = await RatingAndReview.find({
            user:userId,
        });

        //delete the reciepts of the user
        const deletedReciepts = await Reciept.find({userId});
        for(let reciept of deletedReciepts){
            await Reciept.findByIdAndDelete(reciept._id);
        }

        //remove the review from the course
        for(let review of DeletedInfoReview){
            await Course.findByIdAndUpdate(review.course,{
                $pull:{
                    ratingAndReviews:review._id,
                }
            })
        }
        
        for(let review of DeletedInfoReview){
            await RatingAndReview.findByIdAndDelete(review._id);
        }



        //delete this users profile
        const deleteUsersProfile = await Profile.findByIdAndDelete(UserReq.additionalDetails);

        //delet this users profiule pic if in cloudinary then
        if(isCloudinaryUrl(UserReq.image)){
            await fileRemoveFromCloudinary(UserReq?.image,'image');
        }

        //delete this user
        const deletedUser = await User.findByIdAndDelete(userId);


        //return response
        return;

    } catch (err) {
        console.log('Error in deletion');
        console.error(err);
        return;
    }
};

//chron job scheduler
cron.schedule("0 * * * * ", async () => {
    try {
        console.log("Running scheduled account deletion job...");
        const accountsToDelete = await Scheduled_Deletions.find(
            {
                scheduledTime:{$lte : Date.now()}
            }
        );
        if(accountsToDelete.length === 0){
            console.log('No Accounts To delete');
            return;
        }
        for (const userDetails of accountsToDelete) {
            try {
                await deleteAccount(userDetails.userId);
                await Scheduled_Deletions.findByIdAndDelete(userDetails._id);
            } catch (error) {
                console.log('Some error in loop of cron job');
            }
        }
        console.log('Account Deletion Done successfully');
    }catch(err){
        console.error(err);
        console.log('Error in Deleting the accounts');
    }
});

//"*/1 * * * * *"  0 * * * *    * * * * *

//update profile picture
exports.updateProfilePicture = async (req, res) => {
    try {
        
        //get which user wants to update profile picture
        const {userId} = req.user;

        //check if the userId is valid
        const userDetails = await User.findById(userId);
        if(!userDetails){
            return res.status(404).json({
                 success: false,
                 message: 'No User Found With Given UserID',
            });
        }

        //now delete the previous profile picture if stored in cloudinary
        if(isCloudinaryUrl(userDetails.image)){
            await fileRemoveFromCloudinary(userDetails.image,'image');
        }

        //now store the new profile picture to cloudinary
        //take out the image from req files 
        const newProfileImage = req.files?.profilePicture;
        const newProfileImageType = newProfileImage?.name?.split('.')?.at(-1)?.toLowerCase();
        const supportedFiles = ['jpeg','jpg','png'];
        if(!supportedFiles.includes(newProfileImageType)){
            return res.status(400).json({
                 success: false,
                 message: 'Unsupported File Type',
            });
            
        }   

        //upload to cloudinary
        const newimageUploadDetails = 
        await UploadFileToCloudinary(newProfileImage,process.env.USER_PROFILE_IMAGES_FOLDER);

        //store the new image url to the user details now
        const updatedUserDetails = await User.findByIdAndUpdate(userDetails._id,
            {
                image:newimageUploadDetails.secure_url,
            },{new:true}
        );
        updatedUserDetails.password = null;
        console.log(updatedUserDetails);

        //return successfull response
        return res.status(200).json({
             success: true,
             message: 'Successfully Updated Users Profile Picture',
             updatedUserDetails,
        });
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error In Updating The User Profile Picture',
        });
    }
};

// utility function for calculating duration 
function getTotalDuration(sections){
    let duration = 0;
    for(let section of sections){
        for(let subsection of section.subSections){
            duration+=Number(subsection.timeDuration);
        }
    }
    const hour = Math.floor(duration/3600);
    const minutes = Math.floor((duration%3600)/60);
    const seconds = Math.floor((duration%3600)%60);
    // console.log('Hello',hour,minutes,seconds);
    return `${hour}hr ${minutes}min ${seconds}s`
}

//get all user's courses
exports.getAllUserCourses = async (req, res) => {
    try {
        
        //get the user id from the req user
        const {userId} = req.user;

        console.log(userId,'Temp');

        //check if the user id is valid
        const userDetails = await User.findById(userId)
        .populate(
            {
                path:'courses',
                populate:[
                    {
                        path:'Category',
                    },
                    {
                        path:'instructor'
                    },
                    {
                        path:'ratingAndReviews'
                    },
                    {
                        path:"courseContent",
                        populate:{
                            path:'subSections',
                        }
                    },
                ]
            }
        )
        .populate('courseProgress')
        .populate({
            path:'courses',
            populate:{
                path:'courseContent',
                populate:{
                    path:'subSections',
                }
            }
        })
        .exec();

        //validation
        if(!userDetails){
            return res.status(404).json({
                 success: false,
                 message: 'No User Found foor the given id',
            });
        }

        //fetch all the courses enrolled by the user
        const userTempCourses = userDetails.courses;

        //console.log(userCourses[0]);
        const userCourses = userTempCourses.map((course) => {
            const duration = getTotalDuration(course.courseContent);
            return {...course.toObject(),duration};
        })

        // console.log(userCourses);

        //return the successfull response
        return res.status(200).json({
             success: true,
             message: 'Successfully Fetche dthe user Courses',
             userCourses,
             courseProgress:userDetails.courseProgress,
        });
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error in Fetching User Courses',
        });
    }
};

// check account req for delete or not 
exports.checkDeleteStatus = async(req,res) => {
    try {
        const {userId} = req.body;
        // console.log(userId);
        const isReqforDeletion = await Scheduled_Deletions.findOne({userId});
        const isDeletedUser = await User.findById(userId);
        // console.log(isReqforDeletion);
        return res.status(200).json({
            success: true,
            message: 'Account is Req for delete',
            isReqforDeletion:(isReqforDeletion)?(true):(false),
            deletedUser:!(isDeletedUser),
       });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
             success: false,
             message: 'Some Error Occured',
        });
        
    }
}