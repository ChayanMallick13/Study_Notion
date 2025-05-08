import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { apiConnector } from '../Services/apiconnector';
import { categories } from '../Services/apis';
import { useDispatch } from 'react-redux';
import { fetchCategoryPageDetails } from '../Services/Operations/Category_Api';
import Loader from '../Components/Common/Loader';
import SliderComponent from '../Components/Common/SliderComponent';
import CourseCard from '../Components/Common/CourseCard';
import Footer from '../Components/Common/Footer';

function CatalogPage() {
    const location = useLocation();
    let category = (location.pathname.split('/').at(-1).replace('%20', ' '));
    let categoryId = null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loadig, setLoading] = useState(false);
    const [isnew, setIsNew] = useState(false);
    const [categoryPageDetails, setCategoryDetails] = useState(null);
    const [categoryDet, setCategoryDet] = useState(null);



    async function fetchSublinksData() {
        try {
            const sublinksdata = await apiConnector('GET', categories.CATEGORY_API);
            const allCategorys = sublinksdata.data.Categorys;
            const anyElement = allCategorys.filter((ele) => {
                return ele.name === category;
            })
            if (anyElement.length === 0) {
                navigate('/');
            }
            setCategoryDet(anyElement[0]);
            categoryId = anyElement[0]._id;
        }
        catch (err) {
            console.log('Some Error Occured in cheking link');
            console.error(err);
        }
    }

    function getCategoryDetails() {
        const body = {
            categoryId,
        };
        dispatch(fetchCategoryPageDetails(setCategoryDetails, setLoading, body));
    }

    async function callFunctions() {
        setLoading(true);
        await fetchSublinksData();
        getCategoryDetails();
    }

    //console.log("temp", categoryPageDetails);
    //console.log(categoryDet);

    useEffect(
        () => {
            callFunctions();
        }, [category, location]
    )

    if (loadig || !categoryPageDetails || !categoryDet) {
        return <Loader />
    }


    return (
        <div className='text-white w-[100%]'>

            {/* Heading Section  */}
            <div className='bg-richblack-800 w-full'>

                <div className='lg:w-9/12 w-[94%] mx-auto py-16 '>
                    <div className='text-richblack-400'>Home / Catalog /
                        <span className='text-yellow-100 font-extrabold'> {category}</span>
                    </div>

                    <p className='text-4xl pt-5'>{category}</p>

                    <p className='pt-3 text-richblack-300'>{categoryDet?.description}</p>
                </div>

            </div>

            <div className='bg-richblack-900 w-full'>

                <div className='lg:w-9/12 w-[94%] mx-auto py-16 '>
                    <div>
                        <h3 className='font-extrabold text-4xl mb-4'>Courses to get you started</h3>
                        <div className='border-b-[1px] border-b-richblack-400 mb-6 flex gap-x-6'>
                            <button
                                onClick={() => {
                                    setIsNew(prev => false);
                                }}
                                className={`px-2 py-2 ${(!isnew) && 'text-yellow-100 border-b-[1px] border-b-yellow-100'}`}
                            >Most Populer</button>
                            <button
                                onClick={() => {
                                    setIsNew(prev => true);
                                }}
                                className={`px-2 py-2 ${(isnew) && 'text-yellow-100 border-b-[1px] border-b-yellow-100'}`}
                            >New</button>
                        </div>
                        <SliderComponent
                            courses={(isnew) ? (categoryPageDetails?.diffCategoryCourses)
                                : (categoryPageDetails?.categoryCourses)} //diffCategoryCourses
                        />
                    </div>

                    <div>
                        <h3 className='font-extrabold text-4xl mb-9'>Top courses in {category}</h3>
                        <SliderComponent
                            courses={categoryPageDetails?.categoryCourses}
                        />
                    </div>

                    <div>
                        <h3 className='font-extrabold text-4xl mb-9'>Frequently Bought</h3>
                        {/* <CardsForCourse/> */}
                        <div className='flex flex-wrap justify-between gap-y-24 mb-16'>
                            {
                                (categoryPageDetails?.topSellingCourses?.length !== 0) ?
                                    (categoryPageDetails?.topSellingCourses?.map(
                                        (ele, key) => {
                                            return <div className='w-[500px] h-[380px]' key={key}>
                                                <CourseCard
                                                    key={key}
                                                    {...ele}
                                                    height={'lg:h-[300px] h-[200px]'}
                                                    width={'lg:w-[600px] w-full'}
                                                />
                                            </div>
                                        }
                                    )) :
                                    (
                                        <div className='w-full h-[300px] text-white font-extrabold flex items-center justify-center text-4xl'>
                                            No Courses No Show
                                        </div>
                                    )
                            }
                        </div>

                    </div>
                </div>

            </div>

            <Footer />

        </div>
    )
}

export default CatalogPage
