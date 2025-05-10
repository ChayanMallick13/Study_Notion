import React from 'react'
import SignUpForm from '../SignupPage/SignUpForm';
import LoginForm from './LoginForm';
import { FcGoogle } from "react-icons/fc";
import frameimg from '../../../assets/Images/frame.png';
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { loginWithGoogle } from '../../../Services/Operations/Auth_Api';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";


function Template({ title, desc1, desc2, image, formtype }) {
    const [formdata, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: 'Student',
        countryCode: '+91',
        phNum: '',
    });
    const onSuccessHandler = (res) => {
        const body = {
            ...res,
            accountType:formdata.accountType,
        }
        console.log(body);
        dispatch(loginWithGoogle(body,navigate));
    }
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className='flex md:flex-row flex-col-reverse w-11/12 max-w-[1160px] mt-14 mx-auto py-12 gap-y-0 justify-between items-center'>

            <div className='max-w-[450px] w-11/12'>
                <h1
                    className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'
                >{title}</h1>

                <p
                    className='text-[1.125rem] leading-[1.625rem] mt-4'
                >
                    <span className='text-richblack-100'>{desc1}</span> <br />
                    <span className='text-blue-100 italic'>{desc2}</span>
                </p>

                {
                    (formtype === 'signup') ?
                        (<SignUpForm
                            formdata={formdata}
                            setFormData={setFormData}
                        />) :
                        (<LoginForm />)
                }

                <div className='flex w-full items-center my-4 gap-x-2'>
                    <div className='h-[1px] bg-richblack-700 w-full'></div>
                    <p className='text-richblack-700 font-medium leading-[1.375rem]'>OR</p>
                    <div className='h-[1px] bg-richblack-700 w-full'></div>
                </div>

                <GoogleLogin
                    onSuccess={(res) => {
                        onSuccessHandler(res);
                    }}
                    onError={(err) => {
                        toast.error('Request Refused From Google');
                    }}
                />

            </div>


            <div className='relative w-11/12 max-w-[450px] min-h-[26rem]'>

                <img src={image}
                    alt='students'
                    width={558}
                    height={504}
                    loading='lazy'
                    className='absolute z-10 -top-4 right-4'
                />

                <img src={frameimg}
                    alt='frameimg'
                    width={558}
                    height={504}
                    loading='lazy'
                    className='absolute'
                />

            </div>



        </div>
    )
}

export default Template;
