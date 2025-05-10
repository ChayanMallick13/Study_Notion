import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { getAllReviews } from '../../Services/Operations/Ratings_Apis';
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ReactStars from 'react-stars';

const LearnersReviewSlider = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(
        () => {
            getAllReviews(setReviews);
        }
    )

    return (
        <div className='mb-20 text-white'>
            <div>
                <Swiper
                    freeMode={true}
                    breakpoints={
                        {
                            1600:{
                                slidesPerView: 4,
                            },
                            1080: {
                                slidesPerView: 3,
                            },
                            720: {
                                slidesPerView: 2
                            },
                            500: {
                                slidesPerView: 1
                            }
                        }
                    }
                    spaceBetween={20}
                    height={100}
                    modules={[Pagination, Autoplay, Keyboard]}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    keyboard={{ enabled: true }}
                    loop={true}
                    rewind={true}
                    className="mySwiper"
                >
                    {
                        reviews.map(
                            (ele, key) => {
                                return <SwiperSlide key={key}>
                                    <div className='flex flex-col justify-between w-[360px] bg-richblack-800 h-[300px]
                                    px-3 py-3 border-[3px] border-richblack-400/20
                                    '>
                                       <div className='flex items-center gap-x-5 w-full'>
                                            <img src={ele.user.image} alt='User'
                                                className='w-[80px] h-[80px] aspect-square rounded-full'
                                            />
                                            <div>
                                                <div className='flex gap-x-[3px]'>
                                                    <p>{ele.user.firstName}</p>
                                                    <p>{ele.user.lastName}</p>
                                                </div>
                                                <p className='text-sm text-richblack-200'>{ele.user.email}</p>
                                            </div>
                                       </div>
                                       <p>
                                        {
                                            ele.review.substr(0,200)
                                        }...
                                       </p>
                                       <div className='flex items-center gap-x-4'>
                                            <p className='text-yellow-100 font-extrabold'>{ele.rating}</p>
                                            <div>
                                                <ReactStars
                                                    value={ele.rating}
                                                    size={20}
                                                    count={5}
                                                    edit={false}
                                                />
                                            </div>
                                       </div>
                                    </div>
                                </SwiperSlide>
                            }
                        )
                    }
                    {
                        !reviews.length && <SwiperSlide>
                            No Reviews Available Nows
                        </SwiperSlide>
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default LearnersReviewSlider;
