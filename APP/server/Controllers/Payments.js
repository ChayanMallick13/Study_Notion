const User = require('../Models/User');
const Course = require('../Models/Course');
const { instance } = require('../Config/RazorpayConfig');
const { mailSender } = require('../Utilities/NodemailerConfig');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { generatePurchaseConfirmationEmail } = require('../mail/templates/PurchaseCompletionMail');
const crypto = require('crypto');
const { default: mongoose } = require('mongoose');
const Reciept = require('../Models/Reciept');
require('dotenv').config();


// create a order when a buy now btn is clicked 
exports.capturePayment = async (req, res) => {
    try {
        const { courses } = req.body;
        const { userId } = req.user;


        if (!courses || !userId || courses?.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No Courses To Buy Or User Not Valid',
            });
        }



        let totalAmount = 0;
        for (let course of courses) {
            const courseDetails = await Course.findById(course);
            if (!courseDetails) {
                return res.status(404).json({
                    success: false,
                    message: 'Course Not Found For Purchisng',
                });
            }
            if (courseDetails.studentsEnrolled.includes(userId)) {
                return res.status(401).json({
                    success: false,
                    message: 'User Have Already Bought The course',
                });
            }
            totalAmount += courseDetails.price;
        }

        const userDetails = await User.findById(userId);

        if(totalAmount===0){
            return res.status(200).json({
                 success: true,
                 message: 'Order Created Free Order',
                 userDetails,
                 orderCreationResponse:"****",
            });
            
        }

        try {
            const options = {
                amount: totalAmount * 100,
                currency: 'INR',
                receipt: Math.random(Date.now()).toString(),
            };
            const orderCreationResponse = await instance.orders.create(
                options
            );
            console.log(orderCreationResponse);


            return res.status(200).json({
                success: true,
                message: 'Order Created Successfully',
                orderCreationResponse,
                userDetails,
            });
        } catch (error) {
            console.error('OrderError', error.message, error);
        }

    } catch (error) {
        console.error('Some Error Occurred during Payment Order Creation');
        console.error('eror', error.message);
        return res.status(500).json({
            success: false,
            message: 'Some Error Occurred during Payment',
        });
    }
}


//if successfully order is completed
exports.verifySignature = async (req, res) => {
    try {
        const courses = req.body.courses;
        const userId = req.user.userId;
        if(req.body.zeroPayemnt){
            //enroll the studnets into the courses 
            for (let courseId of courses) {

                // courses enrolled update for studnets
                const updatedCourse = await Course.findByIdAndUpdate(courseId,
                    {
                        $push: {
                            studentsEnrolled: userId,
                        }
                    },
                    { new: true }
                );

                //studnets erolled update for course 
                const updatedUser = await User.findByIdAndUpdate(userId,
                    {
                        $push: {
                            courses: courseId,
                        }
                    },
                    {
                        new: true,
                    }
                );

                const maileSendInfo = await mailSender(updatedUser.email, `Successfully Enrolled into ${updatedCourse.courseName} , STUDY NOTION `,
                    courseEnrollmentEmail(updatedCourse.courseName, updatedUser.firstName + " " + updatedUser.lastName));

                console.log('Mail Send SuccessFully');
            }


            return res.status(200).json({
                success: true,
                message: 'Payment Successfull',
                recieptDetails:null,
            });
        }
        const razorpay_order_id = req.body.razorpay_order_id;
        const razorpay_payment_id = req.body.razorpay_payment_id;
        const razorpay_signature = req.body.razorpay_signature;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userId || !courses || courses?.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Payment Failed',
            });
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) { //payment successfull

            //enroll the studnets into the courses 
            for (let courseId of courses) {

                // courses enrolled update for studnets
                const updatedCourse = await Course.findByIdAndUpdate(courseId,
                    {
                        $push: {
                            studentsEnrolled: userId,
                        }
                    },
                    { new: true }
                );

                //studnets erolled update for course 
                const updatedUser = await User.findByIdAndUpdate(userId,
                    {
                        $push: {
                            courses: courseId,
                        }
                    },
                    {
                        new: true,
                    }
                );

                const maileSendInfo = await mailSender(updatedUser.email, `Successfully Enrolled into ${updatedCourse.courseName} , STUDY NOTION `,
                    courseEnrollmentEmail(updatedCourse.courseName, updatedUser.firstName + " " + updatedUser.lastName));

                console.log('Mail Send SuccessFully');
            }

            const razorpayPaymentDetails = await instance.payments.fetch(razorpay_payment_id);

            ///store the payment id for future reference 
            const recieptDetails = await Reciept.create({
                userId,
                paymentId:razorpay_payment_id,
                amount:razorpayPaymentDetails.amount,
                currency:razorpayPaymentDetails.currency,
                method:razorpayPaymentDetails.method,
                orderId:razorpayPaymentDetails.order_id,
                createdAt:razorpayPaymentDetails.created_at,
                bank:razorpayPaymentDetails.bank,
                courses,
            });


            return res.status(200).json({
                success: true,
                message: 'Payment Successfull',
                recieptDetails,
            });
        }
        else { //payment failed
            return res.status(400).json({
                success: false,
                message: 'Payment Failed Signature Match Failed',
            });
        }

    } catch (error) {
        console.error("Some Error Occured while Payment Verification");
        return res.status(500).json({
            success: false,
            message: 'Some Error Occurred in Payment Verification',
        });
    }
}


//payment confirm mail
exports.sendPurchaseCompleteMail = async (req, res) => {
    try {

        const { email } = req.user;
        const { orderId, amount, userName } = req.body;
        const title = `Purchase Successfulll for the Order Id ${orderId} , Regards Study Notion`;

        if (!orderId || !amount || !userName) {
            return res.status(404).json({
                success: false,
                message: 'Some Data For Sending Mail of purchase VErification is Failing',
            });
        }


        const mailResponse = await mailSender(email, title, generatePurchaseConfirmationEmail(userName, amount / 100, orderId));

        console.log(mailResponse);


        return res.status(200).json({
            success: true,
            message: 'Mail Sent of Purchase Compleion',
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Some Error Occurred in Sending Purchase Mail to User',
        });
    }
}



// for single item purchase for multiple the baove code works 
/*

//capture the payment and initialize the razorpay order
exports.capturePayment = async(req,res) => {
    try {
        
        //take out the user and course id who buys what course
        const {courseId,userId} = req.body;

        //do validaton not null and valid ids
        if(!courseId || !userId){
            return res.status(400).json(
                {
                    success:false,
                    message:'All values required for initialise payment process'
                }
            );
        }

        const userdetails = await User.findById(userId);
        const courseDetails = await Course.findById(courseId);
        if(!userdetails || !courseDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:'Error , User or Course not found in initailizing the payment',
                }
            );
        }

        //checks if the user has already bought the course already 
        //yes then do not initialis ethe payments options
        //convert string userid to object id type for matching in the object id types 
        //const uid = new mongoose.Types.ObjectId(userId);
        if(userdetails.courses.includes(courseDetails._id)){
            return res.status(401).json(
                {
                    success:false,
                    message:'User already have the course Bought',
                }
            )
        }
        
        //create the order and return he response
        const amount = courseDetails.price;
        const currency = "INR";

        const options = {
            amount:amount*100,
            currency,
            receipt: userId + " " + courseId,
            notes: {
                courseId:courseDetails._id,
                userId:userdetails._id,
            }
        }
        const orderCreationResponse = instance.orders.create(
            options
        );

        console.log(orderCreationResponse);

        return res.status(200).json(
            {
                success:true,
                courseName:courseDetails.courseName,
                courseDescription:courseDetails.CourseDescription,
                thumbnail:courseDetails.thumnail,
                orderId:orderCreationResponse.id,
                currency:orderCreationResponse.currency,
                amount:orderCreationResponse.amount,
            }
        );


    } catch (err) {

        //handle the error
        console.log('Problem in Order Creation');
        return res.status(500).json(
            {
                success:false,
                message:'Some error Occurred while creating the order',
            }
        );
    }
};


//verify Signature of the payment check if the payment si successful and organic
exports.verifySignature = async(req,res) => {
    try {

        //secret key given from server side our side
        const webhookSecret = process.env.RAZORPAY_SECRET;

        //secret key returned from the razorpay website 
        const razorpaySignature = req.headers["x-razorpay-signature"];

        //hash the webhooksecret to perform the secret key matching with the razorpay secret sent by the 
        // razorpay //give algo hash algo and key
        const shasum = crypto.createHmac("sha256",webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        //compare and match the digest hashed key and signature from razorpay
        if(digest !== razorpaySignature){
            return res.status(401).json(
                {
                    success:true,
                    message:"Payment Authorization Failed...",
                }
            );
        }

        //successfull payment and payment is authorized
        console.log('Payment Authorization Successfull');
        // ---> payment successfull 
        // --> perform action enroll the studnet into the course

        //take out the course id and user if from the notes we have send when we created the orders
        const {courseId,userId} = req.body.payload.payment.entity.notes;

        //make a entry into the enrolled section of the course for a new student entry
        const modifiedCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    studentsEnrolled:userId,
                }
            },
            {new:true},
        );
        if(!modifiedCourse){
            return res.status(404).json(
                {
                    success:false,
                    message:'No Course Found',
                }
            )
        }
        //make a entry in the students courses enrolled for a new course he enrolled
        const modifiedUserDetails = await User.findByIdAndUpdate(userId,
            {
                $push:{
                    courses:courseId,
                }
            },
            {
                new:true,
            }
        );
        if(!modifiedUserDetails){
            return res.status(404).json(
                {
                    success:false,
                    message:'No User Found',
                }
            )
        }

        console.log(modifiedCourse);
        console.log(modifiedUserDetails);


        //sent the message to the new student who just enrolled
        const mailInfo = await mailSender(modifiedUserDetails.email,
            "Congratulations , You are onboarded into new Study Notion Course", 
            courseEnrollmentEmail(modifiedCourse.courseName,modifiedUserDetails.firstName)
        );

        console.log(mailInfo);


        //return a successfull response
        return res.status(200).json(
            {
                success:true,
                message:'Course Purchase Successfull',
            }
        );

    } catch (err) {
        console.error(err);

        return res.status(500).json(
            {
                success:false,
                message:'Some Error Occurred in Payment Authorization and Verification',
            }
        );
    }
}

*/

