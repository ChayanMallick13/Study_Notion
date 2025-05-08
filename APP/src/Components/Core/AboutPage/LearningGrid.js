import React from 'react';
import {LearningGridArray} from '../../../data/LearningGridData';
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/CTAButton';

const LearningGrid = () => {
  return (
    <div className='grid xl:grid-cols-4 grid-cols-1 mb-10'>
        {
            LearningGridArray.map((card,index) => {
                return (
                    <div
                    key={index}
                    className={`
                    ${(card.order<0)?('bg-richblack-900 xl:col-span-2 col-span-1'):(`
                        ${(card.order%2)?('bg-richblack-700'):('bg-richblack-800')}
                    `)}
                    ${(card.order===3)&&'xl:col-start-2'}
                    `}
                    >
                        {
                            (card.order===-1)?(
                                <div className='flex flex-col gap-y-4 xl:w-[79%] w-[100%] xl:pb-0 pb-8'>
                                    <h2 className='text-4xl font-extrabold'>{card.heading} <HighlightText text={card.highlightText}/></h2>
                                    <p className='text-richblack-300 font-semibold'>
                                        {card.description}
                                    </p>
                                    <CTAButton
                                    isBlack={false}
                                    linkto={card.BtnLink}
                                    >
                                        {card.BtnText}
                                    </CTAButton>
                                </div>
                            ):(
                                <div className='flex flex-col xl:gap-y-12 gap-y-2 px-8 py-10 h-[300px]'>
                                    <h4 className='text-xl'>{card.heading}</h4>
                                    <p className='text-richblack-300 font-semibold'>{card.description}</p>
                                </div>
                            )
                        }

                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid;
