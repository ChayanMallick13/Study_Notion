import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { getCompletedLecturesofCourse, getTotalLectures } from '../../Services/Operations/Course_Utils';
import { useSelector } from 'react-redux';
import CollapsableSection from './CollapsableSection';
import useOutsideClickHandler from '../../Hooks/useOutsideClickHandler';

const VideoDetailsSidebar = ({courseName,courseContent,setreviewModal,showDash,setShowDash,elementRef}) => {

    const navigate = useNavigate();

    const {user} = useSelector(state => state.Profile);
    const {courseId} = useParams();

        useOutsideClickHandler(elementRef,() => {
          setShowDash(false);
        })

    

    //console.log(courseContent);
    // console.log(user);

  return (
    <div className={`text-white bg-richblack-800 xl:relative w-[340px] fixed z-10 h-[100%] px-5  bottom-0 py-14 flex flex-col gap-y-5
        ${(showDash)?(''):('xl:flex hidden')}
    `}
    >
        <div className='flex justify-between items-center'>
          <button
          onClick={() => {
            navigate('/dashboard/enrolled-courses');
          }}
          className='bg-richblack-300 text-richblack-900 p-3 rounded-full text-2xl font-extrabold'
          >
              <FaChevronLeft/>
          </button>

          <button className='flex items-center gap-x-3 bg-yellow-100 text-richblack-900 p-3 font-extrabold rounded-lg'
          onClick={() => {
            setreviewModal(prev => !prev)
          }}
          >
            <span>Add Review</span>
            <span><FaEdit/></span>
          </button>
        </div>
        <div>
            <h2 className='text-lg font-bold'>{courseName}</h2>
            <div className='text-richblack-300 font-semibold'>
              {getCompletedLecturesofCourse(user,courseId) || 0} of {getTotalLectures(courseContent) || 0} Lectures Completed    
            </div>
        </div>

        <div className='flex flex-col border-t-2 border-t-richblack-100/20 py-3'>
          {
            courseContent?.map(
              (ele,ind) => {
                return <CollapsableSection
                  key={ind}
                  {...ele}
                />
              }
            )
          }
        </div>
    </div>
  )
}

export default VideoDetailsSidebar;
