import React from 'react'
import { Link } from 'react-router-dom'

function CTAButton({children,isBlack,linkto,width,type}) {
  return (
    <Link to={linkto}>
        <button type={type} className={`text-center md:text-[15px] text-[10px] px-6 py-3 rounded-md font-bold ${width}
        ${(isBlack)?('bg-richblack-800 text-white'):('text-black bg-yellow-50')}
        hover:scale-95 transition-all duration-200
        ${(isBlack)?('shadow-sm shadow-richblack-200 hover:shadow-none'):('')}
        `}>
            {children}
        </button>
    </Link>
  )
}

export default CTAButton
