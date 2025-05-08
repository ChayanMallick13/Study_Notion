import React, { useRef, useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links';
import { signout } from '../../../Services/Operations/Auth_Api';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Common/Loader';
import { Link, useNavigate } from 'react-router-dom';
import SideBarLinks from './SideBarLinks';
import ConfirmModal from '../../Common/ConfirmModal';
import { VscSignOut } from "react-icons/vsc";
import { LuMoveLeft } from "react-icons/lu";
import { BsLayoutSidebar } from "react-icons/bs";
import useOutsideClickHandler from '../../../Hooks/useOutsideClickHandler';

const SideBar = () => {
    const { loader: ProfileLoading, user } = useSelector(state => state.Profile);
    const { loader: authLoading } = useSelector(state => state.auth);
    const [displaySideBar,setDisplaySidebar] = useState(false);
    const elementRef = useRef();
    useOutsideClickHandler(elementRef,() => {
        setDisplaySidebar(false);
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(user.accountType);
    const [confirmModalData, setconfirmModalData] = useState(null);

    if (ProfileLoading || authLoading) {
        return <Loader />
    }
    return (
        <div className='relative z-20' ref={elementRef}>
            <div className={`w-[50px] h-[50px] p-3 left-1 text-2xl font-extrabold
                absolute md:hidden -top-[2em] text-white
                cursor-pointer ${(displaySideBar?('opacity-0 hidden'):('opacity-40'))}
                `}
                onClick={() => {
                    setDisplaySidebar(prev => !prev);
                }}
                >
                    <BsLayoutSidebar/>
                </div>
            <div className={`flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700
        h-[calc(100vh-3.5rem)] bg-richblack-800 py-10 overflow-hidden md:flex md:relative absolute
        ${(!displaySideBar?('hidden'):(''))}
        `}>
                <div className='flex flex-col text-sm font-medium text-richblack-300 '>
                    {
                        sidebarLinks.filter(link => {
                            return ((!link.type) || link.type === user.accountType)
                        }).map((link, index) => {
                            return <SideBarLinks key={index} {...link} />;
                        })
                    }
                </div>

                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

                <div className='flex flex-col text-sm font-medium text-richblack-300'>

                    <SideBarLinks
                        id={7}
                        name={'Settings'}
                        path={'/dashboard/settings'}
                        icon={'VscSettingsGear'}
                    />

                    <button
                        onClick={() => {
                            setconfirmModalData({
                                heading: 'Are You Sure ?',
                                desc: 'You will be Logged Out of Your Account.',
                                btntext1: 'Logout',
                                btntext2: 'Cancel',
                                btn1Handler: () => {
                                    dispatch(signout(navigate));
                                },
                                btn2Handler: () => {
                                    setconfirmModalData(null);
                                }
                            });
                        }}
                        className='text-sm font-medium text-richblack-300 px-8 py-2'
                    >
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className='text-lg' />
                            <span>Log Out</span>
                        </div>
                    </button>



                </div>
            </div>

            <ConfirmModal
                modalData={confirmModalData}
            />

        </div>
    )
}

export default SideBar;
