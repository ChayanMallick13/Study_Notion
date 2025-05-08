import React, { useState } from 'react'
import { BiSolidPencil } from 'react-icons/bi';
import { FaPen } from 'react-icons/fa';
import { HiViewList } from 'react-icons/hi';
import { IoMdAdd, IoMdArrowDropdown } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbMinusVertical } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import SectionCard from './SectionCard';

const NestedView = ({ setValue,setEditSectionName,loading,setLoading }) => {
    const { course } = useSelector(state => state.course);

    const editSectionHandler = (secName,secId) => {
        setValue('sectionName',secName);
        setValue('sectionId',secId);
        setEditSectionName(true);
    }

    return (
        <div className='bg-richblack-700 px-9 py-5 flex flex-col gap-y-3 mt-10 rounded-xl mb-10'>
            {
                course.courseContent.map((ele,ind) => {
                    return <SectionCard
                        ele={ele}
                        key={ind}
                        editSectionHandler={editSectionHandler}
                        loading={loading}
                        setLoading={setLoading}
                    />
                })
            }
        </div>
    )
}

export default NestedView;
