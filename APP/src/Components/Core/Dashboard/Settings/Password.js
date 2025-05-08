import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changePassword, chnageProfileDetails } from '../../../../Services/Operations/Profile_Apis';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Password = () => {
    const { user } = useSelector(state => state.Profile);
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfrmPass, setShowCnfrmPass] = useState(false);
    const [disableSublit, setDisableSubmit] = useState(false);
    function showpasshandler() {
        setShowPassword(!showPassword);
    }

    function cnfrmHandler() {
        setShowCnfrmPass(!showCnfrmPass);
    }
    const {
        register, handleSubmit,
        formState: { errors }
    } = useForm();
    // console.log(user);

    const submitHandler = (data) => {
        dispatch(changePassword(data,setDisableSubmit));
    }

    
    return (
        <form className='relative flex flex-col'
            onSubmit={handleSubmit(submitHandler)}
        >
            <div className='flex flex-col gap-x-20 bg-richblack-800
        py-8 px-8 rounded-md border-[1px] border-richblack-700 mt-16
        '>

                <h3 className='text-xl font-extrabold mb-7'>Password</h3>

                <div>
                    <div className='grid grid-cols-2 gap-y-5 gap-x-7'

                    >

                        <div className='relative'>
                            <label htmlFor='currentPass' className='w-full'>

                                <p
                                    className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                                >Current Password</p>

                                <input
                                    type={`${(showPassword)?('text'):('password')}`}
                                    placeholder='Enter Current Password'
                                    id='currentPass'
                                    {...register('oldPassword', { required: true })}
                                    className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 
    p-[12px] border-b-[0.8px] border-b-richblack-200'
                                ></input>
                                <button type='button' onClick={showpasshandler} className='absolute right-3 top-[38px]'>

                                    {
                                        (showPassword) ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :
                                            (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)
                                    }

                                </button>
                                {
                                    errors.oldPassword && (
                                        <span className='text-yellow-5/70 text-xs'>Please Enter Your Current Password</span>
                                    )
                                }

                            </label>
                        </div>

                        <div className='relative'>
                            <label htmlFor='newpass' className='w-full'>

                                <p
                                    className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                                >New Password</p>

                                <input
                                    type={`${(showCnfrmPass)?('text'):('password')}`}
                                    placeholder='Enter New Password'
                                    id='newpass'
                                    {...register('newPassword',{required:true})}
                                    className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 
    p-[12px] border-b-[0.8px] border-b-richblack-200'
                                ></input>
                                <button type='button' onClick={cnfrmHandler} className='absolute right-3 top-[38px]'>

                                    {
                                        (showCnfrmPass) ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :
                                            (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)
                                    }

                                </button>
                                {
                                    errors.newPassword && (
                                        <span className='text-yellow-5/70 text-xs'>Please Enter Your New Password</span>
                                    )
                                }

                            </label>
                        </div>






                    </div>
                </div>

            </div>
            <div className='place-self-end mt-6 flex gap-x-6 font-bold'>
                <Link to={'/dashboard/my-profile'} className='px-4 py-3 rounded-md bg-richblack-700'>
                    Cancel
                </Link>
                <button type='submit'
                    disabled={disableSublit}
                    className={`${(disableSublit) ? ('bg-richblack-700 cursor-not-allowed') :
                        ('bg-yellow-50 text-richblack-900')} py-2 px-4 rounded-md`}>
                    Save
                </button>
            </div>
        </form>
    )
}

export default Password;
