import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { calculateDurationofSection, isLectureCompletd } from '../../Services/Operations/Course_Utils';

function CollapsableSection({SectionName,_id,subSections}) {
    const [isCollapsed,setIsCollapsed] = useState(true);
    const {sectionId,subSectionId} = useParams();
    const {user} = useSelector(state => state.Profile);
    const location = useLocation();
    const naivagate = useNavigate();
    const {courseId} = useParams();


    function moveToNewVideoHandler(subSection){
        const url = location.pathname;
        //console.log("tttt",url);
        const newUrl = url.replace(sectionId,_id).replace(subSectionId,subSection);
        //console.log('new',newUrl);
        naivagate(newUrl);
    }

    useEffect(
        () => {
            if(sectionId===_id){
                setIsCollapsed(false);
            }
        },[sectionId,subSectionId]
    )
  return (
    <div className='w-full border-[1px] border-richblack-500'>
        <button className='w-full flex items-center justify-between bg-richblack-600 px-4 py-4
        border-[1px] border-richblack-500
        '
        onClick={() => {
            setIsCollapsed(prev => !prev);
        }}
        >
            <h3>
                {SectionName}
            </h3>

            <div className='flex gap-x-3 items-center'>
                <span>
                    {
                        calculateDurationofSection(subSections)
                    }
                </span>
                <span>
                    {
                        (isCollapsed)?(<FaAngleDown/>):(<FaAngleUp/>)
                    }
                </span>
            </div>
        </button>

        <div>
            {
                subSections.map(
                    (ele,ind) => {
                        //console.log('kk',ele);
                        return <button key={ind} className={`flex gap-x-2 items-center px-5 
                        ${(isCollapsed)?('py-0 h-0 overflow-hidden'):('py-4 h-auto')} transition-all duration-300
                        ${(subSectionId===ele._id)?('text-blue-200'):(`
                        ${(isLectureCompletd(ele._id))?('line-through text-richblack-400'):('')}
                        `)}
                        `}
                        onClick={() => {
                            moveToNewVideoHandler(ele._id);
                        }}
                        >
                            <div className='flex items-center justify-center w-[30px]'>
                                {
                                    (subSectionId===ele._id)&&(
                                        <FaPlay/>
                                    )
                                }
                                {
                                    ((subSectionId!==ele._id))&&(
                                        <input
                                            type='checkbox'
                                            checked={isLectureCompletd(user,ele._id,courseId)}
                                            className='h-[18px] w-[18px]'
                                            disabled={true}
                                        />
                                    )
                                }
                            </div>
                            <div>
                                {
                                    ele?.title
                                }
                            </div>
                        </button>
                    }
                )
            }
        </div>
    </div>
  )
}

export default CollapsableSection;
