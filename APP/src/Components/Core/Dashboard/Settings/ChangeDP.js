import React, { useEffect, useState } from 'react';
import IconBtn from '../../../Common/IconBtn';
import { FaUpload } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { editProfilePic } from '../../../../Services/Operations/Profile_Apis';

const ChangeDP = () => {
    const {user} = useSelector(state => state.Profile);
    const [btndisabled,setbtndisabled] = useState(false);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState:{errors,isSubmitSuccessful}
    } = useForm();
    const localDp = watch('profilePicture');
    const changeProfileHandler = (formdata) => {
        try {
            const file = formdata.profilePicture[0];
            // setlocalDp(file);
            // console.log(file);
            const data = new FormData();
            data.append('profilePicture',file);
            dispatch(editProfilePic(data,setbtndisabled,user));
        } catch (err) {
            
        }
    }
  return (
    <div className='flex gap-x-20 bg-richblack-800 items-center
    py-8 px-8 rounded-md border-[1px] border-richblack-700 mt-16 md:flex-row flex-col
    '>
      
        <div className='w-[100px] h-[100px] object-cover aspect-square rounded-full mb-3'>
            <img
                alt='user Img'
                src={
                    (localDp&&localDp[0]?(
                        URL.createObjectURL(localDp[0])
                    ):(
                        user?.image
                    ))
                }
                className='w-[100px] h-[100px] object-cover aspect-square rounded-full'
            />
        </div>

        <div className='flex flex-col gap-y-6'>
            <h3 className='text-2xl font-bold'>Change Profile Picture</h3>
            <div>
                <div>
                    <form onSubmit={handleSubmit(changeProfileHandler)}
                    className='flex gap-x-6'
                    >
                        <div className='relative bg-richblack-700 w-[100px] text-center flex items-center justify-center
                        rounded-lg cursor-pointer
                        '>
                         <label htmlFor='profilePic' className='cursor-pointer'
                        >
                            <input
                                type='file'
                                id='profilePic'
                                accept='.jpg,.jpeg,.png'
                                {...register('profilePicture',{required:{value:true,message:'Choose a Valid Image'}})}
                                className='absolute opacity-0 top-0 left-0 right-0 -bottom-3
                                cursor-pointer appearance-none z-0
                                '
                            />
                            <div className='font-bold relative w-[100px] h-[43px] -left-1  
                            cursor-pointer bg-richblack-700 flex justify-center items-center rounded-lg'>
                                <span>Select</span>
                            </div>
                        </label>
                        </div>

                        <div>
                        <label htmlFor='btnsubmit'>
                            <button type='submit' id='btnsubmit'
                            disabled={btndisabled}>
                                <div className={`flex py-2 px-4 
                                ${(!btndisabled)?('bg-yellow-100 text-richblack-900'):
                                ('bg-richblack-700 cursor-not-allowed')} rounded-lg
                                items-center gap-x-2 font-extrabold
                                `}>
                                    <span>Upload</span>
                                    <FaUpload/>
                                </div>
                            </button>
                        </label>
                        </div>
                    </form>
                    {
                        errors.profilePicture&&<span className='text-xs text-yellow-50'>{errors.profilePicture.message}</span>
                    }
                </div>
            </div>
        </div>

    </div>
  )
}

export default ChangeDP;
