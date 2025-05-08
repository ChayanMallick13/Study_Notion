import React from 'react'

const Loader = ({margin_top=true}) => {
  return (
    <div className={`${(margin_top)?('mt-[350px]'):('mt-0')} w-full flex justify-center items-center`} >
        <span className="loader">Loading</span>
    </div>
  )
}

export default Loader;
