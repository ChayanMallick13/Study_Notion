import React, { useEffect, useState } from 'react';
import countrycodes from '../../data/countrycode.json';
import { useForm } from 'react-hook-form';
import { Contact_US } from '../../Services/apis';
import { apiConnector } from '../../Services/apiconnector';
import toast from 'react-hot-toast';


function ContactUsForm() {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    useEffect(
        () => {
            if (isSubmitSuccessful) {
                reset({
                    email: '',
                    firstName: '',
                    lastName: '',
                    message: '',
                    countryCode: '+91',
                    contactNo:'',
                })
            }
            else{
                reset({
                    countryCode:'+91',
                })
            }
        }, [isSubmitSuccessful, reset]
    );
    const submitContactForm = async (data) => {
        data.phoneNumber = data.countryCode+data.contactNo;
        // console.log(data);
        setLoading(true);
        const toastid = toast.loading('Loading...');
        try {
            const backendRes = await apiConnector('POST', Contact_US.CONTACT_US_LINK, data);
            if (backendRes.data.success) {
                toast.success('Message Sent');
            }
            else {
                throw new Error("Error");
            }
        } catch (error) {
            toast.error('Error in Sending Message to Team');
        }
        setLoading(false);
        toast.dismiss(toastid);
    }


    return (
        <div>

            <form className='flex flex-col gap-y-8'
                onSubmit={handleSubmit(submitContactForm)}
            >
                <div className='flex flex-col lg:flex-row gap-x-4 gap-y-8'>

                    <label htmlFor='firstName' className='w-full'>

                        <p
                            className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                        >First Name</p>

                        <input
                            type='text'
                            placeholder='Enter First Name'
                            id='firstName'
                            {...register('firstName', { required: true })}
                            className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 
                            p-[12px] border-b-[0.8px] border-b-richblack-200'
                        ></input>
                        {
                            errors.firstName && (
                                <span className='text-yellow-5/70 text-xs'>Please Enter Your FirstName</span>
                            )
                        }

                    </label>

                    <label htmlFor='lastName' className='w-full'>

                        <p
                            className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                        >Last Name</p>

                        <input
                            type='text'
                            placeholder='Enter Last Name'
                            id='lastName'
                            {...register('lastName')}
                            className='w-full bg-richblack-700 rounded-[0.5rem] 
                            text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
                        ></input>

                    </label>

                </div>


                <label htmlFor='email' className='w-full'>

                    <p
                        className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                    >Email Address</p>

                    <input
                        type='email'
                        placeholder='Enter Email Address'
                        id='email'
                        {...register('email', { required: true })}
                        className='w-full bg-richblack-700 rounded-[0.5rem] 
                        text-richblack-5 p-[12px] border-b-[0.8px] border-b-richblack-200'
                    ></input>

                    {
                        errors.email && <span className='text-yellow-5/70 text-xs'>Enter Your Email</span>
                    }

                </label>

                <label className='w-full'>

                    <p
                        className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                    >Phone Number</p>

                    <div className='flex lfg:gap-x-6 gap-x-2'>
                        <select
                            id='countryCode'
                            {...register('countryCode',{required:{value:true,message:'Country Code in Required'}})}

                            className='lg:w-[85px] w-[26.5%] bg-richblack-700 rounded-[0.5rem] text-richblack-5 
                            p-[12px] border-b-[0.8px] border-b-richblack-200'
                        >
                            {
                                countrycodes.map((ele, ind) => {
                                    return (<option key={ind} value={ele.code}>
                                        {ele.code + ' -' + ele.country}
                                    </option>);
                                })
                            }

                        </select>

                        {
                            errors.countryCode && <span className='text-yellow-5/70 text-xs'>{errors.countryCode.message}</span>
                        }

                        <input
                            type='number'
                            inputMode='tel'
                            placeholder='Enter Phone Number'
                            id='contactNo'
                            {...register('contactNo',{
                                required:{value:true,message:'Contact Number is Required'},
                                minLength:{value:10,message:'Invalid Phone Number'},
                                maxLength:{value:12,message:'Invalid Phone Number'}
                            })}
                            className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 p-[12px] 
                            border-b-[0.8px] border-b-richblack-200'
                        ></input>
                    </div>

                        {
                            errors.contactNo && <span className='text-yellow-5/70 text-xs'>{errors.contactNo.message}</span>
                        }   

                </label>

                <label htmlFor='message'>

                    <p
                        className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
                    >Message</p>

                    <textarea
                        placeholder='Enter Your Message Here'
                        rows={5}
                        id='message'
                        {...register('message', { required: true })}
                        className='w-full bg-richblack-700 rounded-[0.5rem] text-richblack-5 
                        p-[12px] border-b-[0.8px] border-b-richblack-200'
                    ></textarea>

                    {
                        errors.message && <span className='text-yellow-5/70 text-xs'>Message is Required</span>
                    }

                </label>


                <button
                    type='submit'
                    className={`text-center md:text-[15px] text-[10px] px-6 py-3 rounded-md font-bold
                text-black ${(loading)?
                ('bg-richblack-400 select-none cursor-not-allowed pointer-events-none')
                :('bg-yellow-50')}
                    hover:scale-95 transition-all duration-200
                `}>
                    Send Message
                </button>
            </form>

        </div>
    )
}

export default ContactUsForm;
