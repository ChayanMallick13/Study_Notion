import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { RiDeleteBin6Line, RiDeviceRecoverLine } from 'react-icons/ri';
import Loader from '../../../Common/Loader';
import { apiConnector } from '../../../../Services/apiconnector';
import { updateProfileLinks } from '../../../../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { makeRecoverReq ,makeDeleteReq} from '../../../../Services/Operations/Profile_Apis';
import { signout } from '../../../../Services/Operations/Auth_Api';
import { useNavigate } from 'react-router-dom';


const DeleteAccount = () => {
    const [loadingDeletionStatus, setloadingDeletionStatus] = useState(false);
    const [reqforDeletion, setreqForDeletion] = useState(false);
    const [deletedUser,setdeletedUser] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.Profile);
    // console.log(user._id);
    const fetch_deletion_status = async () => {
        setloadingDeletionStatus(true);
        try {
            const api_res = await apiConnector('POST', updateProfileLinks.DELETE_STATUS_LINK , {userId:user._id});
            // console.log(api_res.data);
            setreqForDeletion(api_res.data.isReqforDeletion);
            setdeletedUser(api_res.data.deletedUser);
        } catch (err) {
            console.log('Some Error Occurred');
        }
        setloadingDeletionStatus(false);
    }
    const clickHandler = (event) => {
        event.preventDefault();
        if(reqforDeletion){
            dispatch(makeRecoverReq(setreqForDeletion,setloadingDeletionStatus));
        }
        else{
            dispatch(makeDeleteReq(setreqForDeletion,setloadingDeletionStatus));
        }
    }
    // console.log(deletedUser);
    const navigate = useNavigate();
    useEffect(
        () => {
            fetch_deletion_status();
            const intervalId = setInterval(
                fetch_deletion_status,5000
            );
            return () => {
                clearInterval(intervalId);
            }
        }, []
    )
    if(deletedUser){
        dispatch(signout(navigate));
        console.log('hello');
        return null;
    }
    // if (loadingDeletionStatus) {
    //     return <Loader margin_top={false} />
    // }
    return (
        <div
            className={` ${(reqforDeletion) ? ('bg-green-700/50 border-green-700/60') : ('bg-red-900/50 border-red-700/60')} px-8 py-7 flex rounded-md border-[1px]
     gap-x-8 mt-10 lg:flex-row flex-col
    `}
        >
            <div>
                <span className={`${(reqforDeletion) ? ('bg-green-700 border-green-400/80')
                    : ('bg-red-700 border-red-400/80')} flex justify-center items-center px-3 py-3 rounded-full
            text-red-400 text-3xl border-[1px] w-[75px] h-[75px] mb-2
            `}>
                    {(reqforDeletion) ? (<RiDeviceRecoverLine />) : (<RiDeleteBin6Line />)}
                </span>
            </div>
            <div className='space-y-3 text-red-200'>
                <h3 className='font-extrabold text-2xl text-white'>
                    {(reqforDeletion) ? ('Recover Account') : ('Delete Account')}
                </h3>
                {
                    (reqforDeletion) ? (
                        <div>
                            <p>Your Account is Requested For Deletion.Can Recover Now</p>
                        </div>
                    ) : (
                        <div>
                            <p>Would you like to delete account?</p>
                            <p>This account may contain Paid Courses.<br />
                                Deleting your account is permanent and will remove
                                all the contain associated with it.</p>
                        </div>
                    )
                }
                <button
                onClick={clickHandler}
                disabled={loadingDeletionStatus}
                className={`${(reqforDeletion)?('text-green-500'):('text-red-500')} font-extrabold`}>
                    {(reqforDeletion)?(
                        'Recover My Account'
                    ):(
                        'I Want to Delete My Account.'
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAccount;
