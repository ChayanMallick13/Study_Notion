import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Common/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FaClockRotateLeft } from "react-icons/fa6";
import OTPInput from 'react-otp-input';
import { sendOtp, signUp } from '../Services/Operations/Auth_Api';

function Verify_Email() {
    const { loader } = useSelector(state => state.loader);
    const { signupData } = useSelector(state => state.auth);
    const [resendTime, setresetTime] = useState(0);
    const [isCounting, setIsCounting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    function submitHandler(event) {
        event.preventDefault();
        if (!signupData) {
            console.log('aha wrong');
            return;
        }
        const userDetails = { ...signupData, otp };
        dispatch(signUp(userDetails, navigate));
        setOtp('');
    }
    useEffect(
        () => {
            let intervalId = null;
            if (isCounting) {
                intervalId = setInterval(() => {
                    setresetTime(prev => {
                        if (prev <= 1) {
                            clearInterval(intervalId);
                            setIsCounting(false);
                            return 0;
                        }
                        return prev - 1;
                    })
                }, 1000)
            }
        }, [isCounting]
    )

    if (loader) {
        return <Loader />
    }
    return (
        <div className='text-white w-[375px] mx-auto flex justify-center items-center h-[90vh]'>
            <div className='flex flex-col gap-y-8 md:w-max w-full'>
                <div className='text-4xl font-bold'>Verify Email</div>
                <p className='text-richblack-500'>
                    A verification code has been sent to you. Enter the code below
                </p>

                <form onSubmit={submitHandler}>

                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span className="w-2 md:w-5" />}
                        renderInput={(props) => (
                            <input
                                {...props}
                                // 2. Place the placeholder here, not via inputStyle
                                placeholder="-"
                                style={{
                                    width: 60,
                                    height: 60,
                                    color: "white",
                                    textAlign: 'center',
                                    fontSize: 40,
                                    background: "#161D29",
                                    outlineColor: "yellow",
                                    borderRadius: 11,
                                    borderBottom: "1px solid grey",
                                }}
                            />
                        )}
                    // 3. Remove the placeholder prop from here entirely
                    />

                    <button type='submit' className='bg-yellow-50 text-richblack-900 w-full 
                        mt-5 py-2 rounded-md
                        '>
                        Verify Email
                    </button>

                </form>

                <div className='flex justify-between'>
                    <Link to={'/login'} className='flex gap-x-2 items-center'>

                        <FaArrowLeft />
                        <p>Back To Login</p>
                    </Link>

                    <button onClick={() => {
                        if (!isCounting) {
                            dispatch(sendOtp(navigate, signupData, setIsCounting));
                            setresetTime(30);
                        }
                    }} className='flex gap-x-1 text-blue-300 items-center'>
                        <FaClockRotateLeft />
                        {
                            (resendTime) ? (
                                <div>
                                    Resend in {resendTime}s
                                </div>
                            ) : (
                                <p>Resend It</p>
                            )
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Verify_Email;
