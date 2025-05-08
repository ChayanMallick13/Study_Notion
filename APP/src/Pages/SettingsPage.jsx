import React, { useEffect } from 'react'
import ChangeDP from '../Components/Core/Dashboard/Settings/ChangeDP';
import ProfileInformation from '../Components/Core/Dashboard/Settings/ProfileInformation';
import Password from '../Components/Core/Dashboard/Settings/Password';
import DeleteAccount from '../Components/Core/Dashboard/Settings/DeleteAccount';
import { ACCOUNT_TYPE } from '../utlis/constants';
import { useSelector } from 'react-redux';

function SettingsPage() {
  const {user} = useSelector(state => state.Profile);
  return (
    <div className='text-white flex flex-col gap-x-4'>

      <h3 className='text-3xl font-extrabold'>Edit Profile</h3>

      <ChangeDP/>

      <ProfileInformation/>

      <Password/>

      {
        (user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR)&&<DeleteAccount/>
      }
      
    </div>
  )
}

export default SettingsPage;
