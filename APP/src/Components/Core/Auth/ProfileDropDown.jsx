import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useOutsideClickHandler from '../../../Hooks/useOutsideClickHandler';
import { Link, useNavigate } from 'react-router-dom';
import { signout } from '../../../Services/Operations/Auth_Api';
import { MdDashboard } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import { SiGnusocial } from 'react-icons/si';

function ProfileDropDown() {

  const {user} = useSelector(state => state.Profile);
  const componentRef = useRef(null);
  const [dropdown,setdropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useOutsideClickHandler(componentRef,clickHandler);
  function clickHandler(){
    // console.log('hh',componentRef.current);
    if(!componentRef.current)
      setdropdown(true);
    else
      setdropdown(false);
  }

  if(!user){
    return (<div>Hello</div>);
  }


  return (
    <div className='relative z-10'
    onClick={(e) => {
      setdropdown(true);
      e.stopPropagation()
    }}
    >

      {/* profile circle  */}
      <div className='rounded-full cursor-pointer'
      
      >
        <img alt='user' src={user.image} className='rounded-full h-[35px] w-[35px] aspect-square object-cover'/>

      </div>

      {(dropdown)&&(
        <div ref={componentRef}
        className='absolute -left-[96px] bg-richblack-800 pb-4 px-3 flex flex-col space-y-5 top-12
        border-[0.1rem] border-richblack-700
        '
        >
          <div className='bg-richblack-800 absolute -mt-2 -top-1 right-1 w-[20px] h-[20px] rotate-45
          border-t-[0.1rem] border-t-richblack-700 border-l-[0.1rem] border-l-richblack-700
          '/>
          <Link to={'/dashboard/my-profile'}>
            <div className='flex items-center gap-x-1 '>
              <MdDashboard className='text-xl'/>
              <span>DashBoard</span>
            </div>
          </Link>
          <div className='cursor-pointer'
          onClick={(e) => {
            setdropdown(false);
            dispatch(signout(navigate));
          }}
          >
            <div className='flex items-center gap-x-1'>
              <GoSignOut className='text-xl'/>
              <span>SignOut</span>
            </div>
          </div>
        </div>
      )

      }
      
    </div>
  )
}

export default ProfileDropDown;
