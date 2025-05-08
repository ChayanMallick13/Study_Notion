import React, { useState } from 'react';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { logIn} from '../../../Services/Operations/Auth_Api';
import { useDispatch } from 'react-redux';


const LoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  

  const [formdata,setformdata] = useState({
    email:"",password:""
  });

  const [showpassword,setshowpassword] = useState(false);

  function showpasswordHandler(){
    setshowpassword(!showpassword);
  }
  
  function changeHandler(event){
    const {name,value} = event.target;
    setformdata(prevstate => {
      return {...prevstate,[name]:value}
    });
  
    
  }

  function submitHandler(event){
    event.preventDefault();
    dispatch(logIn(formdata,navigate));
  }

  return (

    <div>
      <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-6 mt-6'>

          <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address
              <sup className='text-pink-200'>*</sup> 
            </p>

            <input
              required
              type='email'
              placeholder='Enter Email Addrress'
              value={formdata.email}
              name='email'
              onChange={changeHandler}
              className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
            />
          </label>

          <label className='w-full relative'>
            <p
              className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
            >Password<sup className='text-pink-200'>*</sup> </p>

            <input
              required
              type={(showpassword)?('text'):('password')}
              placeholder='Enter Password'
              value={formdata.password}
              name='password'
              onChange={changeHandler}
              className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
            />

            <button onClick={showpasswordHandler} type='button' className='absolute right-3 top-[38px]'>
              {
                (showpassword)?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
              }
            </button>

            <Link to='/forgot-password'>
              <p className='text-blue-100 text-xs text-right'>
                Forgot Password?
              </p>
            </Link>

          </label>


          <button type='submit' 
          className='w-full text-center bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-4'>
            Sign In
          </button>



      </form>
    </div>
  )
}

export default LoginForm;
