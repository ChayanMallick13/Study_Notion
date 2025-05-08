import React from 'react'

const SkillSectionCode = ({ image, heading, desc,last }) => {
    return (
        <div className='flex gap-8 mt-3'>
            <div className='flex flex-col justify-center items-center'>
                <div className='rounded-full w-[50px] h-[50px] bg-white flex justify-center items-center'>
                    <img src={image} alt='logo' />
                </div>

                {
                    (!last) &&
                    <div className='mt-3 h-[59px] w-[2px] bg-richblack-100/40'/>
                }
            </div>

            <div>
                <p className='text-xl font-bold'>{heading}</p>
                <p className='text-lg'>{desc}</p>
            </div>
        </div>
    )
}

export default SkillSectionCode;
