import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { coursesLinks } from "../apis";
import { setCourse } from "../../reducer/Slices/CourseSlice";


export const getAllEnrolledCourses = (setallCourses) => {
    return async(dispatch) => {
        try {
            const api_res = await apiConnector('GET',coursesLinks.ENROLLED_API);
            // console.log(api_res.data.userCourses);
            setallCourses(api_res.data.userCourses);
        } catch (err) {
            console.log('Error in Fetching User Courses ......');
            toast.error('Error in Fetching Courses....');
        }
    }
}

export const getAllCourses = (setmyCourses) => {
    return async(dispatch) => {
        try {
            const apires = await apiConnector('GET',coursesLinks.TEMP);
            // dispatch(setCourse(apires.data.allCourses.at(0)));
            console.log(apires.data.allCourses);
            // setallCourses(apires.data.allCourses);
            // dispatch(setcart(apires.data.allCourses));
            // return apires.data.allCourses;
            setmyCourses(apires.data.allCourses);
        } catch (err) {
            console.log(err.message);
            toast.error('Error in Fetching All Courses');
            // return [];
        }
    }
}