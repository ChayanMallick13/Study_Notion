import toast from "react-hot-toast";
import  {apiConnector}  from "../apiconnector";
import { authLinks, updateProfileLinks } from "../apis";
import { setToken,setsignupData } from "../../reducer/Slices/authslice";
import { setUser } from "../../reducer/Slices/ProfileSlice";
import { resetLoader, setLoader } from "../../reducer/Slices/LoaderSlice";
import { resetCart } from "../../reducer/Slices/CartSlice";




export const logIn = (userDetails,navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading('Loading..');
        dispatch(setLoader());
        try{
            if(userDetails===null){
                return console.log('Login Error , Form Data Error');
            }
    
            const loginLink = authLinks.LOGIN_API;
    
            // console.log(loginLink);
    
            const apiDetails = (await apiConnector('POST',loginLink,userDetails));
    
            const loginData = apiDetails.data;
    
            console.log(loginData);
    
            if(loginData.success){
                dispatch(setToken(loginData.user.token));
                dispatch(setUser(loginData.user));
                console.log(loginData.user);
                localStorage.setItem('token',JSON.stringify(loginData.user.token));
                localStorage.setItem('user',JSON.stringify(loginData.user));
                if(navigate)
                    navigate('/dashboard/my-profile');
                toast.success(loginData.message);
            }
            else{
                toast.error(loginData.message);
            }
    
        }
        catch(err){
            console.log('Some Error Occurred');
            console.error(err);
            toast.error('Error in Logging You In..');
        }
        dispatch(resetLoader());
        toast.dismiss(toastId);
    };
}

export const signout = (navigate) => {
    return async(dispatch) => {
        try{
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('signupData');
            dispatch(setToken(null));
            dispatch(setUser(null));
            dispatch(resetCart());
            navigate('/');
            toast.success('SignOut Successfull');
        }
        catch(err){
            toast.error('Some Error Occurred in Signing Out');
        }
    }
}

export const sendOtp = (navigate,formdata=null,setIscounting=null) => {
    
    return async(dispatch) => {
        dispatch(setLoader());
        const toastid = toast.loading('Loading..');
        try{
            if(!formdata){
                throw new Error("Error in Signing In");
            }
            const email = formdata.email;

            const userapidetails = await apiConnector('POST',authLinks.GETOTP_API,{email});
            console.log(userapidetails);
            if(!userapidetails.data.success){
                throw new Error("Error in Sending otp");
            }
            const contactNumber = formdata.countryCode + formdata.phNum;
            const userDetails = {...formdata,contactNumber};
            // console.log(userDetails);
            dispatch(setsignupData(userDetails));
            navigate('/verify-email');
            toast.success('OTP SENT SUCCESSFULLY');
            if(setIscounting!=null)
                setIscounting(true);

        }catch(err){
            toast.error('Problem In Sending OTP');
            console.log(err);
        }
        toast.dismiss(toastid);
        dispatch(resetLoader());
    }
    
}

export const getResetPasswordToken = (email,setEmailSent) => {
    return async(dispatch) => {
        dispatch(setLoader());
        try{
            const resetTokenResponse = await apiConnector('POST',authLinks.GET_RESET_TOKEN_API,{email});
            console.log(resetTokenResponse.data.message);

            toast.success('Reset Password Mail sent Successfully');
            setEmailSent(true);
        }
        catch(err){
            toast.error('Problem In Sending Link.....');
            console.log('Error in Sending Reset Link');
        }
        dispatch(resetLoader());
    }
}

export const updatePassword = (formdata,navigate,setemail) => {
    return async(dispatch) => {
        console.log(formdata.token);
        dispatch(setLoader());
        try {
            const resetPassResponse = await apiConnector('POST',authLinks.RESET_PASSWORD_API,formdata);
            console.log(resetPassResponse);

            if(resetPassResponse.data.success){
                toast.success(resetPassResponse.data.message);
                setemail(resetPassResponse.data.email);
            }
            else{

                throw new Error("Error Occuredd");
            }

            

        } catch (error) {
            toast.error('Error Occured');
        }
        dispatch(resetLoader());
    }
}

export const signUp = (signupDetails,navigate) => {
    return async(dispatch) => {
        dispatch(setLoader());
        const toastId = toast.loading('Loading..');
        try {
            console.log(signupDetails);
            const userRegistration = await apiConnector('POST',authLinks.SIGNUP_API,signupDetails);
            console.log(userRegistration);

            if(!userRegistration.data.success){
                throw new Error("Error Occurred");
            }
            toast.success('User registered,Please Login');
            navigate('/login');

        } catch (err) {
            console.error(err);
            toast.error('Error In Matching OTP,Try Again');
        }
        toast.dismiss(toastId);
        dispatch(resetLoader());
    }
}

export const loginWithGoogle = (body,navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading('Loading..');
        dispatch(setLoader());
        try {
            const apiDetails = await apiConnector('POST',authLinks.SIGN_IN_WITH_GOOGLE,body);
            const loginData = apiDetails.data;
    
            console.log(loginData);
    
            if(loginData.success){
                dispatch(setToken(loginData.user.token));
                dispatch(setUser(loginData.user));
                console.log(loginData.user);
                localStorage.setItem('token',JSON.stringify(loginData.user.token));
                localStorage.setItem('user',JSON.stringify(loginData.user));
                if(navigate)
                    navigate('/dashboard/my-profile');
                toast.success(loginData.message);
            }
            else{
                toast.error(loginData.message);
            }
        } catch (error) {
            console.log('Some Error Occurred');
            console.error(error);
            toast.error('Error in Logging You In..');
        }
        dispatch(resetLoader());
        toast.dismiss(toastId);
    }
}