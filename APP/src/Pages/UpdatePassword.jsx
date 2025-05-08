import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Components/Common/Loader';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { updatePassword } from '../Services/Operations/Auth_Api';

function UpdatePassword() {
    const { loader } = useSelector(state => state.loader);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [email,setemail] = useState(null);
    const [formdata,setFormData] = useState({
        newPassword:'',
        confirmNewPassword:'',
        token:'',
    });
    const [showCnfrmPass,setShowCnfrmPass] = useState(false);
    const [showpassword,setshowpassword] = useState(false);
    const changeHandler = (event) => {
        const {name,value} = event.target;
        setFormData(prev => {
            return {...prev,[name]:value};
        });
    }
    useEffect(
        () => {
            const token = location.pathname.split('/').at(-1);
            setFormData(prev => {
                return {...prev,token};
            });
        },[]
    )
    function submitHandler(event) {
        event.preventDefault();
        dispatch(updatePassword(formdata,navigate,setemail));
    }
    if (loader) {
        return <Loader />
    }
    if(email){
        return (<div className='h-[90vh] text-white flex justify-center items-center'>
            <div className='w-[375px] flex flex-col gap-y-6'>
                <h2 className='text-3xl font-bold'>Reset Complete</h2>
                <p className='text-richblack-500'>
                All done! We have sent an email to {`${email.split('@').at(0).charAt(0)}${'*'.repeat(email.split('@').at(0).length-2)}${email.split('@').at(0).at(-1)}@${email.split('@').at(-1)}`} to confirm
                </p>
                <button
                className='bg-yellow-50 text-richblack-900 w-full 
                        mt-5 py-2 rounded-md
                        '
                onClick={(e) => {
                    navigate('/login');
                }}
                >
                    Return To Login
                </button>
            </div>

        </div>)
    }
    return (
        <div className='max-w-[375px] mx-auto mt-[25vh] flex flex-col space-y-8 text-white'>
            <h2 className='text-3xl font-bold'>Choose a New Password</h2>

            <p className='text-richblack-500'>
                Almost done. Enter your new password and youre all set.
            </p>

            <form onSubmit={submitHandler} className='flex flex-col gap-y-5'>
                <label className='w-full relative'>

                    <p
                        className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                    >New Password<sup className='text-pink-200'>*</sup></p>

                    <input
                        type={(showpassword) ? ('text') : ('password')}
                        placeholder='Enter New Password'
                        required
                        name='newPassword'
                        onChange={changeHandler}
                        value={formdata.newPassword}
                        className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
                    ></input>

                    <button type='button' onClick={(event) => {
                        setshowpassword(prev => !prev);
                    }} className='absolute right-3 top-[38px]'>

                        {
                            (showpassword) ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)
                        }

                    </button>

                </label>

                <label className='w-full relative'>

                    <p
                        className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                    >Confirm Password<sup className='text-pink-200'>*</sup></p>

                    <input
                        type={(showCnfrmPass) ? ('text') : ('password')}
                        placeholder='Confirm Password'
                        required
                        name='confirmNewPassword'
                        onChange={changeHandler}
                        value={formdata.confirmNewPassword}
                        className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
                    ></input>

                    <button type='button' onClick={(e) => {
                        setShowCnfrmPass(prev => !prev);
                    }} className='absolute right-3 top-[38px]'>

                        {
                            (showCnfrmPass) ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) : (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)
                        }

                    </button>

                </label>

                <button type='submit'
                className='bg-yellow-50 text-richblack-900 w-full 
                        mt-5 py-2 rounded-md
                        '
                >
                    Reset Password
                </button>
            </form>

            <Link to={'/login'} className='flex gap-x-2 items-center'>

                    <FaArrowLeft />
                    <p>Back To Login</p>
            </Link>

        </div>
    )
}

export default UpdatePassword;
