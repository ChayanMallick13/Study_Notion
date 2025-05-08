import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { buyCourse } from '../../../../Services/Operations/Payment_Apis';
import { useNavigate } from 'react-router-dom';

function RenderTotalAmount() {
    const {total,cart} = useSelector(state => state.Cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleBuyCourse = () => {
        const courses = cart.map(course => course._id);
        console.log('Courses Bought : ',courses);

        //PayMENT INTEGRATION API
        const body = {
          courses,
        }
        dispatch(buyCourse(body,navigate,dispatch));
    }
  return (
    <div className='bg-richblack-700 h-max xl:max-w-[300px] px-4 py-6 flex flex-col gap-y-4
    rounded-lg border-[1px] border-richblack-600 max-w-[500px] w-full
    '>
        <p className='text-lg'>Total : </p>
        <p className='text-yellow-50 text-3xl font-extrabold'>Rs {total}</p>
        <button
        className='bg-yellow-50 px-2 p-2 text-richblue-900 w-full'
        onClick={handleBuyCourse}
        >
            Buy Now
        </button>
    </div>
  )
}

export default RenderTotalAmount;
