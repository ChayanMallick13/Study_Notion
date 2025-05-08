import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';
import { GetAvgRating } from '../../Services/Operations/Ratings_Apis';

function CourseCard({thumnail,courseName,price,ratingAndReviews,_id,height=null,width=null}) {
    const [avgRating,setAvgRating] = useState(0);

    useEffect(
        () => {
            GetAvgRating(_id,setAvgRating);
        },[_id]
    )

  return (
    <Link to={`/course/${_id}`} className='h-full'>
        <div className='select-none flex flex-col h-full' >
        <div  className={`${width ? `${width}` : 'w-full'} ${height ? `${height}` : 'h-[200px]'} rounded-lg `}>
            <img alt='courseImage' loading='lazy' src={thumnail}
                className={`${width ? `${width}` : 'w-full'} ${height ? `${height}` : 'h-[200px]'} rounded-lg `}
            />
        </div>
        <p className='text-xl font-semibold mt-3'>{courseName}</p>
        <div className='flex justify-between items-center mt-5 mb-3'>
            <div className='flex gap-x-3 items-center'>
                <span className='font-semibold text-lg'>{avgRating}</span>
                <ReactStars
                    count={5}
                    value={avgRating}
                    edit={false}
                    size={22}
                    
                />
            </div>
            <p>{ratingAndReviews?.length} Ratings</p>
        </div>
        <div className='flex gap-x-2 text-2xl font-extrabold mb-[8rem]'>
            <p>Rs. </p>
            <p>{price}</p>
        </div>
        </div>
    </Link>
  )
}

export default CourseCard;
