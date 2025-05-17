import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseProgressLinks, coursesLinks } from "../apis";
import { setToken, setsignupData } from "../../reducer/Slices/authslice";
import { setUser } from "../../reducer/Slices/ProfileSlice";
import { resetLoader, setLoader } from "../../reducer/Slices/LoaderSlice";
import { setCourse, setStep } from "../../reducer/Slices/CourseSlice";
import { updateLatestUserDetails } from "./Profile_Apis";
import { createviewCourseLink } from "./Course_Utils";

export const editCourseDetails = (courseId, setLoading, formData) => {
    return async (dispatch) => {
        const tid = toast.loading('Loading...');
        setLoading(true);
        formData.append('courseId', courseId);
        await apiConnector('PUT', coursesLinks.UPDATE_COURSE, formData).then(
            (res) => {
                dispatch(setStep(2));
                dispatch(setCourse(res.data.course));
            }
        ).catch(
            (err) => {
                toast.error(err?.response?.data?.message || 'Some Error Occured');
            }
        );
        setLoading(false);
        toast.dismiss(tid);
    }
}

export const createCourse = (formData, setLoading) => {
    return async (dispatch) => {
        const tid = toast.loading('Loading...');
        setLoading(true);
        await apiConnector('POST', coursesLinks.CREATE_COURSE, formData).then(
            (response) => {
                console.log(response.data);
                toast.success('Step 1 Completed Successfully');
                dispatch(setStep(2));
                dispatch(setCourse(response.data.course));
            }
        ).catch(
            (err) => {
                toast.error(err?.response?.data?.message || 'Some Error Occured');
            }
        );
        setLoading(false);
        toast.dismiss(tid);
    }
}

export const getCourseDetails = (body, setCourseDetails, setLoading,navigate=null) => {
    return async (dispatch) => {
        setLoading(true);
        const tid = toast.loading('Loading...');
        try {
            const data = await apiConnector('POST', coursesLinks.GET_COURSE_DETAILS, body);
            setCourseDetails(data.data?.courseDetails);

        } catch (err) {
            toast.error('Some Error Occurred in Fetching Course Details ...');
            //navigate('/');
            console.log('Home Page');
        }
        toast.dismiss(tid);
        setLoading(false);
    }
}

export const completeVideoRequestHandler = (body,navigate) => {
    return async(dispatch)=>{
        const tid = toast.loading('Loading...');
        try {
            await apiConnector('POST',courseProgressLinks.COMPLETE_VIDEO_LINK,body).then(
                (data) => {
                    toast.success('Lecture Marked as Completed');
                    //navigate(createviewCourseLink());
                }
            ).catch(
                (err) => {
                    toast.error('Some Error in Marking Lecture ');
                    console.log('Some Error Occurred in Complete Video Handler');
                }
            );
            await dispatch(updateLatestUserDetails(true));
        } catch (error) {
            console.error('Some Error Occurred in Complete Video Handler');
        }
        toast.dismiss(tid);
    }
}
