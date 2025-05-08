const CourseProgress = require("../Models/CourseProgress");
const User = require("../Models/User");







exports.createCourseProgress = async (req, res) => {
    try {

        //take out the required data from the body and req user from midlleware 
        const {userId} = req.user;
        const {courseId,subSectionId} = req.body;

        if(!userId || !courseId || !subSectionId){
            return res.status(404).json({
                 success: false,
                 message: 'All Fields Are Required',
            });
        }

        //find the user 
        const reqUser = await User.findById(userId);
        if(!reqUser){
            return res.status(404).json({
                 success: false,
                 message: 'User Not Found',
            });
        }

        //find if the courses course Progess Object is present or not
        const courseProgressPresent = await CourseProgress.findOne({
            userId,
            courseId,
        });
        if(!courseProgressPresent){

            //create a new course progress object

            const newCourseProgress = await CourseProgress.create(
                {
                    courseId,
                    userId,
                    completedVideos:[subSectionId],
                }
            );

            //make this entry into the user course Progress
            const modifiedUser = await User.findByIdAndUpdate(userId,{
                $push:{
                    courseProgress:newCourseProgress._id,
                }
            });

        }
        else{
            //update the already present object

            //check if the req video is already inserted
            if(courseProgressPresent.completedVideos.includes(subSectionId)){
                return res.status(401).json({
                     success: false,
                     message: 'Already Entry Present',
                });
            }

            //make a entry into the course Progress
            const newCourseProgress = await CourseProgress.findByIdAndUpdate(courseProgressPresent._id,{
                $push:{
                    completedVideos:subSectionId,
                }
            },{
                new:true,
            });
            
            
        }

        return res.status(200).json({
             success: true,
             message: 'Completed Video SuccessFully',
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Some Error Occurred in Creating THe Course Progress',
        });
    }
};