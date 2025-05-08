import React from 'react'
import IconBtn from './IconBtn';

function ConfirmModal({modalData}) {
    if(!modalData){
        return null;
    }
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-slate-700/30 z-20 flex items-center justify-center'>
        <div className='w-[375px] bg-richblack-900 text-white flex flex-col gap-y-8 px-8 py-4 rounded-xl border-[0.5px] border-richblack-400'>
            <h3 className='text-3xl font-extrabold'>{modalData.heading}</h3>
            <p>{modalData.desc}</p>
            <div className='flex gap-x-36'>
                <IconBtn
                    onClick={modalData?.btn1Handler}
                    text={modalData?.btntext1}
                    customClasses={'bg-yellow-100 text-richblack-900 font-semibold px-2 py-2 rounded-md'}
                />
                <button onClick={modalData?.btn2Handler}
                className='bg-richblack-600 px-3 py-2 rounded-md'
                >
                    {modalData?.btntext2}
                </button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal;
