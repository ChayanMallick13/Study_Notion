import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import ReactStars from 'react-stars';
import { GetAvgRating } from '../../../../Services/Operations/Ratings_Apis';

const AvgRatingComponent = ({ courseId }) => {
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    useEffect(
        () => {
            GetAvgRating(courseId, setRating);
        }, [courseId, dispatch]
    )
    console.log('Rating',rating);
    return (
        <div className='flex gap-3 items-center'>
            <span>{rating}</span>
            <ReactStars
                count={5}
                edit={false}
                value={rating}
                half={true}
                color2={'#ffd700'}
            />
        </div>
    )
}

export default AvgRatingComponent;
