import React, { act } from 'react';
import { FaNetworkWired } from "react-icons/fa";

function Card({ heading, description, level, lessionNumber, active }) {
    return (
        <div className={`${(active) ? ('bg-white text-black') : ('bg-richblack-800')} sm:w-[385px] w-[360px]
    py-8 flex flex-col justify-between space-y-28 relative z-10 
    `}>
            <div className='px-5'>
                <h2 className='text-xl font-bold mb-4'>{heading}</h2>
                <p className='text-richblack-200'>{description}</p>
            </div>
            <div className={`flex justify-between border-dotted border-t-2
            ${(active)?('text-blue-400'):('')} text-lg pt-4 px-5
            `}>
                <div className='flex items-center gap-x-1'>
                    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path></svg>
                    <p>{level}</p>
                </div>
                <div className='flex items-center gap-x-1'>
                    <FaNetworkWired />
                    <p> {lessionNumber} lession </p>
                </div>
            </div>
            {
                active&&
                <div className='absolute h-3 w-[90%] bg-yellow-100 -bottom-[8px] -right-3 -z-10'/>
            }
            {
                active&&
                <div className='absolute w-3 h-[90%] bg-yellow-100 -right-3 -top-[82px]'/>
            }
        </div>
    )
}

export default Card;
