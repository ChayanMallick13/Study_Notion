import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const InstructionForm = ({errors,setValue,getValues}) => {
    const [instructions,setInstructions] = useState([]);
    const [instruction,setInstruction] = useState('');

    const {editCourse} = useSelector(state => state.course);

    useEffect(
        () => {
            if(editCourse){
                const List = getValues('instructions');
                setInstructions(List);
            }
        },[]
    )
  return (
    <div>
        <label>
            <p 
            className='text-white text-[15px] mb-3 font-bold'
            >Requirements/Instructions <sup
            className='text-red-500 text-[12px]'
            >*</sup></p>
            <input
                type='text'
                value={instruction}
                onChange={(event) => {
                    setInstruction(event.target.value);
                }}
                className='w-full bg-richblack-700 border-b-2 border-b-richblack-500
                        rounded-lg px-3 py-3 text-white outline-none
                        '
                onKeyDown={(event) => {
                    if(event.key==='Enter'){
                        event.preventDefault();
                    }
                }}
            />
            {
                errors.instructions && <div className='text-xs text-red-500 mt-1'>
                {errors.instructions.message}</div>
            }
        </label>
        <div>
            <button 
            type='button'
            onClick={(event)=>{
                event.preventDefault();
                if(!instruction || instructions.includes(instruction))
                    return;
                const newList = [...instructions,instruction];
                setInstructions(newList);
                setValue('instructions',newList);
                setInstruction('');
            }}
            className='font-extrabold text-yellow-100 mt-4'
            >Add</button>
        </div>
        <div>
            {
                instructions.map((ins,ind)=>{
                    return <div key={ind} className='flex gap-x-2 mt-2'>
                        <span
                        className='text-white font-semibold'
                        >{ins}</span>
                        <button 
                        type='button'
                        onClick={(event) => {
                            const newList = instructions.filter(ele => ele!==ins);
                            setInstructions(newList);
                            setValue('instructions',newList);
                            
                        }}
                        className='text-sm'
                        >
                            clear
                        </button>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default InstructionForm
