import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileLinks, updateProfileLinks } from "../apis";
import { setUser } from "../../reducer/Slices/ProfileSlice";


export const editProfilePic = (formData,setDisableBtn,user) => {
    return async(dispatch) => {
        setDisableBtn(true);
        const toastid = toast.loading('Waiting');
        try {
            const apiRes = await apiConnector('PUT',updateProfileLinks.UPDATE_DP,formData);
            // console.log(apiRes);
            toast.success('Profile Picture Changed Successfully');
            // console.log('data',apiRes.data.updatedUserDetails);
            dispatch(setUser(apiRes.data.updatedUserDetails));
        } catch (err) {
            console.log(err.message);
            toast.error('Some Error Occurred , Try Again');
        }
        toast.dismiss(toastid);
        setDisableBtn(false);
    }
}

export const chnageProfileDetails = (formdata,setdiableSubmit) => {
    return async(dispatch) => {
        setdiableSubmit(true);
        const toastId = toast.loading('Loading...');
        try {
            const updateRes = await apiConnector('PUT',updateProfileLinks.UPDATE_PROFILE_DETAILS,formdata);
            if(updateRes.data.success){
                dispatch(setUser(updateRes.data.updatedUser));
                // console.log('data',updateRes.data.updatedUser);
                toast.success('Profile Update Successfull');
            }
            else{
                throw new Error("Error");
            }

        } catch (err) {
            console.log('Problem in Update Profile');
            toast.error('Profile Update Failed , Try again Later');
        }
        toast.dismiss(toastId);
        setdiableSubmit(false);
    }
}

export const changePassword = (formdata,setdiableSubmit) => {
    return async(dispatch) => {
        setdiableSubmit(true);
        const toastId = toast.loading('Loading..');
        try {
            const apiRes = await apiConnector('PUT',updateProfileLinks.CHANGE_PASSWORD_API,formdata);
            if(apiRes.data.success){
                toast.success('Password Changed Successfully');
                dispatch(updateLatestUserDetails());
            }
            else{
                throw new Error("Error");
            }
        } catch (err) {
            toast.error('Password is Incorrect');
        }
        toast.dismiss(toastId);
        setdiableSubmit(false);
    }
}

export const makeDeleteReq = (setreqForDeletion,setloadingDeletionStatus) => {
    return async(dispatch)=>{
        setloadingDeletionStatus(true);
        const toastId = toast.loading('Loading..');
        try {
            const deleteReqResponse = await apiConnector('DELETE',updateProfileLinks.DELETE_ACCOUNT_REQ);
            if(deleteReqResponse.data.success){
                setreqForDeletion(true);
                toast.success('Account Delete Request Sent, Account Will be Delete within 3 Days');
            }
        } catch (err) {
            toast.error('Request Can\'t be Made');
        }
        setloadingDeletionStatus(false);
        toast.dismiss(toastId);
    }
}

export const makeRecoverReq = (setreqForDeletion,setloadingDeletionStatus) => {
    return async(dispatch)=>{
        setloadingDeletionStatus(true);
        const toastId = toast.loading('Loading..');
        try {
            const recoverAccountRes = await apiConnector('POST',updateProfileLinks.RECOVER_ACCOUNT_REQ);
            if(recoverAccountRes.data.success){
                setreqForDeletion(false);
                toast.success('Account Recovered Successfully');
            }
        } catch (err) {
            toast.error('Request Can\'t be Made');
        }
        setloadingDeletionStatus(false);
        toast.dismiss(toastId);
    }
}

export const updateLatestUserDetails = () => {
    return async(dispatch) => {
        await apiConnector('GET',profileLinks.GET_ALL_PROFILE_DETAILS_API).then(
            (res) => {
                dispatch(setUser(res.data.UserDetails));
                localStorage.setItem('user',JSON.stringify(res.data.UserDetails));
            }
        );
    }
}

export const fetchUserDetails = async(setUserDetails) => {
    await apiConnector('GET',profileLinks.GET_INSTRUCTOR_STATS_API)
    .then(
        (res) => {
            setUserDetails(res.data);
        }
    ).catch(
        (err) => {
            console.log(err.response.data.message);
        }
    );
}