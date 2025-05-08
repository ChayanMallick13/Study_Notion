import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectRouteverifyEmail({children}) {
    const {signupData} = useSelector(state => state.auth);
    // console.log(signupData);
    if(!signupData){
        return <Navigate to={'/signup'}/>
    }
  return (
    children
  )
}

export default ProtectRouteverifyEmail;


