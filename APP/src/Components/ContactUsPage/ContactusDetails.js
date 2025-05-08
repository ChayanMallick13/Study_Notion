import React from 'react';
import { contactdetails } from '../../data/contactusData';

function ContactusDetails() {
  return (
    <div className='bg-richblack-800 lg:max-h-[450px] lg:w-[32%] w-full gap-y-14 flex-col justify-between flex rounded-xl px-8 py-9'>
        {
            contactdetails.map((ele,ind)=>{
                return <div className='flex flex-col text-richblack-200 font-semibold text-sm lg:max-w-[80%] max-w-full' key={ind}>
                    <div className='flex gap-x-3 items-center text-xl font-extrabold'>
                        <p className='text-richblack-200'>{ele.icon}</p>
                        <p className='text-white'>{ele.mode}</p>
                    </div>
                    <p>{ele.instruction}</p>
                    <p>{ele.details}</p>
                </div>
            })
        }
    </div>
  )
}

export default ContactusDetails;
