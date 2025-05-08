import React, { useEffect, useState } from 'react'
import UploadFileModal from '../../UploadFileModal';
import { useForm } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';

const DeleteSubsectionModal = ({ showDeleteSubsectionModal, setShowDeleteSubsectionModal, subSectionDetails, setsubSectionDetails
    , editable, setEditable, closeModal, createSubSectionHandler, loading }) => {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm();
      
      

    const userImage = watch('lectureVideo');
    const [cloudinaryMedia,setcloudinaryMedia] = useState(null);

    useEffect(
        () => {
            if (subSectionDetails) {
                setValue('lectureTitle', subSectionDetails.title);
                setValue('lectureDescription', subSectionDetails.description);
                setcloudinaryMedia(subSectionDetails.videoUrl);
            }
            setValue('lectureVideo',null);
        }, [showDeleteSubsectionModal, subSectionDetails,setValue]
    )

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-richblack-700/70 z-30 flex items-center justify-center
    overflow-y-auto py-4
    '>

            <div className='max-w-[800px] w-full bg-richblack-800 text-white flex flex-col gap-y-8 
        rounded-xl border-[0.5px] border-richblack-400 absolute top-16'>
                <div className='flex justify-between items-center text-2xl font-bold 
                bg-richblack-700 py-6 px-6 rounded-xl rounded-b-none'>
                    <p>{(editable) ? ((subSectionDetails)?('Editing Lecture'):('Adding Lectures')) : ('Viewing Lecture')}</p>
                    <button onClick={closeModal} disabled={loading}><IoMdClose /></button>
                </div>
                <div className='px-8 py-6'>
                    <form onSubmit={handleSubmit(createSubSectionHandler)}
                        className='flex flex-col gap-y-9'
                    >
                        <UploadFileModal
                            SupportedFiletypes={'.mp4,,gif'}
                            errors={errors}
                            register={register}
                            registerValue={'lectureVideo'}
                            reqErrorMsg={'Lecture Video is Required'}
                            setValue={setValue}
                            title={'Lecture Video'}
                            userImage={userImage}
                            editable={editable}
                            isVideo={true}
                            cloudinaryMedia={cloudinaryMedia}
                            setcloudinaryMedia={setcloudinaryMedia}
                            loading={loading}
                        />
                        <div>
                            <label htmlFor='lectureTitle'>
                                <p
                                    className='text-white text-[15px] mb-3 font-bold'
                                >Lecture Title {(editable) && <sup
                                    className='text-red-500 text-[12px]'
                                >*</sup>}</p>
                                <input
                                    type='text'
                                    disabled={!editable}
                                    id='lectureTitle'
                                    placeholder='Enter Lecture Title'
                                    {...register('lectureTitle',
                                        { required: { value: true, message: 'Lecture Title is Required' } })}
                                    className='w-full bg-richblack-700 border-b-2 border-b-richblack-500
                        rounded-lg px-3 py-3 text-white outline-none
                        '
                                />
                                {
                                    errors.lectureTitle && <span
                                        className='text-xs text-red-500'
                                    >{errors.lectureTitle.message}</span>
                                }
                            </label>
                        </div>
                        <div>
                            <label htmlFor='lectureDescription'>
                                <p
                                    className='text-white text-[15px] mb-3 font-bold'
                                >Lecture Description <sup
                                    className='text-red-500 text-[12px]'
                                >*</sup></p>
                                <textarea
                                    type='text'
                                    disabled={!editable}
                                    id='lectureDescription'
                                    placeholder='Enter Lecture Description'
                                    {...register('lectureDescription',
                                        { required: { value: true, message: 'Lecture Description is Required' } })}
                                    className='w-full bg-richblack-700 border-b-2 border-b-richblack-500
                        rounded-lg px-3 py-3 min-h-[130px] h-[130px] text-white outline-none
                        '
                                />
                                {
                                    errors.lectureDescription && <span
                                        className='text-xs text-red-500'
                                    >{errors.lectureDescription.message}</span>
                                }
                            </label>
                        </div>
                        {
                            (editable) && <button type='submit'
                                disabled={loading}
                                className='bg-yellow-100 text-black px-4 py-2 flex place-self-end rounded-lg
                        font-semibold text-lg
                        '>
                                {(loading) ? ('Loading...') : ((subSectionDetails)?('Save Changes'):('Save'))}
                            </button>
                        }
                    </form>
                </div>
            </div>

        </div>
    )
}

export default DeleteSubsectionModal;
