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


exports.getInstructorStats = async (req, res) => {
    try {
        const {userId} = req.user;

        const userInfo = await User.findById(userId)
        .populate('courses')
        .exec();

        if(!userInfo || userInfo.accountType!=='Instructor'){
            return res.status(404).json({
                 success: false,
                 message: 'User Not Found',
            });
        }

        let students = [];
        

        let TotalIncome = 0,totalStudents=0;
        for(let course of userInfo.courses){
            TotalIncome += (course.price*course.studentsEnrolled.length);
            students = [...students,...course.studentsEnrolled];
            console.log(students);
            course.income = (course.price*course.studentsEnrolled);
        }

        let uniqueStudents = [];
        students.forEach(ele => uniqueStudents.push(ele.toString()));

        totalStudents = [...new Set(uniqueStudents)].length;

        let courses = [...userInfo.courses];
        courses = courses.splice(0,3).reverse();
        
        return res.status(200).json({
             success: true,
             message: 'All Stats Fetched Successfully',
             TotalIncome,
             totalStudents,
             totalCourses:userInfo.courses.length,
             courses,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: 'Some Error Occured in gr=etting the info',
        });
    }
};