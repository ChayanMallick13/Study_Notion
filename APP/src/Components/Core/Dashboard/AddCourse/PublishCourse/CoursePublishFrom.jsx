import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../reducer/Slices/CourseSlice';
import { FaAngleRight } from 'react-icons/fa';
import { apiConnector } from '../../../../../Services/apiconnector';
import { coursesLinks } from '../../../../../Services/apis';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { COURSE_STATUS } from '../../../../../utlis/constants';

function CoursePublishFrom() {
  const {
    register,
    setValue,
    handleSubmit,
  } = useForm();
  const [loading,setLoading] = useState(false);
  const { course } = useSelector(state => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(
    () => {
      setValue('makePublic', (course.status === COURSE_STATUS.PUBLISHED));
      // console.log('Bali',(course.status === 'Published'));
      // console.log(course);
    }, []
  );

  const SubmitHandler = async (formData) => {
    // console.log(formData);
    if((formData.makePublic^(course.status===COURSE_STATUS.PUBLISHED))){
      setLoading(true);
      const tid = toast.loading('Loading...');
      const body = new FormData();
      body.append('courseId',course._id);
      body.append('status',
        (formData.makePublic)?('Published'):('Draft')
      );
      await apiConnector('POST',coursesLinks.UPDATE_COURSE_STATUS,body).then(
        () => {
          toast.success((formData)?('Course set as Public Successfully')
          :('Course Saved as Draft Successfully'));
          dispatch(resetCourseState());
          navigate('/dashboard/my-courses');
        }
      ).catch(
        () => {
          toast.error('Some Error Occured in Updating Course');
        }
      )
      setLoading(false);
      toast.dismiss(tid);
    }
    else{
      dispatch(resetCourseState());
      navigate('/dashboard/my-courses');
    }
  }

  const goBack = () => {
    dispatch(setStep(2));
  }
  return (
    <div className='rounded-md border-richblack-700 text-richblack-500 bg-richblack-800 p-6 
    space-y-8 border-[1px] mt-14' 
    >
      <h3 className='text-2xl text-white font-semibold'>Publish Settings</h3>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <div>
          <label className='flex items-center gap-x-2 text-lg cursor-pointer'>
            <input
              type='checkbox'
              {...register('makePublic')}
              className="w-4 h-4 outline-none"
            />
            <p className='select-none'>Make this course as public</p>
          </label>
        </div>
        <div className='flex gap-x-2 place-self-end mt-10'>
          <button type='button' onClick={
            goBack
          }
            disabled={loading}
            className='bg-richblack-300 text-richblack-900
                            font-bold px-5 py-1 rounded-lg 
                            '
          >
            Back
          </button>
          <button 
          type='submit'
          className='flex items-center gap-x-1 bg-yellow-100 px-5 py-3
                        font-extrabold text-richblack-900 text-lg rounded-lg
                        '
            disabled={loading}
          >
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CoursePublishFrom
