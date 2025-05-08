import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { apiConnector } from '../../../../../Services/apiconnector';
import { categories } from '../../../../../Services/apis';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import TagsForm from './TagsForm';
import InstructionForm from './InstructionForm';
import { setStep } from '../../../../../reducer/Slices/CourseSlice';
import { FaAngleRight } from 'react-icons/fa';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { createCourse, editCourseDetails } from '../../../../../Services/Operations/Course_Apis';
import Loader from '../../../../Common/Loader';
import UploadFileModal from '../UploadFileModal';

function CourseInfoForm() {
    const {
        register,
        setValue,
        watch,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { course, editCourse, step } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [allCategorys, setallCategorys] = useState([]);
    const [checkFile,setCheckFile] = useState(null);

    async function urlToFile(url, filename, mimeType) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, { type: mimeType });
    }

    async function fetchSublinksData() {
        setLoading(true);
        try {
            const sublinksdata = await apiConnector('GET', categories.CATEGORY_API);
            setallCategorys(sublinksdata.data.Categorys);
        }
        catch (err) {
            console.log('error in fetching sublink data');
            console.error(err);
        }
        setLoading(false);
    }
      

    // console.log(course);

    useEffect(
        () => {
            register('tags', { required: { value: true, message: 'Tags is Required' } });
            register('instructions',
                { required: { value: true, message: 'Instructions Are Required' } });
            if (course) {
                setValue("courseName", course.courseName);
                setValue('CourseDescription', course.CourseDescription);
                setValue('price', course.price);
                setValue('Category', course.Category.name);
                setValue('tags', course.tags);
                setValue('whatYouWillLearn', course.whatYouWillLearn);
                setValue('instructions', course.instructions);
                urlToFile(course.thumnail, 'thumnail.jpg', 'image/jpeg')
                    .then((file) => {
                        setValue('thumnail',[file]);
                        setCheckFile(file);
                    })
                    .catch((error) => {
                        console.error('Error converting URL to File:', error);
                    });
            }
            fetchSublinksData();
        }, []
    );
    const userImage = watch('thumnail');

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (!course) {
            return false;
        }
        if (
            currentValues.courseName !== course.courseName ||
            currentValues.thumnail[0] !== checkFile ||
            currentValues.price !== course.price ||
            currentValues.CourseDescription !== course.CourseDescription ||
            currentValues.Category !== course.Category.name ||
            currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
            currentValues.instructions.toString() !== course.instructions.toString()  ||
            currentValues.tags.toString()  !== course.tags.toString()  

        ) {
            return true;
        }
        else {
            return false;
        }
    }

    const onSubmit = (currentData) => {
        const formUpdated = isFormUpdated();
        if (editCourse && !formUpdated) {
            toast.error('No Changes Made to Form');
            return;
        }
        const formdata = new FormData();
        Object.entries(currentData).forEach(([key, value]) => {
            if (key === 'thumnail') {
                formdata.append(key, value[0]);
            }
            else if (key === 'tags' || key === 'instructions') {
                formdata.append(key, JSON.stringify(value));
            }
            else {
                formdata.append(key, value);
            }
        });

        if (editCourse) {
            formdata.append('status',course.status);
            dispatch(editCourseDetails(course._id, setLoading, formdata));
        }
        else {
            dispatch(createCourse(formdata, setLoading));
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='rounded-md border-richblack-700 text-richblack-500 bg-richblack-800 p-6 
        space-y-8 border-[1px]'
        >
            <div>
                <label htmlFor='courseName'>
                    <p
                        className='text-white text-[15px] mb-3 font-bold'
                    >Course Title <sup
                        className='text-red-500 text-[12px]'
                    >*</sup></p>
                    <input
                        type='text'
                        id='courseName'
                        placeholder='Enter Course Title'
                        {...register('courseName',
                            { required: { value: true, message: 'Course Name is Required' } })}
                        className='w-full bg-richblack-700 border-b-2 border-b-richblack-500
                        rounded-lg px-3 py-3 text-white outline-none
                        '
                    />
                    {
                        errors.courseName && <span
                            className='text-xs text-red-500'
                        >{errors.courseName.message}</span>
                    }
                </label>
            </div>
            <div>
                <label htmlFor='CourseDescription'>
                    <p
                        className='text-white text-[15px] mb-3 font-bold'
                    >Course Short Description <sup
                        className='text-red-500 text-[12px]'
                    >*</sup></p>
                    <textarea
                        type='text'
                        id='CourseDescription'
                        placeholder='Enter Description'
                        {...register('CourseDescription',
                            { required: { value: true, message: 'Course Description is Required' } })}
                        className='w-full bg-richblack-700 border-b-2 border-b-richblack-500
                        rounded-lg px-3 py-3 min-h-[130px] h-[130px] text-white outline-none
                        '
                    />
                    {
                        errors.CourseDescription && <span
                            className='text-xs text-red-500'
                        >{errors.CourseDescription.message}</span>
                    }
                </label>
            </div>
            <div className='text-white'>
                <label htmlFor='price'>
                    <p
                        className='text-white text-[15px] mb-3 font-bold'
                    >Course Price <sup
                        className='text-red-500 text-[12px]'
                    >*</sup></p>
                    <div className='h-full relative'>
                        <div
                            className='bg-richblack-700 flex
                            items-center px-4 text-white text-[15px] mb-3 font-bold
                            absolute top-0 bottom-0 rounded-lg text-2xl justify-center pt-2
                            '>
                            <HiOutlineCurrencyRupee className='text-2xl text-richblack-500' />
                        </div>
                        <input
                            id='price'
                            type='number'
                            placeholder='Enter Course Price'
                            {...register('price', {
                                required: { value: true, message: 'Course Price is Required' },
                                valueAsNumber: { value: true, message: 'Invalid Price' },
                                min: { value: 0, message: 'Price Cannot be Negative' },
                            })}
                            className='w-full bg-richblack-700 border-b-2 border-b-richblack-500
                        rounded-lg px-3 py-3 text-white outline-none pl-14
                        '
                        />
                    </div>
                    {
                        errors.price && <span
                            className='text-xs text-red-500'
                        >{errors.price.message}</span>
                    }
                </label>
            </div>

            <div>
                <label htmlFor='Category'>
                    <p
                        className='text-white text-[15px] mb-3 font-bold'
                    >Course Category <sup
                        className='text-red-500 text-[12px]'
                    >*</sup></p>
                    <select
                        id='Category'
                        {...register('Category',
                            {
                                required: { value: true, message: 'Choose a Category' },
                                validate: (value) => {
                                    return value !== 'Choose a Category' || 'Please Choose a Category';
                                },
                            })}
                        className='w-full bg-richblack-700 border-b-2 border-b-richblack-500
                        rounded-lg px-3 py-3 text-white outline-none
                        '
                        defaultValue={'Choose a Category'}
                    >
                        <option value={'Choose a Category'} disabled>Choose a Category</option>
                        {
                            (!loading) && allCategorys.map((cat, ind) => {
                                return <option key={ind} value={cat.name}>
                                    {
                                        cat.name
                                    }
                                </option>
                            })
                        }


                    </select>
                    {
                        errors.Category && <span
                            className='text-xs text-red-500'
                        >{errors.Category.message}</span>
                    }
                </label>
            </div>

            {/* Create a Custom Component for tags  */}
            <TagsForm
                setValue={setValue}
                errors={errors}
                getValues={getValues}
            />

            <UploadFileModal
                errors={errors}
                register={register}
                setValue={setValue}
                title={'Course Thumbnail'}
                userImage={userImage}   
                SupportedFiletypes={'.jpg,.jpeg,.png,.webp'}
                reqErrorMsg={'Thumbnail is Required'}
                registerValue={'thumnail'}
            />

            <div>
                <label htmlFor='whatYouWillLearn'>
                    <p
                        className='text-white text-[15px] mb-3 font-bold'
                    >Benefits of the Course <sup
                        className='text-red-500 text-[12px]'
                    >*</sup></p>
                    <textarea
                        type='text'
                        id='whatYouWillLearn'
                        placeholder='Enter Benefits of the Course'
                        {...register('whatYouWillLearn',
                            { required: { value: true, message: 'Benefits of the Course is Required' } })}
                        className='w-full bg-richblack-700 border-b-2 border-b-richblack-500
                        rounded-lg px-3 py-3 min-h-[130px] h-[130px] text-white outline-none
                        '
                    />
                    {
                        errors.whatYouWillLearn && <span
                            className='text-xs text-red-500'
                        >{errors.whatYouWillLearn.message}</span>
                    }
                </label>
            </div>

            <InstructionForm
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />


            <div>
                {
                    (editCourse) ? (
                        <div className='flex place-self-end gap-x-5'>
                            <button type='submit' onClick={
                                () => {
                                    dispatch(setStep(2));
                                }
                            }
                                className='bg-richblack-300 text-richblack-900
                            font-bold px-3 py-1 rounded-lg
                            '
                            >
                                Continue Without Saving
                            </button>
                            <button
                                type='submit'
                                className='flex items-center gap-x-1 bg-yellow-100 px-5 py-3
                        font-extrabold text-richblack-900 text-lg rounded-lg'>
                                <span>Save Changes</span>
                                <FaAngleRight />
                            </button>
                        </div>
                    ) : (
                        <button className='flex items-center gap-x-1 bg-yellow-100 px-5 py-1
                        font-extrabold text-richblack-900 place-self-end text-lg rounded-lg
                        '
                            type='submit'
                        >
                            <span>Next</span>
                            <FaAngleRight />
                        </button>
                    )
                }
            </div>

        </form>
    )
}

export default CourseInfoForm
