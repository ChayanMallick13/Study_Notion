import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { sendOtp } from '../../../Services/Operations/Auth_Api';
import { useDispatch } from 'react-redux';
import countrycodes from '../../../data/countrycode.json';

const SignUpForm = ({formdata,setFormData}) => {
  const navigate = useNavigate();
  const [showPassword,setShowPassword] = useState(false);
  const [showCnfrmPass,setShowCnfrmPass] = useState(false);
  const dispatch = useDispatch();

  function changeHandler(event){
    const {value,name} = event.target;
    setFormData( prev => {
      return {...prev,[name]:value}
    })
    console.log(formdata);
  }

  function showpasshandler(){
    setShowPassword(!showPassword);
  }

  function cnfrmHandler(){
    setShowCnfrmPass(!showCnfrmPass);
  }

  function submitHandler(event){
    console.log(formdata);
    event.preventDefault();
    dispatch(sendOtp(navigate,formdata));
    // toast.success('Account Created');
  }
  return (
    <div>
      

      <div className='flex bg-richblack-800 w-max gap-2 p-1 rounded-full mt-6'>

        <button type='button' onClick={() =>{ 
            setFormData(prev => {
              return {...prev,accountType:'Student'}
            })
          }}
          className={`rounded-full
            ${(formdata.accountType==='Student') ? ('bg-richblack-900 text-white') : ('bg-richblack-800 text-richblack-200')} 
            py-[8px] px-[18px] transition-all duration-200`}
        >Student</button>

        <button type='button' onClick={() => {
            setFormData(prev => {
              return {...prev,accountType:'Instructor'}
            })
          }}
          className={`rounded-full
            ${(formdata.accountType==='Instructor') ? ('bg-richblack-900 text-white') : ('bg-richblack-800 text-richblack-200')} 
            py-[8px] px-[18px] transition-all duration-200`}
        >Instructor</button>

      </div>

      <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-5 mt-6'>

        <div className='flex gap-x-4'>

          <label className='w-full'>

          <p
            className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
          >First Name<sup className='text-pink-200'>*</sup></p>

          <input
            type='text'
            placeholder='Enter First Name'
            required
            name='firstName'
            onChange={changeHandler}
            value={formdata.firstName}
            className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
          ></input>

          </label>

          <label className='w-full'>

          <p
            className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
          >Last Name<sup className='text-pink-200'>*</sup></p>

          <input
            type='text'
            placeholder='Enter Last Name'
            required
            name='lastName'
            onChange={changeHandler}
            value={formdata.lastName}
            className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
          ></input>

          </label>

        </div>


        <label className='w-full'>
            
          <p
            className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
          >Email Address<sup className='text-pink-200'>*</sup></p>
            
          <input
            type='email'
            placeholder='Enter Email Address'
            required
            name='email'
            onChange={changeHandler}
            value={formdata.email}
            className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
          ></input>
          
        </label>

        <label className='w-full'>
            
          <p
            className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
          >Phone Number<sup className='text-pink-200'>*</sup></p>
            
          <div className='flex gap-x-6'>
          <select
            required
            name='countryCode'
            onChange={changeHandler}
            value={formdata.countryCode}
            className='w-[24%] bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
          >
            {
                countrycodes.map((ele,ind) => {
                return (<option key={ind} value={ele.code}>
                  {ele.code + ' '+ ele.country}
                </option>);
                })
            }

          </select>
          <input
            type='tel'
            inputMode='tel'
            pattern='[0-9]*'
            placeholder='Enter Phone Number'
            required
            name='phNum'
            onChange={changeHandler}
            value={formdata.phNum}
            className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
          ></input>
          </div>
          
        </label>


        <div className='flex gap-x-4'>

          <label className='w-full relative'>
            
            <p
            className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
            >Create Password<sup className='text-pink-200'>*</sup></p>
              
            <input
              type={(showPassword)?('text'):('password')}
              placeholder='Enter Password'
              required
              name='password'
              onChange={changeHandler}
              value={formdata.password}
              className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
            ></input>

            <button type='button' onClick={showpasshandler} className='absolute right-3 top-[38px]'>
              
              {
                (showPassword)?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
              }
            
            </button>
            
          </label>

          <label className='w-full relative'>
            
            <p
            className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
            >Confirm Password<sup className='text-pink-200'>*</sup></p>
              
            <input
              type={(showCnfrmPass)?('text'):('password')}
              placeholder='Confirm Password'
              required
              name='confirmPassword'
              onChange={changeHandler}
              value={formdata.confirmPassword}
              className='w-full bg-richblack-800 rounded-[0.5rem] text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
            ></input>

            <button type='button' onClick={cnfrmHandler} className='absolute right-3 top-[38px]'>

                {
                  (showCnfrmPass)?(<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>):(<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)
                }

            </button>
            
          </label>


        </div>

        <button type='submit'
        className='w-full text-center bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-2'
        >
          Create Account
        </button>


      </form>
    </div>
  )
}

export default SignUpForm;
