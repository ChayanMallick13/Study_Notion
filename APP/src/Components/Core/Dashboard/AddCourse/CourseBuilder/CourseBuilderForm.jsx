import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import NestedView from './NestedView';
import { setCourse, setEditCourse, setStep } from '../../../../../reducer/Slices/CourseSlice';
import { FaAngleRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { apiConnector } from '../../../../../Services/apiconnector';
import { coursesLinks } from '../../../../../Services/apis';

function CourseBuilderForm() {

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(false);
  const { course,editCourse } = useSelector(state => state.course);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  async function sumbitHandler(formData) {
    console.log('formdata');
    if(!formData || !formData.sectionName){
      toast.error('Enter a Section Name First');
      return;
    }
    const tid = toast.loading('Loading...');
    setLoading(true);
    const body = new FormData();
      body.append('courseId',course._id);
      body.append('sectionName',formData.sectionName);
    if(editSectionName){
      body.append('SectionId',formData.sectionId);
      await apiConnector('PUT',coursesLinks.UPDATE_SECTION,body).then(
        (res) => {
          dispatch(setCourse(res.data.course));
          setValue('sectionName', '');
          setEditSectionName(false);
          setValue('sectionId',null);
          toast.success('Section Updated Successfully!');
        }
      ).catch(
        (err) =>{
          toast.error(err.response.data.message);
        }
      );
    }
    else{
      await apiConnector("POST",coursesLinks.CREATE_SECTION,body).then(
        (res) => {
            dispatch(setCourse(res.data.course));
            setValue('sectionName', '');
            toast.success('New Section Addedd Successfully');
        }
      ).catch(
        (err)=>{
          toast.error(err.response.data.message);
        }
      );
    }
    toast.dismiss(tid);
    setLoading(false);
  }

  console.log(course);

  function gotoNext() {
    //validate
    if(course.courseContent.length ===0 ){
      toast.error('Please Add Atleast One Section');
      return;
    }
    if(course.courseContent?.some((section)=>section.subSections.length === 0)){
      toast.error('Please Add atleast One Lecture in Each Section');
      return;
    }

    //sab good good hain
    dispatch(setStep(3));
  }

  function goBack(){
    dispatch(setCourse(course));
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  }


  return (
    <div className='bg-richblack-800 px-5 py-7
    border-[1px] border-richblack-700 rounded-lg
    '>
      <p className='text-2xl font-bold mb-9'>Course Builder</p>
      <form onSubmit={handleSubmit(sumbitHandler)}>
        <div>
          <label htmlFor='sectionName'>
            <p
              className='text-white text-[15px] mb-3 font-bold'
            >Section Name <sup
              className='text-red-500 text-[12px]'
            >*</sup></p>
            <input
              type='text'
              id='sectionName'
              placeholder='Add a Section To Build Your Course'
              {...register('sectionName',
                { required: { value: true, message: 'Section Name is Required' } })}
              className='w-full bg-richblack-700 border-b-2 border-b-richblack-500
                        rounded-lg px-3 py-3 text-white outline-none
                        '
            />
            {
              errors.sectionName && <span
                className='text-xs text-red-500'
              >{errors.sectionName.message}</span>
            }
          </label>
        </div>
        <div className='flex gap-x-3'>
          <button type='submit' className='flex gap-x-1 items-center border-[1px] border-yellow-100 px-3 py-2
          text-xl rounded-lg text-yellow-100 mt-4
          '
          disabled={loading}>
            <span>{(editSectionName) ? ('Edit Section Name') : ('Create Section')}</span>
            {(!editSectionName)&&<IoMdAddCircleOutline />}
          </button>
          {
            (editSectionName) && <button type='button' disabled={loading}
              onClick={(event) => {
                setValue('sectionName', '');
                setEditSectionName(false);
              }}
              className='text-richblack-300'
            >
              Cancel Edit
            </button>
          }
        </div>
      </form>
      {
        course.courseContent?.length > 0 && (
          <NestedView
            setEditSectionName={setEditSectionName}
            setValue={setValue}
            loading={loading}
            setLoading={setLoading}
          />
        )
      }

      <div className='flex gap-x-2 place-self-end'>
        <button type='submit' onClick={
          goBack
        }
        disabled={loading}
          className='bg-richblack-300 text-richblack-900
                            font-bold px-5 py-1 rounded-lg 
                            '
        >
          Back
        </button>
        <button className='flex items-center gap-x-1 bg-yellow-100 px-5 py-2
                        font-extrabold text-richblack-900 text-lg rounded-lg
                        '
          onClick={gotoNext}
          disabled={loading}
        >
          <span>Next</span>
          <FaAngleRight />
        </button>
      </div>
    </div>
  )
}

export default CourseBuilderForm
