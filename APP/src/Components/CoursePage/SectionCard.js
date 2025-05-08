import React, { useEffect, useState } from 'react'
import { BsCameraVideo } from 'react-icons/bs';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

const SectionCard = ({SectionName,subSections,triggerCollapse}) => {


    const [isCollapsed,setisCollapsed] = useState(true);

    useEffect(
        () => {
            setisCollapsed(true);
        },[triggerCollapse]
    )

  return (
    <div className='border-[1px] border-richblack-400/50'>

        <button 
        onClick={() => {setisCollapsed(prev => !prev)}}
        className='flex justify-between bg-richblack-800 w-full px-6 py-6'>
            <div
            className='flex gap-x-3 items-center'
            >
                <span>{(isCollapsed)?(<FaChevronDown/>):(<FaChevronUp/>)}</span>
                <h3>{SectionName}</h3>
            </div>

            <div className='text-yellow-100'>
                {subSections?.length} Lecture(s)
            </div>
        </button>

        <div className={`${(isCollapsed)?('h-[0px] py-0 overflow-hidden'):('h-auto gap-y-5 py-6')} transition-all duration-500 w-full px-8
        flex flex-col
        `}>

            {
                subSections?.map(
                    (ele,key) => {
                        return <div className={`flex gap-x-2 items-center ${(isCollapsed)?('opacity-0'):('opacity-100')} transition-all duration-500`}>
                            <span><BsCameraVideo /></span>
                            <span>{ele?.title}</span>
                        </div>
                    }
                )
            }

        </div>

    </div>
  )
}

export default SectionCard;
