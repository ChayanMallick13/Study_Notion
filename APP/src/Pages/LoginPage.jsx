import React, { useEffect } from 'react';
import Template from '../Components/Core/LoginPage/Template';
import studentimg from '../assets/Images/login.webp';
import { useSelector } from "react-redux";
import Loader from '../Components/Common/Loader';
import { setsignupData } from '../reducer/Slices/authslice';


function LoginPage() {
  const {loader} = useSelector(state => state.loader);
  useEffect(
    () => {
        setsignupData(null);
    },[]
  )
  if(loader){
    return <Loader/>
  }
  return (
        
      <Template
        title={'Welcome Back'}
        desc1={'Build skills for today, tomorrow, and beyond.'}
        desc2={'Education to future-proof your career.'}
        formtype={'login'}
        image={studentimg}
      />

  )
}

export default LoginPage
