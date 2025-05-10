import React from 'react'
import { FaPen, FaRegCheckCircle, FaRegClock } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setCourse, setEditCourse, setStep } from '../../../../reducer/Slices/CourseSlice';
import { COURSE_STATUS } from '../../../../utlis/constants';
import { LuPen } from 'react-icons/lu';

const CourseCard = ({ thumnail, courseName, whatYouWillLearn, CourseDescription,
    createdAt, duration, price, _id, tags, instructions, Category, status ,instructor,courseContent,ratingAndReviews
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(status);
    const editCourseDispatcher = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
        dispatch(setCourse(
            { thumnail, courseName, CourseDescription, createdAt, duration, price, _id, tags, instructions,
                 whatYouWillLearn, Category
                ,instructor,courseContent,ratingAndReviews,status
             }
        ));
        navigate('/dashboard/add-course');
    }
    return (
        <div className='flex font-bold border-[1px] border-richblack-700 py-6 pl-2 items-center'>
            <div className='lg:w-[70%] w-[50%] flex lg:flex-row flex-col items-center gap-x-3'>
                <img src={thumnail} alt='thumnail'
                    className='w-[250px] h-[170px] aspect-square object-contain rounded-xl'
                />
                <div className='flex gap-y-2 flex-col w-[50%]'>
                    <p className='text-xl font-bold'>{courseName}</p>
                    <p className='text-sm text-richblack-200 font-light'>{CourseDescription?.substr(0,120)}</p>
                    <p className='text-richblack-50'>Created: {createdAt}</p>
                    <div className={`flex items-center gap-x-2 px-3 py-2 rounded-full w-max
                    ${(status===COURSE_STATUS.DRAFT
                    || (typeof status === 'object')
                    )?('text-red-300 bg-red-100/20'):('text-yellow-200 bg-yellow-50/20')}
                    `}>
                        <p>
                            {
                                (status===COURSE_STATUS.DRAFT)?(<FaRegClock />):(<FaRegCheckCircle />)
                            }
                        </p>
                        <p>{(typeof status === 'object')?('Draft'):(status)}</p>
                    </div>
                </div>
            </div>
            <div className='lg:w-[10%] w-[17%] text-center text-richblack-200 font-light'>
                {duration || 0}
            </div>
            <div className='lg:w-[10%] w-[16%] text-center text-richblack-200 font-light'>
                ₹{price}
            </div>
            <div className='lg:w-[10%] w-[17%] sm:text-2xl text-lg gap-x-3 text-center flex justify-center 
        text-richblack-200 font-light items-center'>
                <button onClick={() => {
                    editCourseDispatcher();
                }}>
                    <div className='hover:text-green-700 duration-500 transition-all hover:scale-125'>
                    <LuPen />
                    </div>
                </button>
                {/* <button
                    onClick={() => {
                        console.log('Course Deleted');
                    }}
                    className='place-self-start'
                >
                    <RiDeleteBin6Line />
                </button> */}
            </div>
        </div>
    )
}

export default CourseCard;
