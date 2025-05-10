import React from 'react'
import { Link } from 'react-router-dom';

function InstructorCardSection({courses}) {

    const allCoursesLink = '/dashboard/my-courses';

  return (
    <div className='w-full bg-richblack-800 px-4 border-[2px] border-richblack-300/20 rounded-xl'>
        <div className='w-full flex justify-between pb-4 pt-2 px-2 items-center'>
            <h3 className='font-extrabold text-lg'>Your Courses</h3>
            <Link
            to={allCoursesLink}
            className='text-yellow-100 text-sm font-bold'
            >View All</Link>
        </div>

        <Link className='grid lg:grid-cols-3 gap-x-3 gap-y-8 mb-2 px-2 md:grid-cols-2 grid-cols-1'
        to={allCoursesLink}
        >
            {
                courses.map(
                    ((course,key) => {
                        return <div key={key}>
                                <img alt='course Img' src={course.thumnail}
                                    className='w-[325px] h-[200px] '
                                />
                                <div className='mt-3'>
                                    <p className='text-lg font-semibold'>{course.courseName}</p>
                                    <div className='flex gap-x-3 text-richblack-100'>
                                        <p>{course?.studentsEnrolled?.length || 0} Students</p>
                                        <span>|</span>
                                        <p>Rs {course.price}</p>
                                    </div>
                                </div>
                        </div>
                    })
                )
            }
        </Link>

    </div>
  )
}

export default InstructorCardSection;
