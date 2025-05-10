import toast from "react-hot-toast"
import { apiConnector } from "../apiconnector";
import { coursesLinks } from "../apis";





export const newRatingHandler = (closeModal,setLoadig,body) => {
    return async(dispatch) => {
        const tid = toast.loading('Recording Review...');
        setLoadig(true);
        try {
            const apiRes = await apiConnector('POST',coursesLinks.CREATE_RATING_API,body);
            //console.log(apiRes);
            toast.success('Review Recorded SuccessFully');
        } catch (error) {
            toast.error('Could Not Record Review some Error Occurred');
        }
        setLoadig(false);
        toast.dismiss(tid);
        closeModal();
    }
}



export const GetAvgRating = async (courseId,setRating) => {
    console.log(courseId);
    await apiConnector('POST',coursesLinks.GET_AVERAGE_RATING_API,{courseId}).then(
        (data) => {
            //console.log('data');
            setRating(data.data.averageRating);
        }
    ).catch(
        (err) => {
            console.log('Some Error Occured');
            setRating(0);
        }
    )
}


export const getAllReviews = async (setReviews) => {
    await apiConnector('GET',coursesLinks.GET_ALL_RATINGS_API).then(
        (data) => {
            //console.log(data.data);
            setReviews(data.data.allReviews);
        }
    ).catch(
        (err) => {
            console.log(err.response.data.message);
        }
    )
}