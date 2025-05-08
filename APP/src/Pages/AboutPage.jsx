import React from 'react'
import HighlightText from '../Components/Core/HomePage/HighlightText';
import bannerImg1 from '../assets/Images/aboutus1.webp';
import bannerImg2 from '../assets/Images/aboutus2.webp';
import bannerImg3 from '../assets/Images/aboutus3.webp';
import foundingimg from '../assets/Images/FoundingStory.png';
import StatsComponent from '../Components/Core/AboutPage/StatsComponent';
import LearningGrid from '../Components/Core/AboutPage/LearningGrid';
import ContactUsForm from '../Components/Common/ContactUsForm';
import Footer from '../Components/Common/Footer';
import LearnersReviewSlider from '../Components/Common/LearnersReviewSlider';

const AboutPage = () => {
    return (
        <div>

            {/* Section 1 */}
            <section className='w-full bg-richblack-700'>

                <div className='text-white w-10/12 mx-auto max-w-max pt-10'>
                    <header className='text-center
                text-4xl font-bold relative top-8
                '>Driving Innovation in Online Education for a <br /><HighlightText
                            color='font-bold bg-gradient-to-b from-blue-200 to-caribbeangreen-25 text-transparent bg-clip-text'
                            text={'Brighter Future'} />
                        <p className='text-[17px] text-richblack-200 font-normal leading-6
                    md:max-w-[58%] max-w-full mx-auto relative top-5
                    '>
                            Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </header>

                    <div className='flex gap-x-12 justify-center relative top-[92px] gap-y-10 flex-row flex-wrap'>

                        <img alt='aboutimg' src={bannerImg1} />
                        <img alt='aboutimg' src={bannerImg2} />
                        <img alt='aboutimg' src={bannerImg3} />

                    </div>

                </div>

                <div className='w-full bg-richblack-900 text-white pt-[10rem]'>
                    <div className='md:w-10/12 mx-auto relative text-4xl font-extrabold
                md:max-w-[70%] max-w-screen text-center w-screen px-1 pb-[5.5rem]
                '>
                        We are passionate about revolutionizing the way we learn.
                        Our innovative platform
                        <HighlightText text={'combines '} />,
                        <HighlightText text={'technology'} />,
                        <HighlightText color='bg-gradient-to-t from-yellow-300 via-orange-600 to-zinc-400 bg-clip-text text-transparent'
                            text={'expertise'} />, and community to create an
                        <HighlightText
                            color='bg-gradient-to-t from-yellow-300 via-amber-600 to-zinc-400 bg-clip-text text-transparent'
                            text={'unparalleled educational experience.'} />

                    </div>
                    <div className='w-screen border-b-[0.6px] border-b-richblack-600' />
                </div>

            </section>

            {/* Hero Section 1  */}
            <section className='w-full bg-richblack-900`'>

                <div className='w-10/12 max-w-max mx-auto py-[6rem]'>
                    <div className='flex lg:flex-row flex-col-reverse justify-between
                    w-full gap-y-9 gap-x-5 lg:px-10 px-1 text-richblack-300 font-medium'>
                        <div className='lg:w-[48%] w-[100%] flex flex-col gap-y-4 text-lg'>
                            <h2 className='text-4xl font-extrabold'><HighlightText
                                text={'Our Founding Story'}
                                color='bg-gradient-to-tl from-indigo-500 via-red-500 to-blue-500 text-transparent bg-clip-text'
                            /></h2>
                            <p>
                                Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p>
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                            </p>
                        </div>
                        <div className='lg:w-[50%] w-[100%]'>
                            <img alt='herosection1' src={foundingimg} 
                            className='shadow-[0px_0px_50px_15px_rgba(247,_139,_52,_0.3)]
                            '/>
                        </div>
                    </div>

                    <div className='flex md:flex-row flex-col justify-between 
                    gap-y-9 w-full mt-28 md:px-16 px-1 text-richblack-300 font-medium'>
                        <div className='md:w-[40%] w-[100%] flex flex-col gap-y-8'>
                            <h2 className='text-4xl font-extrabold'>
                                <HighlightText 
                                color='bg-gradient-to-tl from-amber-500 via-orange-500 to-orange-600 bg-clip-text text-transparent'
                                text={'Our Vision'}/>
                            </h2>

                            <p>
                            With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                            </p>
                        </div>

                        <div className='md:w-[40%] w-[100%] flex flex-col gap-y-7'>
                            <h2 className='text-4xl font-extrabold'>
                                <HighlightText text={'Our Mission'}/>
                            </h2>
                            <p>
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>

                {/* stats section  */}
                <div className='bg-richblack-700 w-full'>
                    <div className='w-10/12 mx-auto md:px-[3rem] px-2 py-6'>
                    <StatsComponent/>
                    </div>
                </div>

            </section>

            {/* grid form and slider  */}
            <section className='w-full'>

                <div className='bg-richblack-900 text-white max-w-max w-3/4 xl:w-10/12 mx-auto lg:px-16 px-0 mt-[10rem]'>

                    <LearningGrid/>

                </div>

                <div className='bg-richblack-900 text-white w-10/12 mx-auto mt-[10rem]'>
                    <h2 className='text-center text-4xl font-extrabold pb-3'>Get in Touch</h2>
                    <p className='text-richblack-300 font-semibold text-center'>We'd love to here for you, Please fill out this form.</p>
                    <div className='lg:max-w-[475px] max-w-[375px] mx-auto mt-12 pb-20'>
                        <ContactUsForm/>
                    </div>
                </div>


                <div className='bg-richblack-900 text-white w-10/12 mx-auto mt-[1rem] flex flex-col items-center mb-10'>
                    <h3 className='text-4xl'>Reviews from other learners</h3>
                    {/* Slider  */}
                </div>

                <div className='w-[90vw] mx-auto'>
                    <LearnersReviewSlider/>
                </div>

            </section>


            {/* Footer  */}
            <Footer/>

        </div>
    )
}

export default AboutPage;
