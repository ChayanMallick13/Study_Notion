const mongoose = require('mongoose');


const CourseSchema = new mongoose.Schema(
    {
        courseName:{
            type:String,
            required:true,
            trim:true
        },

        CourseDescription:{
            type:String,
            trim:true,
            required:true,
        },

        instructor:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"User",
        },

        whatYouWillLearn:{
            type:String,
        },

        courseContent:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Section"
            }
        ],

        ratingAndReviews:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"RatingAndReview"
            }
        ],

        price:{
            type:Number,
            required:true,
        },

        thumnail:{
            type:String,
            required:true,
        },

        Category:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Category"
        },

        tags:{
            type:[String],
            required:true,
            trim:true,
        },

        studentsEnrolled:[
            {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:[],
            required:true
            }
        ],

        createdAt:{
            type:String,
            default: function() {
                const today = new Date();
                const year = today.getFullYear();
                const month = String(today.getMonth() +1 ).padStart(2,'0');
                const date = String(today.getDate()).padStart(2,'0');
                let hour = today.getHours();
                const minutes = String(today.getMinutes()).padStart(2,'0');
                const ampm = (hour>=12)?('PM'):('AM');
                hour = hour%12;
                if(hour===0) hour=12;
                return `${year}-${month}-${date} | ${hour}:${minutes} ${ampm}`;
            },
        },

        instructions:{
            type:[String],
            required:true,
        },

        status:{
            types:String,
            enum:['Draft','Published']
        }
        
    }
);



module.exports = mongoose.model("Course",CourseSchema);