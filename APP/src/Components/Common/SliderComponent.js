import React from 'react'
import { Autoplay, Keyboard, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import CourseCard from './CourseCard';

function SliderComponent({courses=[]}) {
    if(courses.length===0){
        return <div className='w-full h-[300px] text-white font-extrabold flex items-center justify-center text-2xl'>
            No Courses To Show 
        </div>
    }
  return (
    <div className='text-white'>
        <Swiper
        breakpoints={
          {
            1080:{
              slidesPerView:3,
            },
            720:{
              slidesPerView:2
            },
            500:{
              slidesPerView:1
            }
          }
        }
        spaceBetween={30}
        height={100}
        freeMode={true}
        modules={[Pagination,Autoplay,Keyboard]}
        autoplay={{delay:3000,disableOnInteraction:false}}
        keyboard={{enabled:true}}
        loop={true}
        rewind={true}
        className="mySwiper"
      >
        {
            courses.map(
                (ele,key) => {
                    return <SwiperSlide key={key}>
                        <CourseCard {...ele}/>
                    </SwiperSlide>
                }
            )
        }
      </Swiper>
    </div>
  )
}

export default SliderComponent;
