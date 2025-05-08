const {default: mongoose } = require('mongoose');
const Category = require('../Models/Category');
const Course = require('../Models/Course');


//create Category
exports.createCategory = async(req,res) => {
    try{

        //take out the data from body
        const {name,desc} = req.body;

        //validate
        if(!name || !desc ){
            return res.status(400).json(
                {
                    success:false,
                    message:'All fields are required',
                }
            );
        }

        //else create a Category in db 
        const dbRes = await Category.create(
            {
                name,
                description:desc,
                course:[],
            }
        );
        console.log(dbRes);

        //return a success response
        return res.status(200).json(
            {
                success:true,
                message:'Category Create Successfully',
            }
        );
    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:'Error in Creating the Category',
            }
        );
    }
}


//get all Categorys
exports.getCategorys = async(req,res) => {
    try{

        //take out all Categorys from db
        const allCategorys = await Category.find({},{name:true,description:true});

        //return all Categorys with ok response
        return res.status(200).json(
            {
                success:true,
                Categorys:allCategorys,
                message:'All Categorys Fetched Successfully',
            }
        )

    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:'Error in fetching all Categorys',
            }
        );
    }
}

//category page details
exports.categoryPageDetails = async (req, res) => {
    try {
        
        //get category id
        const {categoryId} = req.body;

        // gewt all courses corresponsonding to that category
        let allCoursesOfCategory = await Course.find(
            {
                Category:categoryId,
            }
        ).populate("Category");

        //check validation if any course found
        if(!allCoursesOfCategory){
            allCoursesOfCategory = [];
        }

        //get courses for some different courses
        const diffCategoryCourses = await Course.find(
            {
                Category:{$ne : categoryId},
            }
        ).populate("Category");

        //get top selling courses
        const topSellingCourses = await Course.aggregate([
            {
                $addFields:{
                    studentsCount:{ $size : "$studentsEnrolled"},
                },
            },
            {
                $sort: {
                    studentsCount: -1,
                }
            },
            {
                $limit:10,
            }
        ]);

        //return response
        return res.status(200).json({
             success: true,
             message: 'Category Page Details Found...',
             categoryCourses:allCoursesOfCategory,
             diffCategoryCourses,
             topSellingCourses,
        });
        


    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Error in Fetching the Catregory Page Details',
        });
    }
};