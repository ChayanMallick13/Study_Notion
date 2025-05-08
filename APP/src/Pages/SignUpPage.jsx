import React from 'react';
import Template from '../Components/Core/LoginPage/Template';
import studentimg from '../assets/Images/login.webp';
import { useSelector } from "react-redux";
import Loader from '../Components/Common/Loader';

function SignUpPage() {
  const {loader} = useSelector(state => state.loader);
  if(loader){
    return <Loader/>
  }
  return (
      
      <Template
        title={'Join the millions learning to code with StudyNotion for free'}
        desc1={'Build skills for today, tomorrow, and beyond.'}
        desc2={'Education to future-proof your career.'}
        formtype={'signup'}
        image={studentimg}
      />

  )
}

export default SignUpPage;
