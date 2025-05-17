import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses, getAllEnrolledCourses } from '../Services/Operations/User_Details_Api';
import Loader from '../Components/Common/Loader';
import ProgressBar from '@ramonak/react-progress-bar';
import { calculateDuration, createviewCourseLink, getCompletedLecturesofCourse, getTotalLectures } from '../Services/Operations/Course_Utils';
import { Link } from 'react-router-dom';
import { updateLatestUserDetails } from '../Services/Operations/Profile_Apis';

const EnrolledCourses = () => {
    const [allCourses, setallCourses] = useState(null);
    //console.log(allCourses);
    const {user} = useSelector(state => state.Profile);
    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(getAllEnrolledCourses(setallCourses));
            dispatch(updateLatestUserDetails(user));
            // dispatch(getAllCourses(setallCourses));
        }, []
    );
    //console.log(allCourses);
    //console.log(user);
    return (
        <div className='text-white'>
            <h3 className='text-2xl font-extrabold'>Enrolled Courses</h3>
            {
                (!allCourses) ? (
                    <Loader margin_top={false} />
                ) : (
                    (allCourses.length === 0) ?
                        (<div className='text-xl mt-[10rem] text-center font-semibold'>You Have Not Enrolled In Any Course</div>) :
                        (
                            <div className='flex flex-col'>
                                <div className='flex bg-richblack-700 px-4 py-4 mt-10 w-full
                                font-bold
                                '>
                                    <p className='md:w-[50%] w-[40%]'>Course Name</p>
                                    <p className='md:w-[25%] w-[30%] text-center'>Durations</p>
                                    <p className='md:w-[25%] w-[30%] '>Progress</p>
                                </div>
                                <div className='flex flex-col gap-y-3 mt-6'>
                                    {
                                        allCourses.map((course, ind) => {
                                            //console.log((getCompletedLecturesofCourse(user,course._id)/getTotalLectures(course.courseContent))*100);
                                            return <Link key={ind} className='flex items-center'
                                            to={createviewCourseLink(user,course)}
                                            >
                                                <div className='flex items-center md:w-[50%] w-[40%] lg:flex-row flex-col gap-x-4'>
                                                    <div className='lg:h-[200px] h-[150px] lg:w-[50%] w-full aspect-square rounded-lg object-contain'>
                                                        <img src={course?.thumnail} alt='Thumbnail'

                                                            className='h-full w-full  rounded-lg object-contain'
                                                        />
                                                    </div>
                                                    <div className='w-[50%]'>
                                                        <p className='font-bold mb-1'>{course.courseName}</p>
                                                        <p className='overflow-hidden text-richblack-300 md:block hidden'>
                                                            {course?.CourseDescription?.substr(0, 110)}
                                                            {(course?.CourseDescription.length>110)&&'...'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className='md:w-[25%] text-center w-[30%]'>
                                                    {calculateDuration(course) || '0hr 0min'}
                                                </div>

                                                <div className='md:w-[25%] w-[30%]'>
                                                    <p className='font-bold mb-2'>Progress: 
                                                    {Math.floor((getCompletedLecturesofCourse(user,course._id)/getTotalLectures(course.courseContent))*100) || 0}%</p>
                                                    <div>
                                                        <ProgressBar 
                                            completed={(getCompletedLecturesofCourse(user,course._id)/getTotalLectures(course.courseContent))*100 || 0}
                                                            height='8px'
                                                            isLabelVisible={false}
                                                        />
                                                    </div>
                                                </div>
                                            </Link>
                                        })
                                    }
                                </div>
                            </div>
                        )
                )
            }
        </div>
    )
}

export default EnrolledCourses
