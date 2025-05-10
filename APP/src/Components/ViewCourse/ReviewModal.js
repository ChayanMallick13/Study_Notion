import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-stars';
import { newRatingHandler } from '../../Services/Operations/Ratings_Apis';


const ReviewModal = ({setreviewModal}) => {

  const { user } = useSelector(state => state.Profile);
  const {courseId} = useParams();
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    review: '',
    rating: 5,
    courseId,
  });


  function changeHandler(event) {
    const nameId = event.target.name;
    const value = event.target.value;
    //console.log("jj", nameId, value,formData);
    setFormData(prev => {
      prev[nameId] = value;
      return {...prev};
    });
  }

  function ratingChangeHandler(newRating) {
    setFormData(prev => {
      prev['rating'] = newRating;
      return {...prev};
    });
  }


  function submitHandler(event) {
    event.preventDefault();
    console.log(formData);
    dispatch(newRatingHandler(closeModal,setLoading,formData));
    
  }

  function closeModal(){
    setreviewModal(false);
  }

  return (
    <div className='fixed z-30 top-0 left-0 right-0 bottom-0 bg-richblack-700/70 flex items-center justify-center'>
      <div className='border-[2px] border-white/30'>
        <div className='bg-richblack-900 text-white md:w-[550px] w-[99vw]'>
          <div className='flex items-center justify-between bg-richblack-700 p-4 border-b-[2px] border-b-richblack-300'>
            <span>Add Review</span>
            <button
            onClick={closeModal}
            disabled={loading}
            >
              <IoMdClose />
            </button>
          </div>
        </div>

        <div className='bg-richblack-900 p-5 text-white'>
          <div className='flex flex-col justify-center items-center'>
            <div className='flex md:flex-row flex-col items-center gap-3 mb-5'>
              <div>
                <img alt='UserImage' src={user?.image} 
                  className='w-[100px] h-[100px] rounded-full aspect-square object-cover'
                />
              </div>
              <div>
                <p className='text-2xl'>{user?.firstName + ' ' + user?.lastName}</p>
                <p className='text-lg text-richblack-100'>Posting Publicly</p>
              </div>
            </div>
            <div>
              <ReactStars
                count={5}
                size={30}
                value={formData.rating}
                onChange={ratingChangeHandler}
              />
            </div>
          </div>
          <form onSubmit={submitHandler}>

            <label className='w-full'>
              <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Add Your Experience
                <sup className='text-pink-200'>*</sup>
              </p>

              <textarea
                required
                type='email'
                placeholder='Share Details of your own experience for this course'
                value={formData.review}
                name='review'
                onChange={changeHandler}
                className='w-full bg-richblack-600 rounded-[0.5rem] text-richblack-5 p-[12px] min-h-[150px] outline-none
                border-[1px] border-richblack-400
                '
              />
            </label>


            <div className='flex place-content-end gap-x-4 mt-5'>
              <button
              type='button'
              className='bg-richblack-500 p-3 font-semibold rounded-lg'
              onClick={closeModal}
              disabled={loading}
              >
                Cancel
              </button>
              <button
              type='submit'
              className='bg-yellow-100 p-3 text-richblack-900 font-extrabold rounded-lg'
              disabled={loading}
              >
                Add Review
              </button>
            </div>

          </form>
        </div>



      </div>
    </div>
  )
}

export default ReviewModal;
