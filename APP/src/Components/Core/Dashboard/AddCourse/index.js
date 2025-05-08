import React from 'react';
import RenderSteps from './RenderSteps';
import { useSelector } from 'react-redux';

const uploadTips = [
    'Set the Course Price option or make it free.',
    'Standard size for the course thumbnail is 1024x576.',
    'Video section controls the course overview video.',
    'Course Builder is where you create & organize a course.',
    'Add Topics in the Course Builder section to create lessons, quizzes, and assignments.',
    'Information from the Additional Data section shows up on the course single page.',
    'Make Announcements to notify any important',
    'Notes to all enrolled students at once.'
];

const AddCourse = () => {
    const {editCourse,step} = useSelector(state => state.course);
  return (
    <div className={`text-white flex ${(editCourse)?('justify-center items-center'):('')}`}>
      <div className='xl:w-[59%] w-[100%] flex flex-col gap-y-8'>
        <h3 className='text-3xl font-bold'>
            {
                (editCourse)?('Edit Course'):('Add Course')
            }
        </h3>
        <div>
            <RenderSteps/>
        </div>
      </div>
      {(!editCourse)&&
        <div className='w-[400px] lg:block flex-col gap-y-5 xl:fixed hidden xl:right-[5%] right-[2%] top-[10%]
        bg-richblack-800 px-3 py-5 rounded-md border-[1px] border-richblack-700
        '>
            <p className='text-xl font-bold'>⚡ Course Upload Tips</p>
            <ul className="list-disc marker:text-white text-sm pl-10 
                flex flex-col gap-y-4">
            {
                uploadTips.map((tip,ind) => {
                    return <li key={ind}>{tip}</li>
                })
            }
            </ul>
        </div>
      }
    </div>
  )
}

export default AddCourse;
