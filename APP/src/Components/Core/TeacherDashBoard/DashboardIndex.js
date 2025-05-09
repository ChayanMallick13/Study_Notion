import React, { useEffect, useState } from 'react'
import Loader from '../../Common/Loader';
import { fetchUserDetails } from '../../../Services/Operations/Profile_Apis';
import InstructorStatsSection from './InstructorStatsSection';
import InstructorCardSection from './InstructorCardSection';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardIndex = () => {
    const [userStats,setUserStats] = useState(null);
    const navigate = useNavigate();
    const addcourseLink = '/dashboard/add-course';
    const {user} = useSelector(state => state.Profile);


    useEffect(
        () => {
            fetchUserDetails(setUserStats);
        },[]
    )

    console.log(userStats);
    
    if(!userStats){
        return <Loader/>
    }

  return (
    <div className='w-full h-full'>
        <div className='w-11/12 text-white mx-auto'>
            
            <div>
                <p className='text-3xl font-semibold'>Hi {user.firstName} 👋</p>
                <p className='font-semibold text-richblack-300'>Lets Start Something New</p>
            </div>

            {(userStats.courses.length)?(
                <>
                    <InstructorStatsSection
                        {...userStats}
                    />

                    <InstructorCardSection courses={userStats.courses}/>
                </>):(
                    <div className='h-[70vh] flex flex-col justify-center items-center text-3xl font-extrabold'>
                        <span>You Have Not Made Any Course Till Now</span>
                        <button className='text-lg mt-4 bg-yellow-100 p-3 text-richblack-900 rounded-xl'
                        onClick={()=>{navigate(addcourseLink)}}
                        >Make You First Course</button>
                    </div>
                )
            }

        </div>
    </div>
  )
}

export default DashboardIndex;
