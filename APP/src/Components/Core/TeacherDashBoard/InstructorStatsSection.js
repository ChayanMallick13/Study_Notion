import React, { useEffect, useState } from 'react'
import PieChart from './PieChar';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const InstructorStatsSection = ({TotalIncome,totalStudents,totalCourses,courses}) => {

    const [isStudentsStats,setisStudentsStats] = useState(true);

    function getRandColor(){
        return `${Math.floor(Math.random()*255)}`;
    }


    let studentsData = {
        labels:courses?.map(ele => ele.courseName),
        datasets:[
            {
                label:'# of Students',
                data:courses?.map(ele => ele?.studentsEnrolled?.length),
                backgroundColor: 
                    courses.map(ele => {
                        return `rgba(${getRandColor()}, ${getRandColor()}, ${getRandColor()}, 1 )`
                    })
                ,
                borderColor:[
                    'rgba(255,255,255)'
                ],
                borderWidth:2,
            },
        ],
    }

    let IncomeData = {
        labels:courses?.map(ele => ele.courseName),
        datasets:[
            {
                label:'Income from Course',
                data:courses?.map(ele => ele?.studentsEnrolled?.length*ele.price),
                backgroundColor: 
                    courses.map(ele => {
                        return `rgba(${getRandColor()}, ${getRandColor()}, ${getRandColor()}, 1 )`
                    })
                ,
                borderColor:[
                    'rgba(255,255,255)'
                ],
                borderWidth:2,
            },
        ],
    }

    console.log('Temp',studentsData);

  return (
    <div className='w-full my-5 flex justify-between'>
        <div  className='flex flex-col gap-y-4 font-extrabold bg-richblack-800 p-4 border-[2px] border-richblack-300/20 rounded-xl w-[42vw]'>
                {/* //Pie Char  */}
                <h3>Visualise</h3>
                <div className='flex gap-x-4'>
                    <button
                    onClick={()=>{setisStudentsStats(prev => !prev)}}
                    className={`${(isStudentsStats)?('text-yellow-100 bg-richblack-700'):('text-yellow-300')}
                    px-2 py-1 transition-all duration-200
                    `}
                    >Students</button>
                    <button
                    onClick={()=>{setisStudentsStats(prev => !prev)}}
                    className={`${(!isStudentsStats)?('text-yellow-100 bg-richblack-700'):('text-yellow-300')}
                    px-2 py-1 transition-all duration-200
                    `}
                    >Income</button>
                </div>
                <div className='w-[100%] flex justify-center min-h-[290px]'>
                    <PieChart
                        data={(isStudentsStats)?(studentsData):(IncomeData)}
                    />
                </div>
        </div>
        <div className='flex flex-col gap-y-4 font-extrabold w-[250px] bg-richblack-800 p-4 border-[2px] border-richblack-300/20 rounded-xl'>
            <h3 className='font-extrabold text-xl'>Statistics</h3>
            <div>
                <p className='text-richblack-100 text-lg'>Total Courses</p>
                <p className='text-3xl'>{totalCourses}</p>
            </div>
            <div>
                <p className='text-richblack-100 text-lg'>Total Students</p>
                <p className='text-3xl'>{totalStudents}</p>
            </div>
            <div>
                <p className='text-richblack-100 text-lg'>Total Income</p>
                <p className='text-3xl'>Rs. {TotalIncome}</p>
            </div>
        </div>
    </div>
  )
}

export default InstructorStatsSection
