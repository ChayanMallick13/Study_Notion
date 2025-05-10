import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../Components/Common/IconBtn';
import { FaEdit } from "react-icons/fa";

function MyProfile() {
    const {user} = useSelector(state => state.Profile);
    const navigate = useNavigate();
    console.log(user);
  return (
    <div className='text-white flex flex-col gap-y-8'>
        <h2 className='text-3xl font-extrabold'>My Profile</h2>

        {/* sec 1  */}
        <div className='flex justify-between bg-richblack-800 items-center
        py-8 px-8 rounded-md border-[1px] border-richblack-700
        '>

            <div className='flex flex-col md:flex-row gap-y-3 items-center gap-x-4'>
                <img src={user.image} alt='userimage' height={78} width={78} 
                    className='rounded-full aspect-square object-cover'
                    referrerPolicy="no-referrer"
                />
                <div className='flex flex-col gap-y-2'>
                    <p
                    className='text-xl font-extrabold'
                    >{user.firstName + ' ' + user.lastName}</p>
                    <p
                    className='text-richblack-300 text-sm'
                    >{user.email}</p>
                </div>
            </div>

            <div>
            <IconBtn
            customClasses={'bg-yellow-50 text-richblack-900 py-2 px-4 rounded-md'}
            onClick={() => {
                navigate('/dashboard/settings')
            }}
            >
                <div className='flex items-center gap-x-2'>
                    <span>Edit</span>
                    <FaEdit/>
                </div>
            </IconBtn>
            </div>

        </div>

        {/* sec 2 */}
        <div className='flex justify-between bg-richblack-800 
        py-10 px-8 rounded-md border-[1px] border-richblack-700
        '>
            <div className='flex flex-col gap-y-12'>
                <p className='text-xl font-extrabold'>About</p>
                <p
                className='text-richblack-300 text-sm'
                >{(user?.additionalDetails?.about)??(
                    'Write Something About Yourself'
                )}</p>
            </div>

            <div>
            <IconBtn
            customClasses={'bg-yellow-50 text-richblack-900 py-2 px-4 rounded-md'}
            onClick={() => {
                navigate('/dashboard/settings')
            }}
            >
                <div className='flex items-center gap-x-2'>
                    <span>Edit</span>
                    <FaEdit/>
                </div>
            </IconBtn>
            </div>
        </div>

        {/* sec 3 */}
        <div className='flex flex-col justify-between bg-richblack-800
        py-10 px-8 rounded-md border-[1px] border-richblack-700
        '>
            <div className='flex justify-between w-full'>

                <h3 className='text-xl font-extrabold'>Personal Details</h3>
                <IconBtn
            customClasses={'bg-yellow-50 text-richblack-900 py-2 px-4 rounded-md'}
            onClick={() => {
                navigate('/dashboard/settings')
            }}
            >
                <div className='flex items-center gap-x-2'>
                    <span>Edit</span>
                    <FaEdit/>
                </div>
            </IconBtn>

            </div>

            <div className='grid grid-cols-2 md:gap-7 gap-y-5 gap-x-6 pt-8'>
                <div className='flex flex-col gap-y-1'>
                    <p
                    className='text-richblack-400 text-sm'
                    >First Name</p>
                    <p
                    className='text-base font-bold'
                    >{user.firstName}</p>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <p
                    className='text-richblack-400 text-sm'
                    >Last Name</p>
                    <p
                    className='text-base font-bold'
                    >{user.lastName}</p>
                </div>
                <div className='flex flex-col gap-y-1 md:col-span-1 col-span-2'>
                    <p
                    className='text-richblack-400 text-sm'
                    >Email</p>
                    <p
                    className='text-base font-bold'
                    >{user.email}</p>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <p
                    className='text-richblack-400 text-sm'
                    >Phone Number</p>
                    <p
                    className='text-base font-bold'
                    >{user.additionalDetails.contactNumber??('Add Contact Number')}</p>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <p
                    className='text-richblack-400 text-sm'
                    >Gender</p>
                    <p
                    className='text-base font-bold'
                    >{user.additionalDetails.gender??('Add Gender')}</p>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <p
                    className='text-richblack-400 text-sm'
                    >Date Of Birth</p>
                    <p
                    className='text-base font-bold'
                    >{user.additionalDetails.dateOfBirth??('Add Date Of Birth')}</p>
                </div>
                
            </div>

        </div>
        
    </div>
  )
}

export default MyProfile;
