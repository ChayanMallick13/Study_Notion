const Section = require('../Models/Section');
const Course = require('../Models/Course');
const subSections = require('../Models/SubSection');
const {fileRemoveFromCloudinary} = require('../Utilities/FileRemover');

async function deleteSubSection(SubSectionId) {
    //take out the video details from the db to delete
    const subsectiondetails = await subSections.findById(SubSectionId);
    const lectureUrl = subsectiondetails.videoUrl;


    //delete the video uploaded into cloudinary
    const removefileDetails = await fileRemoveFromCloudinary(lectureUrl,'video');

    //now delete this subsection whole
    const deletedSubSection = await subSections.findByIdAndDelete(SubSectionId);
};


exports.createSection = async(req,res) => {
    try{

        //take out the course id and the section name from the req body
        const {sectionName, courseId} = req.body;

        //validate the name
        if(!sectionName || !courseId){
            return res.status(400).json(
                {
                    success:false,
                    message:'All Field are Required',
                }
            );
        }

        //validate the course id check if course exists 
        const sectionsCourse = await Course.findById(courseId);
        if(!sectionsCourse){
            return res.status(404).json(
                {
                    success:false,
                    message:'Error in Finding Any Course of Given Id in Section Create',
                }
            );
        }

        //make a entry of new section in db
        const newSection = await Section.create(
            {
                SectionName:sectionName,
            }
        );

        //modiify the course details by pushing respective section of ths course 
        const newCourseDetails = await Course.findByIdAndUpdate(sectionsCourse._id,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {
                new:true,
            }
        ).populate('instructor').populate('Category').populate('ratingAndReviews')
        .populate({
            path:"courseContent",
            populate:{
                path:"subSections",
            }
        })
        .exec();

        console.log('New Course Details in Section - ',newCourseDetails);

        //return a successfull reseponse
        return res.status(200).json(
            {
                success:true,
                message:'New Section Created Successfully',
                course:newCourseDetails,
            }
        );

    }catch(err){
        return res.status(500).json(
            {
                success:false,
                message:'Error in Creating a New Section',
            }
        );
    }
};

exports.updateSection = async(req,res) => {
    try {

        //take out the section id from the body to be updated and data to be updated
        const {sectionName,SectionId,courseId} = req.body;

        //validate the input data
        if(!sectionName || !SectionId){
            return res.status(400).json(
                {
                    success:false,
                    message:'All Field are Required',
                }
            );
        }

        //update the data in db
        const updatedSection = await Section.findByIdAndUpdate(SectionId,
            {
                SectionName:sectionName,
            },
            {
                new:true,
            }
        );

        //get the course
        const newCourseDetails = await Course.findById(courseId)
        .populate('instructor').populate('Category').populate('ratingAndReviews')
        .populate({
            path:"courseContent",
            populate:{
                path:"subSections",
            }
        })
        .exec();

        //return successfull response
        return res.status(200).json(
            {
                success:true,
                message:'Section Updated Successfully',
                course:newCourseDetails,
            }
        );
        
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:'Error in Updating the Section',
            }
        );
    }
};

exports.deleteSection = async(req,res) => {
    try {

        //take out the section id to delete from body
        const {sectionId,CourseId} = req.body;

        console.log(req.body);

        //validate the id
        if(!sectionId){
            return res.status(400).json(
                {
                    success:false,
                    message:'All Field are Required',
                }
            );
        }
        const reqSection = await Section.findById(sectionId);
        if(!reqSection){
            return res.status(404).json(
                {
                    success:false,
                    message:'Error in Finding Any Course of Given Id in Section Deletion',
                }
            );
        }

        //remove this section id from the course content
        const updatedCourse = await Course.findByIdAndUpdate(CourseId,
            {
                $pull:{
                    courseContent:sectionId,
                }
            },{
                new:true,
            }
        ).populate('instructor').populate('Category').populate('ratingAndReviews')
        .populate({
            path:"courseContent",
            populate:{
                path:"subSections",
            }
        })
        .exec();;

        //delete all the subsections contained in this section
        for(const subsectionId of reqSection.subSections){
            await deleteSubSection(subsectionId);
        }

        //now delete this section
        await Section.findByIdAndDelete(sectionId);

        //send successful response
        return res.status(200).json(
            {
                success:true,
                message:'Section Deleted Successfully',
                course:updatedCourse,
            }
        );

        
    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:'Error in Deleting the Section',
            }
        );
    }
};