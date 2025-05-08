import React from 'react'
import CTAButton from './CTAButton'
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, gradient, codecolor
}) {
    const lines = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    return (

        <div className='relative w-[100%]'>
            <div className={`absolute lg:h-[200px] lg:w-[200px] h-[200px] w-[200px] rounded-full ${gradient} 
            ${(position.includes('lg:flex-row-reverse')?('lg:left-[6%] left-[10%]'):('lg:right-[34%] left-[10%] lg:left-[55%]'))}
              lg:top-[18%]  top-[50%]`}></div>
            <div className={`flex ${position} justify-between gap-10 items-center backdrop-blur-2xl py-16 md:px-8 px-3`}>

                {/* Section 1 */}
                <div className='flex flex-col lg:w-[50%] gap-8'>

                    {heading}

                    <div className='text-richblack-300 font-bold w-[80%]'>
                        {subheading}
                    </div>

                    <div className='flex gap-7 mt-7'>
                        <CTAButton isBlack={ctabtn1.isBlack} linkto={ctabtn1.linkto}>
                            {ctabtn1.text}
                        </CTAButton>
                        <CTAButton isBlack={ctabtn2.isBlack} linkto={ctabtn2.linkto}>
                            {ctabtn2.text}
                        </CTAButton>
                    </div>

                </div>

                {/* Section2 */}
                <div className='flex lg:w-[50%] w-[100%] md:text-[13px] text-[10px] h-fit relative'
                >

                    <div className='w-full h-full flex bg-pure-greys-100/5 border-pure-greys-400 border-[2px] p-3'>
                        <div className='flex flex-col justify-center items-center w-[10%] font-inter font-bold text-richblack-400 relative'>
                            {
                                lines.map((ele,index) => {
                                    return (
                                        <p key={index}>{ele}</p>
                                    )
                                })
                            }
                        </div>

                        <div className={`w-[90%] flex-col flex font-bold font-mono ${codecolor} pr-2 relative`}>

                            <TypeAnimation
                                sequence={[codeblock, 10000, ""]}
                                repeat={Infinity}
                                omitDeletionAnimation={true}
                                style={
                                    {
                                        whiteSpace: "pre-line",
                                        display: "block"
                                    }
                                }
                            />


                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CodeBlocks

