import React from 'react'
import IconBtn from '../../../../../Common/IconBtn'

const DeleteSectionModal = ({
    heading,
    title,
    onDeletion,
    onCancel,
    disabled
}) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-richblack-700/70 z-30 flex items-center justify-center'>
        <div className='max-w-[449px] w-full bg-richblack-800 text-white flex flex-col gap-y-8 px-10 
        py-10 rounded-xl border-[0.5px] border-richblack-400'>
            <h3 className='text-3xl font-extrabold'>{heading}</h3>
            <p>{title}</p>
            <div className='flex gap-x-36'>
                <IconBtn
                    onClick={onDeletion}
                    text={'Delete'}
                    customClasses={'bg-yellow-100 text-richblack-900 font-semibold px-4 py-2 rounded-md'}
                    disabled={disabled}
                />
                <button onClick={onCancel}
                className='bg-richblack-600 px-5 py-2 rounded-md'
                    disabled={disabled}
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
  )
}

export default DeleteSectionModal
