import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Common/Loader';
import CTAButton from '../Components/Core/HomePage/CTAButton';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import { getResetPasswordToken } from '../Services/Operations/Auth_Api';

const ForgotPassword = () => {
    const { loader } = useSelector(state => state.loader);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const handleOnSubmit = (event) => {
        console.log('hello');
        event.preventDefault();
        dispatch(getResetPasswordToken(email,setEmailSent));
    }
    if (loader) {
        return <Loader />
    }
    return (
        <div className='w-full h-[90vh] flex justify-center items-center text-white'>
            <div className='max-w-[375px] flex flex-col space-y-8'>
                <div className='text-3xl font-bold'>
                    {
                        (emailSent) ? ('Check Your Email') : ('Reset Your Password')
                    }
                </div>
                <div className='text-richblack-500'>
                    {
                        (emailSent) ? (`We have sent the reset email to
your email ${email}`) : ('Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery')
                    }
                </div>

                {/* form  */}
                {
                    <form
                    onSubmit={handleOnSubmit}
                    >
                        {!emailSent &&<label className='w-full'>

                            <p
                                className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                            >Email Address<sup className='text-pink-200'>*</sup></p>

                            <input
                                type='email'
                                placeholder='Enter Email Address'
                                required
                                name='email'
                                onChange={(event) => { setEmail(event.target.value) }}
                                value={email}
                                className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
                            ></input>

                        </label>}
                        <button className='bg-yellow-50 text-richblack-900 w-full 
                        mt-5 py-2 rounded-md
                        '
                        type='submit'
                        >
                            {
                                (emailSent) ? ('Resend Email') : ('Reset Password')
                            }
                        </button>
                    </form>
                }


                <Link to={'/login'} className='flex gap-x-2 items-center'>

                    <FaArrowLeft />
                    <p>Back To Login</p>
                </Link>
            </div>
        </div>
    )
}

export default ForgotPassword;
