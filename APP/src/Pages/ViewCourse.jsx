import React, { useEffect, useRef, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import VideoDetailsSidebar from '../Components/ViewCourse/VideoDetailsSidebar';
import ReviewModal from '../Components/ViewCourse/ReviewModal';
import Loader from '../Components/Common/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseDetails } from '../Services/Operations/Course_Apis';
import Footer from '../Components/Common/Footer';
import { VscThreeBars } from "react-icons/vsc";


const ViewCourse = () => {

    const [reviewModal, setreviewModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState(null);

    const { courseId, sectionId, subSectionId } = useParams();

    //console.log(courseId,sectionId,subSectionId);

    //console.log('yy',reviewModal);

    const naviigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.Profile);
    const [showDash, setshowDash] = useState(true);
    const body = {
        courseId,
    };

    function fetchCourseDetails() {
        dispatch(getCourseDetails(body, setCourse, setLoading, naviigate));
    }

    const elementRef = useRef();

    useEffect(
        () => {
            fetchCourseDetails();
            if (!courseId || !sectionId || !subSectionId || !user?.courses?.includes(courseId)) {
                //naviigate('/');
                //console.log('Home Page useEffect', user);
            }
        }, []
    )


    // console.log('course',course);
    // console.log(user);





    if (loading || !course) {
        return <Loader />
    }







    return (
        <div>
            <div className='flex min-h-[100vh]'>
                <div className='min-h-[100%]' ref={elementRef}>
                    <VideoDetailsSidebar
                        setreviewModal={setreviewModal}
                        {...course}
                        showDash={showDash}
                        setShowDash={setshowDash}
                        elementRef={elementRef}
                    />
                    <button
                    onClick={() => { setshowDash(prev => !prev) }}
                    className={`z-40 text-white ${(showDash)?('fixed top-4 -left-2 px-5 text-xl'):('absolute top-4 left-3 text-xl')} font-extrabold xl:hidden block`}
                    >
                        <VscThreeBars/>
                    </button>
                </div>

                <div className='w-full'>
                    <Outlet
                        context={{ course, setCourse }}
                    />
                </div>

                {
                    reviewModal &&
                    <ReviewModal
                        setreviewModal={setreviewModal}
                    />
                }


            </div>
            <Footer />
        </div>
    )
}

export default ViewCourse;
