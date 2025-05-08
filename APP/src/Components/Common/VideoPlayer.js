import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Loader from './Loader';
import ReactPlayer from 'react-player';
import { MdOutlineReplay } from "react-icons/md";
import { GiNextButton } from "react-icons/gi";
import { GiPreviousButton } from "react-icons/gi";
import { FaPlay } from "react-icons/fa";
import { formatDateTime, isLectureCompletd } from '../../Services/Operations/Course_Utils';
import { useDispatch, useSelector } from 'react-redux';
import { completeVideoRequestHandler } from '../../Services/Operations/Course_Apis';

const VideoPlayer = () => {


  const { courseContent , createdAt,_id} = useOutletContext().course;

  const [subSection, setSubSection] = useState(null);
  const { sectionId, subSectionId } = useParams();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showPlay, setshowPlay] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.Profile);

  //create player ref 
  const playerRef = useRef();

  function playHandler(replay = false) {
    setVideoPlaying(true);
    setshowPlay(false);
    if (replay) {
      setShowOptions(false);
      playerRef.current.seekTo(0, 'seconds');
    }
  }

  function nextHandler(isprev = false) {
    const subSectionOfCourse = courseContent.filter(ele => ele._id === sectionId).at(0).subSections;
    console.log('pp', subSectionOfCourse);
    const ind = subSectionOfCourse.findIndex((ele) => ele._id === subSectionId);
    console.log('oo', ind);
    const url = location.pathname;

    if (!isprev && (ind !== subSectionOfCourse.length - 1 && ind !== -1)) {
      navigate(url.replace(subSectionId, subSectionOfCourse[ind + 1]._id));
      return;
    }
    if (isprev && (ind !== 0 && ind !== -1)) {
      navigate(url.replace(subSectionId, subSectionOfCourse[ind - 1]._id));
      return;
    }

    const sectionInd = courseContent.findIndex((ele) => ele._id === sectionId);
    if (isprev && sectionInd !== 0 && sectionInd !== -1) {
      navigate(url.replace(sectionId, courseContent[sectionInd - 1]._id)
        .replace(subSectionId, courseContent[sectionInd - 1].subSections[courseContent[sectionInd - 1].subSections.length - 1]._id) || '/');
    }
    if (!isprev && sectionInd !== courseContent.length - 1 && sectionInd !== -1) {
      navigate(url.replace(sectionId, courseContent[sectionInd + 1]._id).replace(subSectionId, courseContent[sectionInd + 1].subSections[0]._id) || '/');
    }

  }

  function isLastOrFirst(isLast = false) {
    const sectionInd = courseContent.findIndex((ele) => ele._id === sectionId);
    //console.log('damn',sectionInd,courseContent.length-1);
    const subSectionOfCourse = courseContent.filter(ele => ele._id === sectionId).at(0).subSections;
    const ind = subSectionOfCourse.findIndex((ele) => ele._id === subSectionId);
    if (isLast ) {

      return ((ind === (subSectionOfCourse.length - 1)) && (sectionInd===(courseContent.length-1))) || false;
    }
    else {
      return ((ind === 0) && ((sectionInd===0))) || false;
    }
  }


  function markAsCompleteHandler(){
    const body = {
      courseId:_id,
      subSectionId,
    }
    console.log('Request Made ',body);
    dispatch(completeVideoRequestHandler(body,dispatch));
  }


  useEffect(
    () => {
      setSubSection(courseContent.filter(ele => ele._id === sectionId).at(0).subSections.filter(ele => ele._id === subSectionId).at(0) || null);
      setshowPlay(true);
      setShowOptions(false);
      setVideoPlaying(false);
    }, [courseContent, sectionId, subSectionId]
  )

  //console.log("in video",courseContent,subSection);


  if (!subSection) {
    return <Loader />
  }
  return (
    <div className='w-full mb-6'>
      <div className='w-full xl:h-[82vh] lg:h-[76vh] md:h-[500px] h-[290px] relative'>
        <ReactPlayer
          ref={playerRef}
          url={subSection?.videoUrl}
          playing={videoPlaying}
          controls={!showPlay && !showOptions}
          width='100%'
          height='100%'
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                disablePictureInPicture: false
              }
            }
          }}
          onEnded={() => { setShowOptions(true) }}
        />

        {
          showOptions &&
          <div className='absolute top-0 bottom-0 left-0 right-0 bg-richblack-700/70 text-white
          grid grid-cols-3 items-center text-center
          '>
            <div>
              <button
                onClick={() => { nextHandler(true) }}
                className={`${(isLastOrFirst() ? ('h-0 hidden') : ('h-auto'))} text-center text-4xl`}
              >
                <GiPreviousButton/>
              </button>
            </div>


            <div className='flex flex-col gap-y-3 items-center'>
              <button
                onClick={() => { playHandler(true) }}
                className='text-5xl'
              >
                <MdOutlineReplay/>
              </button>
              {
                (!isLectureCompletd(user,subSectionId,_id))&&
                <button
              className='bg-yellow-100 text-richblack-900 p-2 rounded-xl font-bold'
              onClick={markAsCompleteHandler}
              >
                Mark as Complete
              </button>
              }
            </div>


            <div>
              <button
                onClick={() => { nextHandler() }}
                className={`${(isLastOrFirst(true) ? ('h-0 hidden') : ('h-auto'))} text-4xl`}
              >
                <GiNextButton/>
              </button>
            </div>
          </div>
        }

        {
          !showOptions && showPlay &&
          <div className='absolute top-0 bottom-0 left-0 right-0 bg-richblack-700/70 text-white
          flex justify-center items-center 
          '>
            <button onClick={playHandler}
              className='bg-slate-100/40 text-4xl py-8 px-16 text-richblack-900 rounded-lg border-2'
            >
              <FaPlay/>
            </button>
          </div>
        }

      </div>


      <div className='text-white mt-7'>
        <h3 className='text-3xl font-extrabold px-4 py-3'>{subSection.title || ''}</h3>
        <p className='text-lg text-richblack-200 px-4'>{subSection.description}</p>
        <p className='text-2l mt-3 px-4'>{formatDateTime(createdAt)}</p>
      </div>


    </div>
  )
}

export default VideoPlayer;
