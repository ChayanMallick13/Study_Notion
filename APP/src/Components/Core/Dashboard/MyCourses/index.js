import React, { useEffect, useState } from 'react'
import { IoAddCircle } from 'react-icons/io5';
import Loader from '../../../Common/Loader';
import CourseCard from './CourseCard';
import { useDispatch } from 'react-redux';
import { getAllCourses, getAllEnrolledCourses } from '../../../../Services/Operations/User_Details_Api';
import { Link } from 'react-router-dom';
import { resetCourseState } from '../../../../reducer/Slices/CourseSlice';

const MyCoursePage = () => {
    const [myCourses, setmyCourses] = useState(null);
    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(getAllEnrolledCourses(setmyCourses));
            // dispatch(getAllCourses(setmyCourses));
        },[]
    )
    return (
        <div className='text-white flex flex-col gap-y-6'>

            <div className='w-full text-2xl font-bold flex justify-between'>
                <p>My Courses</p>
                <Link to={'/dashboard/add-course'} className='flex items-center bg-yellow-50 
                text-richblack-900 px-5 py-3 gap-x-2 rounded-xl text-xl'
                onClick={() =>{
                    dispatch(resetCourseState());
                }}
                >
                    <IoAddCircle />
                    <span>New</span>
                </Link>
            </div>

            <div className='flex flex-col'>
                {
                    (myCourses) ? (
                        (myCourses.length) ? (
                            <div>
                                <div className='flex font-bold border-[1px] border-richblack-700 py-3 pl-2'>
                                    <p className='lg:w-[70%] w-[50%]'>COURSES</p>
                                    <p className='lg:w-[10%] w-[17%] text-center sm:text-base text-xs'>DURATION</p>
                                    <p className='lg:w-[10%] w-[16%] text-center sm:text-base text-xs'>PRICE</p>
                                    <p className='lg:w-[10%] w-[17%] text-center sm:text-base text-xs'>ACTIONS</p>
                                </div>
                                <div className='flex flex-col'>
                                    {
                                        myCourses.map((course,id) => {
                                            return <CourseCard
                                                {...course} key={id}
                                            />
                                        })
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className='h-[40vh] text-xl font-bold
                            flex justify-center items-center
                            '>No Courses Found</div>
                        )
                    ) : (
                        <Loader />
                    )
                }
            </div>

        </div>
    )
}

export default MyCoursePage;
