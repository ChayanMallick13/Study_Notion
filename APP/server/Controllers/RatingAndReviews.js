const RatingAndReview = require('../Models/RatingAndReview');
const Course = require('../Models/Course');
const { default: mongoose } = require('mongoose');


//create Rating
exports.createRating = async(req,res) => {
    try {

        //take out the user details from req user as the user will be signed in already
        const {email,role,userId} = req.user;

        //take out the review and rating from the req body
        const {review,rating,courseId} = req.body;

        //validation on the review and reviews 
        //check if the user is enrolled in thsi course or not
        const userEnrollediNcourse = await Course.findOne(
            {
                _id:courseId,
                studentsEnrolled: {$elemMatch: {$eq: userId}},
            }
        );
        if(!userEnrollediNcourse){
            return res.status(401).json(
                {
                    success:false,
                    message:'Student Not Enrolled In This Course',
                }
            );
        }

        //chekc if this user already have given review
        const alreadyGivenReview = await RatingAndReview.findOne(
            {
                user:userId,
                course:courseId,
            }
        );
        if(alreadyGivenReview){
            
            //No Problem just update the review with the new review
            const updatedReview = await RatingAndReview.findByIdAndUpdate(alreadyGivenReview._id,
                {
                    review,
                    rating,
                    course:courseId,
                    user:userId,
                }
            )

            return res.status(200).json(
                {
                    success:true,
                    message:'Rating Added Successfully to the Course',
                    updatedReview:updatedReview,
                }
            );
        }


        //make a entry into the db for given reviews and rating
        const newRatingAndReviewEntry = await RatingAndReview.create(
            {
                user:userId,
                review,
                rating,
                course:courseId,
            }
        );

        //enter this review and rating into its respective courese data
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    ratingAndReviews:newRatingAndReviewEntry._id,
                }
            },{
                new:true,
            }
        );

        console.log(updatedCourseDetails);

        //return a successfull response
        return res.status(200).json(
            {
                success:true,
                message:'Rating Added Successfully to the Course',
                ratingReview:newRatingAndReviewEntry,
            }
        );

    } catch (err) {
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:'SomeError Occured While Reviewing And Rating The Course',
            }
        );
    }
}

//get Average Rating
exports.getAverageRating = async(req,res) => {
    try {
        
        //get the course if from the req body
        const courseId = req.body.courseId;

        console.log(courseId);

        //get the average rating and
        //validation
        // const temp = await RatingAndReview.find({
        //     user:userId,
        //     course:courseId,
        // });
        // console.log('Temp',temp);
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                    totalRatings: { $sum: 1 } // Correct way to count documents
                }
            }
        ]);
        

        console.log(result);

        //check if we got any rating or not and //return the response
        if(result.length === 0){
            return res.status(200).json({
                 success: true,
                 message: ' No Rating Given till Now , so 0',
                 averageRating:0,
            });
            
        }else{
            return res.status(200).json({
                 success: true,
                 message: 'Avg Rating found',
                 averageRating:result[0].averageRating,
            });
            
        }

        

    } catch (err) {
        console.error(err);
        return res.status(500).json(
            {
                success:false,
                message:'Error in getting Average rating',
            }
        );
    }
}

//getAllRatings
exports.getAllRatings = async (req, res) => {
    try {
        
        const allReviews = await RatingAndReview.find()
        .sort({rating: "desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image",
        })
        .populate({
            path: "course",
            select: "courseName",
        })
        .exec();

        return res.status(200).json({
             success: true,
             message: 'All reviews fetched Successfully',
             allReviews,
        });
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error In getting All the ratings',
        });
    }
};

//get Course specific data
exports.getcourseAllRatings = async (req, res) => {
    try {
        
        const courseId = req.bosy.courseId;

        const allReviews = RatingAndReview.find({
            course:mongoose.Types.ObjectId(courseId),
        })
        .sort({rating: "desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image",
        })
        .populate({
            path: "course",
            select: "courseName",
        })
        .exec();

        return res.status(200).json({
             success: true,
             message: 'All reviews fetched Successfully for the course',
             allReviews,
        });
        

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error In getting All the ratings for the course',
        });
    }
};