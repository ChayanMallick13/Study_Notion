import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import CourseInfoForm from './CourseForms/CourseInfoForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import CoursePublishFrom from './PublishCourse/CoursePublishFrom';

const steps = [
    {
        id: 1,
        title: 'Course Information'
    },
    {
        id: 2,
        title: 'Course Builder'
    },
    {
        id: 3,
        title: 'Publish'
    },
]

const RenderSteps = () => {
    const { step,course } = useSelector(state => state.course);
    return (
        <div className='flex flex-col gap-y-10'>
            <div className='flex gap-x-3 justify-between'>
                {
                    steps.map((item) => {
                        return <div key={item.id}
                        className='flex flex-col w-full items-center justify-center gap-y-2'>
                            <div className='flex flex-row items-center w-full justify-center relative'>
                                <div className={` rounded-full px-4 py-2
                                        ${(step === item.id) ?
                                        ('border-2 border-yellow-200 text-yellow-50 font-extrabold bg-yellow-900') :
                                        ('border-2 border-richblack-700 text-richblack-500')}
                                        ${(step > item.id) ? ('bg-yellow-100 text-richblack-900 font-extrabold py-4')
                                        : ('')}
                                        `}>
                                    {(step > item.id) ? (<FaCheck />) : (item.id)}
                                </div>
                                {

                                    (item.id !== steps.length) && <div className={`absolute w-[85.5%]
                                    left-[59.4%]
                                    border-t-2  border-dotted
                                    ${(step > item.id) ? ('border-t-yellow-100') : ('border-t-richblack-500')}
                                    `} />
                                }
                            </div>
                            <div className={`${(step === item.id) ? ('text-white font-extrabold') :
                                ('')}
                            ${(step >= item.id) ? ('font-extrabold text-white') : ('text-richblack-600')}
                            `}>{item.title}</div>

                        </div>

                    })
                }
            </div>
            {(step === 1) && <CourseInfoForm />}
            {(step === 2) && <CourseBuilderForm />}
            {(step === 3) && <CoursePublishFrom />}
        </div>
    )
}

export default RenderSteps;
