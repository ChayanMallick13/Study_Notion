import React from 'react'
import { useSelector } from 'react-redux';
import Loader from '../Components/Common/Loader';
import SideBar from '../Components/Core/Dashboard/SideBar';
import { matchPath, Outlet, useLocation } from 'react-router-dom';
import PageNotFound from './PageNotFound';

const Dashboard = () => {

    const {loading : ProfileLoading} = useSelector(state => state.Profile);
    const {loading: authLoading} = useSelector(state => state.auth);
    const location = useLocation();
    if(matchPath({path:'/dashboard'},location.pathname)){
      return <PageNotFound/>
    }

    if(ProfileLoading || authLoading){
        return (<div className='w-screen h-[90vh] flex justify-center items-center'>
          <Loader/>
        </div>)
    }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
      <SideBar/>
      <div className='h-[calc(100vh-3.5rem)] w-full px-2 overflow-auto'>
            <div className='mx-auto md:w-11/12 w-full max-w-[1080px] py-10'>
                <Outlet/>
            </div>
      </div>
    </div>
  )
}

export default Dashboard;
