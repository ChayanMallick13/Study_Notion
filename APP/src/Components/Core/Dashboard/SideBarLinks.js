import React from 'react';
import { LuPen } from 'react-icons/lu';
import * as Icons from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

function SideBarLinks({id,name,path,icon,type}) {

    const Icon = Icons[icon];
    const location = useLocation();
    const dispatch = useDispatch();
    const matchRoute = (route) => {
        return matchPath({path:route},location.pathname);
    }
    const {editCourse} = useSelector(state => state.course);
  return (
    <NavLink
    to={path}
    className={`${matchRoute(path)?('bg-yellow-800 text-yellow-100'):('bg-opacity-0')}
    relative px-8 py-2 text-sm font-medium transition-all duration-200
    `}
    //onClick ????
    >

        <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 transition-all duration-200
        ${(matchRoute(path))?('opacity-100'):('opacity-0')}
        `}></span>

        <div className='flex items-center gap-x-2'>

            {
              (editCourse&&name==='Add Course')?(
                <div className='flex items-center gap-x-2'>
                <LuPen />
                <span>Edit Course</span>
                </div>
              ):(
                <div className='flex items-center gap-x-2'>
                  
                  <Icon className='text-lg'/>
                <span>{name}</span>
                </div>
              )
            }


        </div>

    </NavLink>
  )
}

export default SideBarLinks;
