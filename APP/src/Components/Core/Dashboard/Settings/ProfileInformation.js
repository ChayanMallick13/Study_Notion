import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { chnageProfileDetails } from '../../../../Services/Operations/Profile_Apis';

function ProfileInformation() {
    const {user} = useSelector(state => state.Profile);
    const dispatch = useDispatch();
    const getTodaysDate = (pastTime=0) => {
        const today = new Date();
        if(pastTime){
          today.setFullYear(today.getFullYear()-100);
        }
        const year = today.getFullYear();
        const month = String(today.getMonth()+1).padStart(2,'0');
        const date = String(today.getDate()).padStart(2,'0');
        const todaysDate = `${year}-${month}-${date}`;
        return todaysDate;
      }
    const {
        register, handleSubmit, 
        formState: { errors }
    } = useForm();
    // console.log(user);

    const submitHandler = (data) => {
        dispatch(chnageProfileDetails(data,setDisableSubmit));
    }

    const [disableSublit,setDisableSubmit] = useState(false);

    return (
        <form className='relative flex flex-col'
        onSubmit={handleSubmit(submitHandler)}
        >
            <div className='flex flex-col gap-x-20 bg-richblack-800
        py-8 px-8 rounded-md border-[1px] border-richblack-700 mt-16
        '>

                <h3 className='text-2xl font-extrabold mb-7'>Profile Information</h3>

                <div>
                    <div className='grid grid-cols-2 gap-y-5 gap-x-7'
                    
                    >

                        <div>
                            <label htmlFor='firstName' className='w-full'>

                                <p
                                    className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                                >First Name</p>

                                <input
                                    type='text'
                                    placeholder='Enter First Name'
                                    id='firstName'
                                    {...register('firstName', { required: true })}
                                    className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 
    p-[12px] border-b-[0.8px] border-b-richblack-200'
                                    defaultValue={(user?.firstName)??''}
                                ></input>
                                {
                                    errors.firstName && (
                                        <span className='text-yellow-5/70 text-xs'>Please Enter Your FirstName</span>
                                    )
                                }

                            </label>
                        </div>

                        <div>
                            <label htmlFor='lastName' className='w-full'>

                                <p
                                    className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                                >Last Name</p>

                                <input
                                    type='text'
                                    placeholder='Enter Last Name'
                                    id='lastName'
                                    {...register('lastName')}
                                    className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 
    p-[12px] border-b-[0.8px] border-b-richblack-200'
                                    defaultValue={(user?.lastName)??''}
                                ></input>

                            </label>
                        </div>

                        <div>
                            <label htmlFor='dateOfBirth' className='w-full'>

                                <p
                                    className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                                >Date of Birth</p>

                                <input
                                    type='date'
                                    id='dateOfBirth'
                                    {...register('dateOfBirth', { required: true })}
                                    max={getTodaysDate()}
                                    min={getTodaysDate(100)}
                                    className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 
    p-[12px] border-b-[0.8px] border-b-richblack-200'
                                    defaultValue={(user?.additionalDetails?.dateOfBirth)??''}
                                >

                                </input>
                                {
                                    errors.dateOfBirth && (
                                        <span className='text-yellow-5/70 text-xs'>Please Enter Your Date Of Birth</span>
                                    )
                                }

                            </label>
                        </div>


                        <div>
                            <label htmlFor='gender' className='w-full'>

                                <p
                                    className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                                >Gender</p>

                                <select
                                    id='gender'
                                    {...register('gender', { required: true })}
                                    className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 
                                p-[12px] border-b-[0.8px] border-b-richblack-200'
                                defaultValue={(user?.additionalDetails?.gender)??'None'}
                                >

                                    <option value={'Male'}>
                                        Male
                                    </option>

                                    <option value={'Female'}>
                                        Female
                                    </option>

                                    <option value={'Other'}>
                                        Other
                                    </option>

                                    <option value={'None'}>
                                        None
                                    </option>
                                </select>
                                {
                                    errors.gender && (
                                        <span className='text-yellow-5/70 text-xs'>Please Enter Gender</span>
                                    )
                                }

                            </label>
                        </div>


                        <div>
                            <label htmlFor='contactNumber' className='w-full'>

                                <p
                                    className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                                >Contact Number</p>

                                <input
                                    type='number'
                                    id='contactNumber'
                                    placeholder='Enter Contact Number'
                                    {...register('contactNumber', {
                                        required: { value: true, message: 'Please Enter Your Contat Number' },
                                        minLength: { value: 12, message: 'Invalid Phone Number' },
                                        maxLength: { value: 14, message: 'Invalid Phone Number' }
                                    })}
                                    defaultValue={(user?.additionalDetails?.contactNumber)??''}
                                    className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 
    p-[12px] border-b-[0.8px] border-b-richblack-200'
                                >

                                </input>
                                {
                                    errors.contactNumber && (
                                        <span className='text-yellow-5/70 text-xs'>{errors.contactNumber.message}</span>
                                    )
                                }

                            </label>
                        </div>

                        <div>
                            <label htmlFor='about' className='w-full'>

                                <p
                                    className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                                >About</p>

                                <input
                                    type='text'
                                    placeholder='Enter Bio Details'
                                    id='about'
                                    {...register('about', { required: true })}
                                    className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 
    p-[12px] border-b-[0.8px] border-b-richblack-200'
                                    defaultValue={(user?.additionalDetails?.about)??''}
                                ></input>
                                {
                                    errors.about && (
                                        <span className='text-yellow-5/70 text-xs'>Please Enter Your Bio Details</span>
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
                className={`${(disableSublit)?('bg-richblack-700 cursor-not-allowed'):
                ('bg-yellow-50 text-richblack-900')} py-2 px-4 rounded-md`}>
                    Save
                </button>
            </div>
        </form>
    )
}

export default ProfileInformation;
