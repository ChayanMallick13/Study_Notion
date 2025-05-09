import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {  getCourseDetails } from '../Services/Operations/Course_Apis';
import Loader from '../Components/Common/Loader';
import ReactStars from 'react-stars';
import { CiGlobe } from "react-icons/ci";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaRegShareFromSquare } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { FaCaretRight } from "react-icons/fa";
import { addToCart } from '../reducer/Slices/CartSlice';
import { ACCOUNT_TYPE } from '../utlis/constants';
import SectionCard from '../Components/CoursePage/SectionCard';
import Footer from '../Components/Common/Footer';
import { buyCourse } from '../Services/Operations/Payment_Apis';
import { updateLatestUserDetails } from '../Services/Operations/Profile_Apis';
import { calculateDuration, CopyToClipBoard, createviewCourseLink, formatDateTime, getTotalLectures } from '../Services/Operations/Course_Utils';
import { GetAvgRating } from '../Services/Operations/Ratings_Apis';

function CoursePage() {
    const {courseId} = useParams();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false);
    const [courseDetails,setCourseDetails] = useState(null);
    const [averageRating,setAverageRating] = useState(0);
    const [triggerCollapse,setTriggerCollapse] = useState(true);
    const location = useLocation();
    const {user} = useSelector(state => state.Profile);
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();

    function fetchCourseDetails(){
        const body = {
            courseId,
        }
        dispatch(updateLatestUserDetails());
        dispatch(getCourseDetails(body,setCourseDetails,setLoading,navigate));
        GetAvgRating(courseId,setAverageRating);
    }

    function checkAlreadyBought(){
        if(user.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            return false;
        }
        const ret = user.courses.filter((ele) => ele._id === courseId);
        //console.log(ret);
        return ret.length;
    }

    function shareBtnHandler() {
        
        const textToCopy = process.env.REACT_APP_FRONTEND_URL + location.pathname;

        CopyToClipBoard(textToCopy);
        
    }

    function addTocartHandler(){
        if(!user){
            navigate('/login');
            toast.error('Login First To Add Course To Cart');
        }
        else if(user?.accountType===ACCOUNT_TYPE.INSTRUCTOR){
            toast.error('You are Instructor , Cant Buy Courses');
        }
        else{
            dispatch(addToCart(courseDetails));
        }
    }

    function handleBuyCourse(){
        if(user?.accountType===ACCOUNT_TYPE.INSTRUCTOR){
            toast.error('You are Instructor , Cant Buy Courses');
            return;
        }
        const body = {
            courses:[courseId],
        };
        buyCourse(body,navigate,dispatch);
    }
      

    useEffect(
        () => {
            fetchCourseDetails();
        },[courseId]
    )

    if(loading || !courseDetails){
        return <Loader/>
    }

    //console.log(user);

  return (
    <div className='text-white'>
        <div className='w-full bg-richblack-800'>

            <div className='lg:w-9/12 w-[94%] mx-auto flex flex-col-reverse justify-between relative'>
                <div className='lg:w-[65%] w-[100%] py-8 px-10 mb-16 flex flex-col gap-y-4
                border-y-[1px] border-y-richblack-300/50 lg:hidden
                '>
                    <p className='text-3xl font-extrabold block lg:hidden'>Rs. {courseDetails?.price}</p>
                    <div className='flex flex-col gap-y-3 my-5 lg:hidden'>
                    <button
                        className='w-full bg-yellow-100 text-richblack-900 font-semibold p-2 rounded-xl'
                        onClick={() => {
                            if(!token || !user){
                                toast.error('SignIn first To Make a Purchase');
                                navigate('/login');
                            }
                            else if(checkAlreadyBought()){ //go to course
                                navigate(createviewCourseLink(user,courseDetails));
                            }
                            else{ //buy course 
                                handleBuyCourse();
                            }
                        }}
                        >
                            {(checkAlreadyBought())?('Go To Course'):('Buy Course')}
                        </button>
                        <button
                        className={`w-full bg-richblack-700 text-richblack-200 font-semibold p-2 rounded-xl 
                            ${(checkAlreadyBought())?('hidden'):('block')}
                        `}
                        onClick={addTocartHandler}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div className='lg:w-[65%] w-[100%] py-[5.6rem] flex flex-col gap-y-4'>
                    <h3 className='text-4xl font-extrabold'>{courseDetails?.courseName}</h3>
                    <p className='text-richblack-300 text-lg'>{courseDetails?.CourseDescription}</p>
                    <div className='flex gap-4 items-center text-xl flex-wrap'>
                        <p className='text-yellow-100 font-extrabold'>{averageRating}</p>
                        <div>
                            <ReactStars
                                count={5}
                                value={averageRating}
                                size={26}
                                edit={false}
                            />
                        </div>
                        <p>({courseDetails?.ratingAndReviews?.length || 0} Reviews)</p>
                        <p>{courseDetails?.studentsEnrolled?.length || 0} Students Enrolled</p>
                    </div>
                    <p className='mt-2 text-xl'>Created By {courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</p>
                    <div className='flex gap-x-7 gap-y-3 text-lg flex-wrap'>
                        <div className='flex flex-wrap items-center gap-x-2'>
                            <IoInformationCircleOutline/>
                            <span>Created At </span>
                            <span>{formatDateTime(courseDetails?.createdAt)}</span>
                        </div>
                        <div className='flex items-center gap-x-2'><CiGlobe/> English</div>
                    </div>
                </div>

                <div className='lg:w-[33%] w-[95%] bg-richblack-700 
                lg:absolute block right-0 top-12 lg:p-4 p-0 rounded-md place-self-center
                lg:mt-0 mt-8
                '>
                    <div className='relative w-full h-full'>
                        <img
                            alt='Course Thumbnail'
                            src={courseDetails?.thumnail}
                            className='rounded-xl lg:mb-7 mb-0 max-h-[400px] w-full lg:h-auto md:h-[400px] h-[300px] 
                            '
                        />
                        <div
                            className='h-[80%] w-full from-richblack-800 absolute bottom-0
                            bg-gradient-to-t lg:hidden
                            '
                        />
                    </div>
                    <p className='text-3xl font-extrabold hidden lg:block'>Rs. {courseDetails?.price}</p>
                    <div className='hidden flex-col gap-y-3 my-5 lg:flex'>
                    <button
                        className='w-full bg-yellow-100 text-richblack-900 font-semibold p-2 rounded-xl'
                        onClick={() => {
                            if(!token || !user){
                                toast.error('SignIn first To Make a Purchase');
                                navigate('/login');
                            }
                            else if(checkAlreadyBought()){ //go to course
                                navigate(createviewCourseLink(user,courseDetails));
                            }
                            else{ //buy course 
                                handleBuyCourse();
                            }
                        }}
                        >
                            {(checkAlreadyBought())?('Go To Course'):('Buy Course')}
                        </button>
                        <button
                        className={`w-full bg-richblack-700 text-richblack-200 font-semibold p-2 rounded-xl 
                            ${(checkAlreadyBought())?('hidden'):('block')}
                        `}
                        onClick={addTocartHandler}
                        >
                            Add to Cart
                        </button>
                    </div>

                    <p className='text-center text-richblack-50 mb-5 hidden lg:block'>30-Day Money-Back Guarantee</p>

                    <div className='hidden lg:block'>
                        <h3 className='text-xl font-bold mb-3'>This Course Includes :</h3>
                        <ul>
                            {
                                courseDetails?.instructions?.map(
                                    (ele,key) => {
                                        return <li key={key} className='flex gap-x-3 text-green-500 items-baseline'>
                                            <span className='pt-3'><FaCaretRight/></span>
                                            <span>{ele}</span>
                                        </li>
                                    }
                                )
                            }
                        </ul>
                    </div>

                    <button
                    onClick={shareBtnHandler}
                    className='mt-5 lg:flex hidden items-center gap-x-2 text-yellow-100 justify-center w-full mb-5'
                    >
                        <FaRegShareFromSquare/>
                        <span> Share</span>
                    </button>
                </div>

            </div>

        </div>

        <div className='lg:w-9/12 w-[94%] mx-auto text-white py-16'>
            
            <div className='flex flex-col border-2 border-richblack-300/40 lg:w-[65%] w-[100%] py-9 px-11'>
                <h3 className='text-4xl font-extrabold mb-7'>What you'll learn</h3>
                <p>{courseDetails?.whatYouWillLearn}</p>
            </div>

            <div className='flex flex-col lg:w-[65%] w-[100%] mt-20 gap-y-8'>
                
                <h3 className='font-extrabold text-3xl'>Course Content</h3>

                <div className='flex justify-between items-center flex-wrap'>
                    
                    <div className='flex gap-x-4 gap-y-2 flex-wrap'>
                        <div className='flex gap-x-1'>
                            <p>{courseDetails?.courseContent?.length} </p>
                            <p>Section/s</p>
                        </div>

                        <div className='flex gap-x-1'>   
                                <p>{getTotalLectures(courseDetails?.courseContent)}</p>
                                <p>Lecture/s </p>
                        </div>
                        
                        <div className='flex gap-x-1'>
                            <p>{calculateDuration(courseDetails)}</p>
                            <p>Total Length</p>
                        </div>
                    </div>

                    <button
                    onClick={() => {
                        setTriggerCollapse(prev => !prev);
                        
                    }}
                    className='text-yellow-100 mt-4 lg:mt-0'
                    >
                        Collapse All Sections
                    </button>

                </div>

                <div>
                    {
                        courseDetails?.courseContent?.map(
                            (ele,id) => {
                                return <SectionCard
                                    key={id}
                                    {...ele}
                                    triggerCollapse={triggerCollapse}
                                />
                            }
                        )
                    }
                </div>

                <div>
                    <h3 className='text-3xl font-extrabold mb-3'>Author</h3>
                    <div className='flex gap-x-5 items-center'>
                        <img alt='userIamge' src={courseDetails?.instructor?.image}
                            className='h-[75px] w-[75px] rounded-full object-cover'
                        />
                        <span className='text-2xl'>{courseDetails?.instructor?.firstName} {courseDetails?.instructor?.lastName}</span>
                    </div>
                </div>

            </div>

        </div>

        <Footer/>
    </div>
  )
}

export default CoursePage;
