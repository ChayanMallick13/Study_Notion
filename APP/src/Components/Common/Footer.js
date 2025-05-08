import React from 'react';
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FooterLink2 } from '../../data/footer-links';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='w-full bg-richblack-800 py-10'>

            <div className='w-11/12 max-w-maxContent text-pure-greys-400 mx-auto'>

                <div className='flex md:flex-row flex-col justify-between gap-y-5'>
                    <div className='flex justify-between md:w-[44%] w-[100%] flex-wrap'>

                        <div className='flex flex-col gap-y-3'>

                            <div>
                                <img src={logo} alt='logo' />
                            </div>

                            <p className='text-white/70 font-bold text-lg'>Company</p>
                            <p className='hover:text-white transition-all duration-300 cursor-pointer'>About</p>
                            <p className='hover:text-white transition-all duration-300 cursor-pointer'>Careers</p>
                            <p className='hover:text-white transition-all duration-300 cursor-pointer'>Affiliates</p>

                            <div className='flex gap-x-5 text-lg'>
                                <FaFacebook className='hover:text-white transition-all duration-300 cursor-pointer' />
                                <FaGoogle className='hover:text-white transition-all duration-300 cursor-pointer' />
                                <FaTwitter className='hover:text-white transition-all duration-300 cursor-pointer' />
                                <FaYoutube className='hover:text-white transition-all duration-300 cursor-pointer' />
                            </div>

                        </div>

                        <div className='flex flex-col gap-y-8'>

                            <div className='flex flex-col gap-y-2'>
                                <p className='text-white/70 font-bold text-lg'>{FooterLink2[0].title}</p>
                                {
                                    FooterLink2[0].links.map((ele,index) => {
                                        return (
                                            <div key={index} className='hover:text-white transition-all duration-300 cursor-pointer'>
                                                <Link to={ele.link}>{ele.title}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className='flex flex-col gap-y-2'>
                                <p className='text-white/70 font-bold text-lg'>{FooterLink2[1].title}</p>
                                {
                                    FooterLink2[1].links.map((ele,index) => {
                                        return (
                                            <div key={index} className='hover:text-white transition-all duration-300 cursor-pointer'>
                                                <Link to={ele.link}>{ele.title}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>

                        <div className='flex flex-col gap-y-8'>

                            <div className='flex flex-col gap-y-2'>
                                <p className='text-white/70 font-bold text-lg'>{FooterLink2[2].title}</p>
                                {
                                    FooterLink2[2].links.map((ele,index) => {
                                        return (
                                            <div key={index} className='hover:text-white transition-all duration-300 cursor-pointer'>
                                                <Link to={ele.link}>{ele.title}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className='flex flex-col gap-y-2'>
                                <p className='text-white/70 font-bold text-lg'>{FooterLink2[3].title}</p>
                                {
                                    FooterLink2[3].links.map((ele,index) => {
                                        return (
                                            <div key={index} className='hover:text-white transition-all duration-300 cursor-pointer'>
                                                <Link to={ele.link}>{ele.title}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                        </div>

                    </div>

                    <div className='flex justify-between md:w-[48%] w-[100%] md:border-l-2 gap-x-3 border-l-richblack-300/20 md:pl-5 flex-wrap'>
                        <div className='flex flex-col gap-y-2'>
                            <p className='text-white/70 font-bold text-lg'>{FooterLink2[4].title}</p>
                            {
                                FooterLink2[4].links.map((ele,index) => {
                                    return (
                                        <div key={index} className='hover:text-white transition-all duration-300 cursor-pointer'>
                                            <Link to={ele.link}>{ele.title}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <p className='text-white/70 font-bold text-lg'>{FooterLink2[5].title}</p>
                            {
                                FooterLink2[5].links.map((ele,index) => {
                                    return (
                                        <div key={index} className='hover:text-white transition-all duration-300 cursor-pointer'>
                                            <Link to={ele.link}>{ele.title}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <p className='text-white/70 font-bold text-lg'>{FooterLink2[6].title}</p>
                            {
                                FooterLink2[6].links.map((ele,index) => {
                                    return (
                                        <div key={index} className='hover:text-white transition-all duration-300 cursor-pointer'>
                                            <Link to={ele.link}>{ele.title}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className='w-full h-[2px] mt-6 bg-richblack-300/20' />

                <div className='flex justify-between py-6 md:flex-row flex-col gap-y-5'>

                    <div className='flex  gap-x-3'>
                        <p className='hover:text-white transition-all duration-300 cursor-pointer'>Privacy Policy</p>
                        <div className='md:h-full bg-richblack-300 w-[1px]' />
                        <p className='hover:text-white transition-all duration-300 cursor-pointer'>Cookie Policy</p>
                        <div className='md:h-full bg-richblack-300 w-[1px]' />
                        <p className='hover:text-white transition-all duration-300 cursor-pointer'>Terms</p>
                    </div>

                    <div>
                        Made with ❤️ Chayan Mallick © 2025 Studynotion
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Footer;
