import React from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { removeFromCart } from '../../../../reducer/Slices/CartSlice';
import { getAvgRating } from '../../../../Services/Operations/Course_Apis';
import AvgRatingComponent from './AvgRatingComponent';

const RenderCartCourses = () => {
    const {cart} = useSelector(state => state.Cart);
    const dispatch = useDispatch();
  return (
    <div className='xl:w-[80%] w-[100%]'>
      {
        cart.map((course,index) => {
            return <div key={index} className={`flex  justify-between items-center py-7
            ${(index!==cart.length-1)&&('border-b-[0.01rem] border-b-richblack-700')}
            `}>
                <div className='flex sm:flex-row flex-col items-center gap-x-5'>
                    <img src={course.thumnail} alt='thumbnail'
                        className='h-[120px] rounded-lg w-[150px]'
                    />
                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-[17px]'>{course.courseName}</p>
                        <p className='text-richblack-400 text-sm'>{course.Category?.name}</p>
                        <div className='flex gap-3 items-center'>
                            
                            <AvgRatingComponent
                                courseId={course._id}
                            />

                            <span className='text-sm text-richblack-500'>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-3'>
                    <button
                    onClick={() => {
                        dispatch(removeFromCart(course._id));
                    }}
                    className='bg-richblack-800 flex items-center px-3 py-3 gap-x-2 text-red-800 rounded-lg'
                    >
                        <RiDeleteBin6Line/>
                        <span>Remove</span>
                    </button>

                    <p className='text-3xl font-bold text-yellow-50'>Rs {course?.price}</p>
                </div>
            </div>
        })
      }
    </div>
  )
}

export default RenderCartCourses;
