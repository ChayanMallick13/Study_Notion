import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';

const Cart = () => {
    const {totalItem} = useSelector(state => state.Cart);
    
  return (
    <div className='text-white flex flex-col gap-y-4'>
        <h1 className='font-extrabold text-3xl'>Your Cart</h1>
        <p className='text-richblack-400 mt-10'>{totalItem} Courses in Cart</p>
        <div className='h-[0.01rem] w-full bg-richblack-700'/>
        {
            (totalItem>0)?(
                <div className='flex gap-10 xl:flex-row flex-col'>
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>
            ):(
                <div className='h-[50vh] flex justify-center items-center text-2xl font-bold text-richblack-500'>
                    You Have not added any Course to Cart
                </div>
            )
        }
    </div>
  )
}

export default Cart;
