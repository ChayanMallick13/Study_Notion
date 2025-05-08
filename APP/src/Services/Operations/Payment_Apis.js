import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { paymentLinks } from "../apis";
import rzpLogo from '../../assets/Logo/Logo-Full-Dark.png'
import { resetCart } from "../../reducer/Slices/CartSlice";
import { setPaymentLoading } from "../../reducer/Slices/CourseSlice";
import { setUser } from "../../reducer/Slices/ProfileSlice";
import { updateLatestUserDetails } from "./Profile_Apis";






function loadScript(script_source){
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src=script_source;
        script.onload = (
            () => {
                resolve(true);
            }
        );
        script.onerror = (
            () => {
                resolve(false);
            }
        )
        document.body.appendChild(script);
    })
}

const verifyPaymentHandler = async(purchaseResponse,courses,navigate,dispatch) => {
    const tid = toast.loading('Verifying Payment ... ');
    dispatch(setPaymentLoading(true));
    try {

        const body = {
            razorpay_order_id:purchaseResponse.razorpay_order_id,
            razorpay_payment_id:purchaseResponse.razorpay_payment_id,
            razorpay_signature:purchaseResponse.razorpay_signature,
            courses,
        }

        const responseData = await apiConnector('POST',paymentLinks.VERIFY_ORDER_API,body).then(
            () => {
                toast.success('Purchase Successfull...');
                dispatch(resetCart());
                navigate('/dashboard/enrolled-courses');
            }
        ).catch(
            (err) => {
                toast.error('Payment Unsuccesfull Retry Later ... ');
            }
        )

        dispatch(updateLatestUserDetails());



    } catch (err) {
        console.log('Some Error Occurred in Verifying Payment');
    }
    dispatch(setPaymentLoading(false));
    toast.dismiss(tid);
}

const send_purchaseComplete_mail = async(userName,amount,orderId) => {
    try{
        const body = {
            orderId,
            amount,
            userName,
        }

        await apiConnector('POST',paymentLinks.SEND_PURCHASE_COMPLETE_MAIL,body)
        .then(
            () => {
                console.log('mail Send Successfully');
            }
        ).catch(
            (err) => {
                console.log('Some Error Occurred in Sendng Mail');
            }
        );

        console.log('MAil Sending ....  ');

    }catch(err){
        console.error('damn Error ');
        console.error(err.message);
    }
}

export const buyCourse = async(body,navigate,dispatch) => {
    const toastId = toast.loading('Loading Payment Gateway');
    try {

        const res = await loadScript(process.env.REACT_APP_RAZORPAY_SCRIPT);
        if(!res){
            toast.error('Some Error Occurred in Loading Payment GateWay');
        }

        //create order
        const orderCreateApiRes = await apiConnector('POST',paymentLinks.CREATE_ORDER_API,body);
        const OrderCreateResponse = orderCreateApiRes.data.orderCreationResponse;

        
        const userName = `${orderCreateApiRes.data.userDetails.firstName} ${orderCreateApiRes.data.userDetails.lastName}`;

        //on successfull payment
        const options = {
            key:process.env.REACT_APP_RAZORPAY_KEY,
            currency:OrderCreateResponse.currency,
            amount:`${OrderCreateResponse.amount}`,
            order_id:OrderCreateResponse.id,
            name:"Study Notion",
            description:"Thank You For Purchasing The course",
            image:rzpLogo,
            prefill:{
                name:userName,
            },
            handler:function(response){

                
                //send a purchase mail to user
                send_purchaseComplete_mail(userName,`${OrderCreateResponse.amount}`,OrderCreateResponse.id);

                //verify payment 
                verifyPaymentHandler(response,body.courses,navigate,dispatch);

                

            },
        }

        const rzp = new window.Razorpay(options);
        rzp.open();

    } catch (err) {
        console.error("Some Error Occurred In Buy Course ");
        console.error(err.message);
        toast.error('Some Error Occurred Try Agaian Later');
    }
    toast.dismiss(toastId);
}








//steps in buy course 

// 1. load the script of razorpay 

// 2. cretae option object for openeing razor pay modal