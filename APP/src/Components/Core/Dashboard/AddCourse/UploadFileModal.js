import React from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; 

const UploadFileModal = ({ userImage, register, title, errors, setValue,SupportedFiletypes,
    reqErrorMsg,registerValue,editable=true,isVideo=false,cloudinaryMedia,setcloudinaryMedia,loading
 }) => {
    return (
        <div>

            <p
                className='text-white text-[15px] mb-3 font-bold'
            >{title} {(editable)&&<sup
                className='text-red-500 text-[12px]'
            >*</sup>}</p>
            <div className='relative'>
                {
                    (!userImage || userImage?.length === 0)&&(!cloudinaryMedia) && (
                        <label htmlFor={registerValue} className='w-full h-full'>
                            <input type='file'
                                {...register(registerValue, {
                                    required: { value: true, message: reqErrorMsg },
                                })}
                                id={registerValue}
                                className='hidden h-full'
                                multiple={false}
                                accept={SupportedFiletypes}
                                disabled={!editable || loading}
                            />
                            <div className='flex flex-col justify-center items-center min-h-[300px] space-y-8
                    border-dashed border-[2px] bg-richblack-700 border-richblack-500 rounded-md
                    '>
                                <div className='text-5xl bg-richblack-900 w-max p-2 rounded-full
                        text-yellow-100
                        '>
                                    <AiOutlineCloudUpload />
                                </div>
                                <div className='text-center'>
                                    <p>Drag and drop an image, or</p>
                                    <p>Click to <span
                                        className='text-yellow-100 font-semibold'
                                    >Browse</span> a file</p>
                                </div>
                                <ul className='flex flex-row items-center list-disc 
                        marker:text-richblack-500 justify-around w-full'>
                                    <li>Aspect ratio 16:9</li>
                                    <li>Recommended size 1024x576</li>
                                </ul>
                            </div>
                        </label>
                    )
                }
                {
                    ((userImage && userImage?.length !== 0)||(cloudinaryMedia))&&
                    <div className='flex flex-col gap-y-3
                    border-dashed border-[2px] bg-richblack-700 border-richblack-500 rounded-md
                    '>
                        <div
                            className='relative w-full h-full top-0 bottom-0
            px-1 pt-2
                                '>
                            {
                                (!isVideo)?(
                                    <img alt={registerValue} src={(userImage&&(userImage?.length !== 0))
                                    ?(URL.createObjectURL(userImage[0])):(cloudinaryMedia)}
                                    className='w-full h-full px-2'
                                />
                                ):(
                                    <div className='max-h-[500px] flex items-center justify-center'>
                                        <Player
                                        src={(userImage&&(userImage?.length !== 0))
                                            ?(URL.createObjectURL(userImage[0])):(cloudinaryMedia)}
                                        fluid={false}
                                        height={500} 
                                        width={800}
                                        />
                                    </div>
                                )
                            }
                        </div>
                        {
                            (editable)&&<button
                            onClick={(event) => {
                                setValue(registerValue, null);
                                if(setcloudinaryMedia){
                                    setcloudinaryMedia(null);
                                }
                            }}
                            type='button'
                            disabled={loading}
                            className='relative py-2 underline font-semibold'
                        >Cancel</button>
                        }
                    </div>
                }
                {
                    errors[registerValue]&& <span
                        className='text-xs text-red-500'
                    >{errors[registerValue].message}</span>
                }
            </div>
        </div>


    )
}

export default UploadFileModal;
