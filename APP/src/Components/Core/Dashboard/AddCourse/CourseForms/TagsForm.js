import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { useSelector } from 'react-redux';

const TagsForm = ({ setValue, errors, register , getValues }) => {

    const [tagsList, setTagsList] = useState([]);

    const {editCourse} = useSelector(state => state.course);

    useEffect(
        () => {
            if(editCourse){
                const List = getValues('tags');
                setTagsList(List);
            }
        },[]
    )

    return (
        <div>
            <p
                className='text-white text-[15px] mb-3 font-bold'
            >Tags <sup
                className='text-red-500 text-[12px]'
            >*</sup></p>
            <div className='text-white flex gap-x-2 w-full flex-wrap pb-2'>
                {
                    tagsList.map((ele, ind) => {
                        return <div key={ind} className='flex gap-x-1 items-center
                        bg-yellow-300 px-3 py-1 rounded-full
                        '>
                            <span>{ele}</span>
                            <button
                                type='button'
                                onClick={(event) => {
                                    const newList = tagsList.filter(tag => tag !== ele);
                                    setTagsList(newList);
                                    setValue('tags', newList);
                                }}>
                                <IoClose />
                            </button>
                        </div>
                    })
                }
            </div>
            <div>
                <label>

                    <input
                        type='text'
                        placeholder='Write Tag and Press Enter or Enter comma'
                        onKeyDown={(event) => {
                            // console.log(event.key);
                            if (event.key === 'Enter' || event.key === ',') {
                                event.preventDefault();
                                const value = event.target.value;
                                if (value && !tagsList.includes(value)) {
                                    event.target.value = '';
                                    const newList = [...tagsList,value];
                                    setTagsList(newList);
                                    setValue('tags',newList);
                                }
                            }
                        }}
                        className='w-full bg-richblack-700 border-b-2 border-b-richblack-500
                        rounded-lg px-3 py-3 text-white outline-none
                        '
                    />
                    {
                        errors?.tags && <div
                        className='text-xs text-red-500'
                        >{errors?.tags?.message}</div>
                    }
                </label>
            </div>
        </div>
    )
}

export default TagsForm;
