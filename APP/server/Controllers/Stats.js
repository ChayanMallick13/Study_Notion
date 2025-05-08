const User = require('../Models/User');
const Course = require('../Models/Course');



exports.getStats = async(req,res) => {
    try {
        
        //get the all users
        const allusers = await User.find({});

        //filter the instructors
        const instructorsCount = allusers.filter(ele => ele.accountType==='Instructor').length;

        //filter the students
        const studentsCount = allusers.filter(ele => ele.accountType==='Student').length;

        //get the courses count
        const allCourses = await Course.find({});
        const courseCount = allCourses.length;


        //return a successfull response
        return res.status(200).json(
            {
                success:true,
                data:[
                    {
                        label:'Active Students',
                        count:studentsCount,
                    },
                    {
                        label:'Mentors',
                        count:instructorsCount,
                    },
                    {
                        label:'Courses',
                        count:courseCount,
                    },
                ],
                message:'All Data Fetched Successfully'
            }
        )
    } catch (err) {
        console.error(err);
        console.log('Error in Fetching Stats');
        return res.status(500).json(
            {
                success:false,
                message:'Error in Fetching Data',
            }
        );
    }
}