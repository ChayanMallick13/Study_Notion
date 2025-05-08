import React, { useState } from 'react'
import { BiSolidPencil } from 'react-icons/bi';
import { HiViewList } from 'react-icons/hi';
import { IoMdAdd, IoMdArrowDropdown } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TbMinusVertical } from 'react-icons/tb';
import DeleteSectionModal from './Modals/DeleteSectionModal';
import toast from 'react-hot-toast';
import { apiConnector } from '../../../../../Services/apiconnector';
import { coursesLinks } from '../../../../../Services/apis';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../reducer/Slices/CourseSlice';
import DeleteSubsectionModal from './Modals/DeleteSubsectionModal';

const SectionCard = ({ele,editSectionHandler,setLoading,loading}) => {
    const [dropDownVisible,setDropDownVisible] = useState(true);
    const [deleteModalVisible,setDeleteModalVisible] = useState(false);
    const [deleteSubSectionModalVisible,setDeleteSubSectionModalVisible] = useState(false);
    const {course} = useSelector(state => state.course);
    const [showDeleteSubsectionModal,setShowDeleteSubsectionModal] = useState(false); 
    const [editable,setEditable] = useState(false);
    const [subSectionDetails,setsubSectionDetails] = useState(null);
    const dispatch = useDispatch();
    const toogleDropSown = () =>{
        setDropDownVisible(prev => !prev);
    }

    // console.log(ele);

    const deleteSection = async() => {
        setLoading(true);
        const tid = toast.loading('Loading...');
        const body = new FormData();
        body.append('sectionId',ele._id);
        body.append('CourseId',course._id);
        console.log(ele._id,course._id);
        await apiConnector('PUT',coursesLinks.DELETE_SECTION,body).then(
            (res) => {
                dispatch(setCourse(res.data.course));
                toast.success('Section Deleted Successfully');
            }
        ).catch(
            (err) => {
                toast.error(err.response.data.message);
            }
        );
        setDeleteModalVisible(false);
        setLoading(false);
        toast.dismiss(tid);
    }

    const cancelDelete = () => {
        setDeleteModalVisible(false);
    }

    const showDeleteModal = () => {
        setDeleteModalVisible(true);
    }

    const openAddSubsectionModal = (section,subsetion=null,edit=true) => {
        setEditable(edit);
        setsubSectionDetails(subsetion);
        setShowDeleteSubsectionModal(true);
    }

    const closeModal = () => {
        setEditable(false);
        setsubSectionDetails(null);
        setShowDeleteSubsectionModal(false);
    }

    const createSubSectionHandler = async (formData) => {
        if(subSectionDetails){
            if(!formData.lectureVideo
                && (formData.lectureTitle===subSectionDetails.title)
                && (formData.lectureDescription===subSectionDetails.description)
            ){
                toast.error('No Chnages Made To Form');
                return;
            }
        }
        const tid = toast.loading('Loading...');
        setLoading(true);
        const body = new FormData();
        body.append('title',formData.lectureTitle);
        body.append('description',formData.lectureDescription);
        body.append('LectureVideo',(formData.lectureVideo && formData.lectureVideo.length > 0)?(formData.lectureVideo[0]):(null));
        body.append('sectionId',ele._id);
        body.append('courseId',course._id);
        if(subSectionDetails){
            body.append('SubSectionId',subSectionDetails._id);
            await apiConnector('POST',coursesLinks.UPDATE_SUBSECTION,body).then(
                (res) => {
                    dispatch(setCourse(res.data.course));
                    toast.success('Updated SubSection Successfully');
                }
            ).catch(
                (err) =>{
                    toast.error(err.response.data.message);
                }
            )
        }
        else{
            await apiConnector('POST',coursesLinks.CREATE_SUBSECTION,body).then(
                (res) => {
                    dispatch(setCourse(res.data.course));
                    toast.success('Added a SubSection Successfully');
                }
            ).catch(
                (err) =>{
                    toast.error(err.response.data.message);
                }
            )
        }
        closeModal();
        setLoading(false);
        toast.dismiss(tid);
    }

    const deleteSubsection = async() => {
        const tid = toast.loading('Loading...');
        setLoading(true);
        const body = new FormData();
        body.append('sectionId',ele._id);
        body.append('SubSectionId',subSectionDetails._id);
        body.append('courseId',course._id);
        await apiConnector('POST',coursesLinks.DELETE_SUBSECTION,body).then(
            (res) => {
                dispatch(setCourse(res.data.course));
                toast.success('Successfully Deleted The Lecture');
            }
        ).catch(
            (err) => {
                toast.error(err.response.data.message);
            }
        )
        setLoading(false);
        setDeleteSubSectionModalVisible(false);
        toast.dismiss(tid);
    }

    const cancelDeleteSubsection = () => {
        setDeleteSubSectionModalVisible(false);
        setsubSectionDetails(null);
    }

    const showSubSectionDeleteModal = (subsec) => {
        setsubSectionDetails(subsec);
        setDeleteSubSectionModalVisible(true);
    }   




    


    return (
        <div >
            <div className='w-full flex justify-between border-b-[0.05rem] border-b-richblack-400 pb-3'>
                <div className='flex gap-x-3 items-center text-xl '>
                    <button className='flex items-center text-2xl font-bold'
                        onClick={toogleDropSown} disabled={loading}
                    >
                        <IoMdArrowDropdown />
                        <HiViewList />
                    </button>
                    <p>
                        {ele.SectionName}
                    </p>
                </div>
                <div className='flex gap-x-2 text-2xl text-richblack-300 items-center'>
                    <button
                        onClick={() => {
                            editSectionHandler(ele.SectionName, ele._id);
                        }} disabled={loading}
                    >
                        <BiSolidPencil />
                    </button>
                    <button onClick={showDeleteModal} disabled={loading}>
                        <RiDeleteBin6Line />
                    </button>
                    <span>
                        <TbMinusVertical className='text-3xl'/>
                    </span>
                    <button
                        onClick={toogleDropSown} disabled={loading}
                    >
                        <IoMdArrowDropdown />
                    </button>
                </div>
            </div>
            <div className={`w-full ${(!dropDownVisible) ? ('hidden') : ('visible')} flex flex-col px-8`}>
                {
                    ele.subSections.map((subSec,ind) => {
                        return <div key={ind}
                            className='w-[90%]] flex justify-between border-b-[0.05rem] border-b-richblack-400 py-3'>
                            <button 
                            onClick={() => {
                                openAddSubsectionModal(ele,subSec,false);
                            }}  disabled={loading}
                            className='flex gap-x-3 items-center text-lg w-full'>
                                <p className='flex items-center text-2xl font-bold'>
                                    <IoMdArrowDropdown />
                                    <HiViewList />
                                </p>
                                <p>
                                    {subSec.title}
                                </p>
                            </button>
                            <div className='flex gap-x-2 text-2xl text-richblack-300 items-center'>
                                <button disabled={loading}
                                onClick={() => {
                                    openAddSubsectionModal(ele,subSec,true);
                                }}
                                >
                                    <BiSolidPencil />
                                </button>
                                <button disabled={loading}
                                onClick={() => {
                                    showSubSectionDeleteModal(subSec);
                                }}
                                >
                                    <RiDeleteBin6Line />
                                </button>
                            </div>
                        </div>
                    })
                }
                <button className='flex items-center text-lg pt-5 pb-5 text-yellow-100 font-extrabold'
                onClick={() => {
                    openAddSubsectionModal(ele);
                }} disabled={loading}
                >
                    <IoMdAdd className='text-3xl font-extrabold' />
                    <span>Add Lecture</span>
                </button>
            </div>
            {
                (deleteModalVisible)&&<DeleteSectionModal
                    heading={'Delete this Section ?'}
                    title={'All The Lectures in this section will be deleted'}
                    onCancel={cancelDelete}
                    onDeletion={deleteSection}
                    disabled={loading}
                />
            }
            {
                ((!deleteModalVisible)&&(deleteSubSectionModalVisible))&&<DeleteSectionModal
                    heading={'Delete this Sub-Section ?'}
                    title={'This Lectures will be deleted'}
                    onCancel={cancelDeleteSubsection}
                    onDeletion={deleteSubsection}
                    disabled={loading}
                />
            }
            {
                (!deleteModalVisible)&&(showDeleteSubsectionModal)&&<DeleteSubsectionModal
                    setShowDeleteSubsectionModal={setShowDeleteSubsectionModal}
                    showDeleteSubsectionModal={showDeleteSubsectionModal}
                    editable={editable}
                    setEditable={setEditable}
                    setsubSectionDetails={setsubSectionDetails}
                    subSectionDetails={subSectionDetails}
                    closeModal={closeModal}
                    createSubSectionHandler={createSubSectionHandler}
                    loading={loading}
                />
            }
        </div>
    )
}

export default SectionCard
