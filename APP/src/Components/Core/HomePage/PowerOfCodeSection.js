import React, { useState } from 'react';
import {HomePageExplore} from '../../../data/homepage-explore';
import Card from './Card';

const PowerOfCodeSection = () => {
  const [indexNo,setIndexNo] = useState(0);
  const [activeblog,setActive] = useState(0);
  return (
    <div>

      {/* tabsection */}
      <div className='hidden gap-x-10 mt-5 bg-richblack-800 px-12 py-2 rounded-full w-max mx-auto relative -bottom-[120px]
      lg:flex
      '>

        {
          HomePageExplore.map((ele,index) => {
            return (
              <div
              onClick={() => {
                setIndexNo(ele.index);
              }}
              className={`${(ele.index===indexNo)?('bg-black'):('')}
              px-7 py-2 rounded-full select-none cursor-pointer
              `}
              key={index}
              >
                {ele.tag}
              </div>
            )
          })
        }

      </div>

      {/* cardSection */}
      <div className='flex gap-x-12 mt-8 relative -bottom-[150px] flex-wrap gap-y-5 justify-center'>
      {
        HomePageExplore[indexNo].courses.map((ele,index) => {
          return (
            <div
            onClick={() => {
                setActive(ele.index);
              }}
              key={index}
            >
              <Card {...ele} active={ele.index===activeblog} />
            </div>
            
          )
        })
      }
      </div>
      
    </div>
  )
}

export default PowerOfCodeSection;
