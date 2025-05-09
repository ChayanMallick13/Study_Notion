import React from 'react'
import ContactusDetails from '../Components/ContactUsPage/ContactusDetails';
import ContactUsForm from '../Components/Common/ContactUsForm';
import Footer from '../Components/Common/Footer';
import ConfirmModal from '../Components/Common/ConfirmModal';
import LearnersReviewSlider from '../Components/Common/LearnersReviewSlider';

const ContactUsPage = () => {
  return (
    <div className='w-screen bg-richblack-900'>
        <div className='w-11/12 max-w-max text-white mx-auto'>

            <div className='flex lg:flex-row flex-col gap-y-10 gap-x-9 mt-[5rem] justify-center'>
                <ContactusDetails/>
                <div className='lg:w-[50%] w-[100%] lg:px-16 px-4 py-10 border-[1px] rounded-2xl border-richblack-600'>
                    <h3 className='text-4xl'>Got a Idea? We've got the skills. Let's team up</h3>
                    <p className='text-richblack-400 font-medium pt-4 mb-10'>Tell us more about yourself and what you're got in mind.</p>
                    <div className='text-lg'>
                        <ContactUsForm/>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center mt-20 mb-20'>
                <h3 className='text-4xl'>Reviews from other learners</h3>

                {/* slider  */}
            </div>

            <div className='w-[90vw] mx-auto'>
                <LearnersReviewSlider/>
            </div>

        </div>

        {/* footer  */}
        <Footer/>
        
    </div>
  )
}

export default ContactUsPage;
