import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import HighlightText from '../Components/Core/HomePage/HighlightText';
import CTAButton from '../Components/Core/HomePage/CTAButton';
import bannerVideo from '../assets/Images/banner.mp4';
import CodeBlocks from '../Components/Core/HomePage/CodeBlocks';
import Frame from '../Components/Core/HomePage/Frame';
import Logo1 from '../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../assets/TimeLineLogo/Logo4.svg';
import SkillSectionCode from '../Components/Core/HomePage/SkillSectionCode';
import timelineImage from '../assets/Images/TimelineImage.png';
import herosectionimage1 from '../assets/Images/Know_your_progress.svg';
import herosectionimage2 from '../assets/Images/Compare_with_others.svg';
import herosectionimage3 from '../assets/Images/Plan_your_lessons.svg';
import teacherimg from '../assets/Images/Instructor.png';
import PowerOfCodeSection from '../Components/Core/HomePage/PowerOfCodeSection';
import Footer from '../Components/Common/Footer';
import LearnersReviewSlider from '../Components/Common/LearnersReviewSlider';


const Home = () => {
    return (
        <div className='relative z-0'>

            {/* Section 1 */}
            <div className='relative mx-auto flex flex-col items-center w-11/12 text-white justify-between
        max-w-maxContent
        '>

                <Link to={'/signup'}>

                    <div className='mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 flex justify-center items-center
            transition-all duration-200 hover:scale-95 w-fit mt-16 gap-2 px-10 py-[5px] hover:bg-richblack-900 border-richblack-800
            border-4 shadow-sm shadow-richblack-50 hover:shadow-none
            '>
                        <p>
                            Become an Instructor
                        </p>

                        <p>
                            <FaArrowRight />
                        </p>

                    </div>

                </Link>

                <div className='text-4xl text-center font-semibold mt-8'>
                    Empower Your Future with <HighlightText text={'Coding Skills'} />
                </div>

                <div className='font-bold max-w-[90%] text-center text-lg text-richblack-300 mt-4'>
                    With our online coding courses, you can learn at your own pace,
                    from anywhere in the world, and get access to a wealth of resources, including hands-on projects,
                    quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex gap-7 mt-16'>

                    <CTAButton linkto={'/signup'}>
                        Learn More
                    </CTAButton>

                    <CTAButton isBlack={true} linkto={'/login'}>
                        Book a Demo
                    </CTAButton>

                </div>



                <div className='mx-3 my-7 rounded-lg relative mt-16'>

                    <Frame
                        media={bannerVideo}
                        shadow={true}
                        topleft={false}
                        isvideo={true}
                    />

                </div>

                <div>

                    {/* Code Section 1  */}
                    <CodeBlocks
                        ctabtn1={
                            {
                                isBlack: false,
                                linkto: '/signup',
                                text: (
                                    <div className='flex items-center gap-2'>
                                        Try it Yourself
                                        <FaArrowRight />
                                    </div>
                                ),
                            }
                        }
                        ctabtn2={
                            {
                                isBlack: true,
                                linkto: '/login',
                                text: (
                                    <div className='flex items-center '>
                                        Learn More
                                    </div>
                                )
                            }
                        }
                        position={'lg:flex-row flex-col'}
                        heading={
                            <div className='text-4xl font-bold'>
                                Unlock your <HighlightText text={'coding potential'} /> with our online courses.
                            </div>
                        }
                        subheading={
                            'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'
                        }
                        codeblock={
                            `<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>\n</h1>\n</body>\n</html>`}

                        codecolor={'text-yellow-25'}

                        gradient={
                            'bg-gradient-to-r from-pink-200 to-yellow-400'
                        }

                    />

                    {/* Code Section 2  */}
                    <CodeBlocks
                        ctabtn1={
                            {
                                isBlack: false,
                                linkto: '/signup',
                                text: (
                                    <div className='flex items-center gap-2 '>
                                        Continue Lesson
                                        <FaArrowRight />
                                    </div>
                                ),
                            }
                        }
                        ctabtn2={
                            {
                                isBlack: true,
                                linkto: '/login',
                                text: (
                                    <div className='flex'>
                                        Learn More
                                    </div>
                                )
                            }
                        }
                        position={'lg:flex-row-reverse flex-col'}
                        heading={
                            <div className='text-4xl font-bold'>
                                Start <HighlightText text={'coding in seconds.'} />
                            </div>
                        }
                        subheading={
                            'Go ahead, give it a try. Our hands-on learning environment means you\'ll be writing real code from your very first lesson.'
                        }
                        codeblock={
                            `import React from"react";\nexport default function App(){\nreturn(\n<div>\n<header>\n<h1>My Site</h1>\n</header>\n<nav>\n<a href="/">Home</a>\n<a href="/blog">Blog</a>\n<a href="/about">About</a>\n</nav>\n</div>\n);`}

                        codecolor={'text-white'}

                        gradient={
                            'bg-blue-300'
                        }
                    />

                </div>

                <div className='mx-auto text-center relative -bottom-[120px]'>
                    <p className='text-4xl font-bold w-[100%] '>Unlock the <HighlightText text={'Power of Code'}/></p>
                    <p className='text-lg text-richblack-200'>Learn to Build Anything You Can Imagine</p>
                </div>

                <PowerOfCodeSection/>

            </div>

            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700 pb-16'>

                <div className='homepage_bg h-[310px]'>

                    <div className='w-11/12 max-w-maxContent flex items-center justify-center gap-5 mx-auto'>

                        <div className='flex items-center justify-center gap-8 mt-[210px]'>

                            <CTAButton isBlack={false} linkto={'/signup'}>
                                <div className='flex justify-center items-center gap-2'>
                                    Explore Full Catalog <FaArrowRight />
                                </div>
                            </CTAButton>

                            <CTAButton isBlack={true} linkto={'/signup'}>
                                Learn More
                            </CTAButton>

                        </div>

                    </div>

                </div>

                <div className='w-11/12 max-w-maxContent mx-auto'>

                    <div className='flex sm:flex-row flex-col w-[100%] mt-[80px] justify-between'>

                        <div className='sm:w-[45%] font-extrabold text-4xl mb-8'>
                            Get the skills you need for a <HighlightText text={'job that is in demand.'} />
                        </div>

                        <div className='sm:w-[40%] text-lg flex-col'>

                            <p className='mb-8'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </p>

                            <CTAButton
                                isBlack={false}
                                linkto={'/signup'}
                            >
                                Learn More
                            </CTAButton>
                        </div>

                    </div>

                    <div className='flex md:flex-row flex-col justify-between mt-[20px] py-10'>

                        <div>

                            <SkillSectionCode
                                image={Logo1}
                                heading={'Leadership'}
                                desc={'Fully committed to the success company'}
                                last={false}
                            />

                            <SkillSectionCode
                                image={Logo2}
                                heading={'Responsibility'}
                                desc={'Students will always be our top priority'}
                                last={false}
                            />

                            <SkillSectionCode
                                image={Logo3}
                                heading={'Flexibility'}
                                desc={'The ability to switch is an important skills'}
                                last={false}
                            />

                            <SkillSectionCode
                                image={Logo4}
                                heading={'Solve the problem'}
                                desc={'Code your way to a solution'}
                                last={true}
                            />

                        </div>

                        <div className='relative mt-5 md:mt-0'>

                            <Frame
                                media={timelineImage}
                                shadow={true}
                                topleft={false}
                                isvideo={false}
                                imgh={480}
                                imgw={610}
                            />

                            <div className='flex md:flex-row flex-col absolute bg-caribbeangreen-600 md:left-8 md:-bottom-6 md:h-[100px] text-white
                            md:w-[90%] items-center py-5 px-6 md:justify-between top-0 h-[150px] w-[250px] justify-center text-center
                            '>

                                <div className='flex md:justify-between md:gap-x-14 gap-x-8 items-center'>

                                    <p className='text-5xl font-extrabold'>10</p>

                                    <p className='text-sm text-white/30'>YEARS <br></br>EXPERIENCE</p>
                                </div>

                                <div className='h-full w-1 bg-white md:flex hidden' />

                                <div className='flex md:justify-between md:gap-x-14 gap-x-8 items-center'>
                                    <div className='text-5xl font-extrabold'>
                                        250
                                    </div>

                                    <p className='text-sm text-white/30'>TYPES OF <br />COURSES</p>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='mx-auto text-center mt-16'>
                        <h2 className='text-4xl font-bold mb-2'>Your swiss knife for <HighlightText text={'learning any language'} /></h2>
                        <p className='text-lg w-[75%] mx-auto font-medium'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
                    </div>

                    <div className='relative flex md:flex-row flex-col'>

                        <img src={herosectionimage1} alt='img' loading='lazy'
                            height={90} width={400}
                            className='relative md:left-16'
                        />
                        <img src={herosectionimage2} alt='img' loading='lazy'
                            className='relative md:-left-14'
                        />
                        <img src={herosectionimage3} alt='img' loading='lazy'
                            className='relative md:right-48'
                        />



                    </div>

                    <div className='mx-auto w-max'>
                        <CTAButton
                            isBlack={false}
                            linkto={'/signup'}
                        >
                            Learn More
                        </CTAButton>
                    </div>

                </div>

            </div>

            {/* Section 3 */}
            <div className='w-full bg-richblack-900 py-10 text-white'>

                <div className='w-11/12 max-w-maxContent mx-auto'>

                    <div className='w-[100%] flex md:flex-row flex-col items-center justify-between'>

                        <div className='md:w-[50%] w-[100%]'>
                            <Frame
                                isvideo={false}
                                topleft={true}
                                shadow={false}
                                media={teacherimg}
                                imgh={'h-[300px] md:h-[400px] xl:h-[520px]'}
                            />
                        </div>

                        <div className='md:w-[40%] w-[100%] md:mt-0 mt-8 flex flex-col gap-y-8'>
                            <h2 className='text-4xl w-max'>

                                Become an <br /><HighlightText text={'instructor'} />
                            </h2>
                            <p className='text-white/40 text-lg leading-7'>
                                Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                            </p>

                            <CTAButton>
                                <div className='flex items-center gap-3'>
                                    <p>Start Teaching Today </p>
                                    <FaArrowRight />
                                </div>
                            </CTAButton>
                        </div>

                    </div>

                    <div className='text-4xl mx-auto font-bold mt-16 text-center mb-9'>
                        Reviews from other learners
                    </div>

                </div>

                <div className='w-[90vw] mx-auto'>
                    <LearnersReviewSlider/>
                </div>

            </div>


            {/* Footer Section  */}
            <Footer/>

        </div>
    )
}

export default Home;