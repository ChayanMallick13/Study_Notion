import React, { useEffect, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom';
import logoimg from '../../assets/Logo/Logo-Full-Light.png';
import { IoIosArrowDown } from "react-icons/io";
import { NavbarLinks } from '../../data/navbar-links';
import { useSelector } from 'react-redux';
import { IoCartOutline } from "react-icons/io5";
import ProfileDropDown from '../Core/Auth/ProfileDropDown';
import { apiConnector } from '../../Services/apiconnector';
import { categories } from '../../Services/apis';



const Navibar = () => {

    const [subLinks, setSubLinks] = useState([]);

    async function fetchSublinksData() {
        try {
            const sublinksdata = await apiConnector('GET', categories.CATEGORY_API);
            setSubLinks(sublinksdata.data.Categorys);
            // console.log(sublinksdata.data.Categorys);
        }
        catch (err) {
            console.log('error in fetching sublink data');
            console.error(err);
        }
    }

    useEffect(
        () => {
            fetchSublinksData();
        }, []
    )

    const location = useLocation();
    function checkRoute(path = '/') {
        const nowpath = location.pathname;
        if(path==='/catalog'){
            return nowpath.includes('/catalog');
        }
        return (matchPath({ path, }, nowpath));
    }

    const { token } = useSelector((state) => state.auth);
    const { totalItem } = useSelector(state => state.Cart);
    const { user } = useSelector(state => state.Profile);
    console.log();

    return (
        <div className={`w-full ${(matchPath({path:'/'},location.pathname))?('bg-richblack-900 border-b-richblack-800')
        :('bg-richblack-800 border-b-richblack-700')} 
        relative top-0 border-b-2  transition-all duration-200`}>

            <div className='w-11/12 max-w-maxContent flex justify-between mx-auto text-pure-greys-100 items-center py-2   md:pl-0 pl-10
        '>
                <Link to={'/'}>
                    <img alt='logo' src={logoimg} height={100} width={160} />
                </Link>

                <div className='md:flex hidden gap-x-5 text-pure-greys-50 font-medium text-[17px]'>
                    {
                        NavbarLinks.map((ele, index) => {
                            if (ele.title === 'Catalog') {
                                return (
                                    <div className={`${(checkRoute('/catalog')) ? ('text-yellow-100') : ('')} 
                                    flex gap-x-1 items-center cursor-pointer group relative`} key={index}>
                                        <p>Catalog</p>
                                        <IoIosArrowDown className='text-xl' />

                                        <div className='invisible opacity-0 absolute -left-[140%] top-[140%] flex flex-col rounded-md
                                        bg-richblack-5 p-2 text-richblue-900 transition-all duration-200 group-hover:visible
                                        group-hover:opacity-100 w-[250px] min-h-[50px] z-10
                                        '>
                                            <div
                                                className='invisible absolute left-[57.5%] -top-[2%] flex flex-col
                                        bg-richblack-5 p-4 text-richblue-900 opacity-0 transition-all duration-200 group-hover:visible
                                        group-hover:opacity-100 h-[20px] w-[20px] rotate-45
                                        '
                                            />

                                            <div className='flex flex-col gap-y-10 px-6 py-5'>
                                                {
                                                    subLinks.map((ele,ind)=> {
                                                        return (
                                                            <Link key={ind} to={`/catalog/${ele.name}`}>{ele.name}</Link>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>




                                    </div>
                                );
                            }
                            return (<Link to={ele?.path} key={index} className={`${(checkRoute(ele?.path)) ? ('text-yellow-100') : ('')}`}>
                                {ele.title}
                            </Link>);
                        })
                    }
                </div>

                {/* signup/login/dash/profile */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType !== 'Instructor' && (
                            <Link to={'/dashboard/cart'} className='relative text-2xl'>
                                <IoCartOutline />
                                {
                                    totalItem > 0 && (
                                        <span className='absolute text-sm font-extrabold -top-3 left-2'>{totalItem}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={'/login'} className='border border-richblack-700 px-[12px] py-[8px]
                            text-richblack-100 rounded-md bg-richblack-800
                            '>
                                Log in
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to={'/signup'} className='border border-richblack-700 px-[12px] py-[8px]
                            text-richblack-100 rounded-md bg-richblack-800
                            '>
                                Sign Up
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }
                </div>


            </div>
        </div>
    )
}

export default Navibar;
