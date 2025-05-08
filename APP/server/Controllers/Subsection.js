const Section = require('../Models/Section');
const SubSection = require('../Models/SubSection');
const { UploadFileToCloudinary } = require('../Utilities/Uploader');
const { fileRemoveFromCloudinary } = require('../Utilities/FileRemover');
const Course = require('../Models/Course');
require('dotenv').config();


exports.createSubSection = async (req, res) => {
    try {

        //take out the data from req body
        const { title, description, sectionId, courseId } = req.body;

        //take out the video from file
        const { LectureVideo } = req.files;

        //do validation
        if (!title || !description || !sectionId) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'All Field are Required',
                }
            );
        }

        //upload the video to cloudinary and take out the url
        const response = await UploadFileToCloudinary(LectureVideo, process.env.LECTURES_FOLDER_NAME);

        //make a subsection entry in db
        const newSubSection = await SubSection.create(
            {
                title,
                timeDuration: response.duration,
                description,
                videoUrl: response.secure_url,
            }
        );

        //add this subsection in the section repectively update section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {
                $push: {
                    subSections: newSubSection._id,
                }
            }, {
            new: true,
        }
        ).populate('subSections').exec();

        const newCourseDetails = await Course.findById(courseId)
            .populate('instructor').populate('Category').populate('ratingAndReviews')
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections",
                }
            })
            .exec();

        //return succ res
        return res.status(200).json(
            {
                success: true,
                message: 'Subsection Created Successfully',
                course: newCourseDetails,
            }
        );


    } catch (err) {
        console.error(err);
        return res.status(500).json(
            {
                success: false,
                message: 'Error in Creating a New SubSection',
            }
        );
    }
};

exports.updateSubSection = async (req, res) => {
    try {
        //take out the data from req body
        const { title, description, SubSectionId,courseId } = req.body;

        //take out the video from file
        const  LectureVideo  = (req.files)?(req.files.LectureVideo):(null);

        //do validation
        if (!title || !description || !SubSectionId) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'All Field are Required',
                }
            );
        }
        let updateValue = null;
        if (!LectureVideo) {
            updateValue = {
                title,
                description,
            }
        }
        else {
            //get the url details
            const subsectiondetails = await SubSection.findById(SubSectionId);
            const url = subsectiondetails.videoUrl;

            //remove the previous lecture from the cloudinary
            const removeLecture = await fileRemoveFromCloudinary(url, 'video');

            //upload the video to cloudinary and take out the url
            const response = await UploadFileToCloudinary(LectureVideo, process.env.LECTURES_FOLDER_NAME);

            updateValue = {
                title,
                description,
                videoUrl: response.secure_url,
                timeDuration:response.duration,
            }
        }



        //update the values in the db
        const updatedSubSection = await SubSection.findByIdAndUpdate(SubSectionId,
            updateValue
            , {
                new: true,
            }
        );


        const newCourseDetails = await Course.findById(courseId)
        .populate('instructor').populate('Category').populate('ratingAndReviews')
        .populate({
            path: "courseContent",
            populate: {
                path: "subSections",
            }
        })
        .exec();

        //return a successfull response
        return res.status(200).json(
            {
                success: true,
                message: 'Subsection Updated Successfully',
                course:newCourseDetails,
            }
        );



    } catch (err) {
        console.error(err);
        return res.status(500).json(
            {
                success: false,
                message: 'Error in Updating the SubSection',
            }
        );
    }
};

exports.deleteSubSection = async (req, res) => {
    try {
        //take out the info from parameters of link
        const { sectionId, SubSectionId, courseId } = req.body;

        //validate the data
        if (!sectionId || !SubSectionId) {
            return res.status(400).json(
                {
                    success: false,
                    message: 'All Field are Required',
                }
            );
        };

        //remove this subsection form the section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {
                $pull: {
                    subSections: SubSectionId,
                }
            }, {
            new: true,
        }
        );

        //take out the video details from the db to delete
        const subsectiondetails = await SubSection.findById(SubSectionId);
        const lectureUrl = subsectiondetails.videoUrl;


        //delete the video uploaded into cloudinary
        const removefileDetails = await fileRemoveFromCloudinary(lectureUrl, 'video');

        //now delete this subsection whole
        const deletedSubSection = await SubSection.findByIdAndDelete(SubSectionId);

        const newCourseDetails = await Course.findById(courseId)
            .populate('instructor').populate('Category').populate('ratingAndReviews')
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSections",
                }
            })
            .exec();

        //return a successfull response
        return res.status(200).json(
            {
                success: true,
                message: 'SubSection Deleted Successfully',
                course: newCourseDetails,
            }
        );


    } catch (err) {
        //error
        return res.status(500).json(
            {
                success: false,
                message: 'Error in Deleting the SubSection',
            }
        );
    }
};