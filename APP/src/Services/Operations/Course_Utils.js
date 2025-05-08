import toast from "react-hot-toast";


export const calculateDuration = (courseDetails) => {
    if(!courseDetails){
        return '0';
    }
    let duration = 0;
    for(let section of courseDetails?.courseContent){
        for(let subsetion of section?.subSections){
            duration+=Math.ceil(subsetion?.timeDuration);
        }
    }
    return `${Math.floor(duration/3600) || 0} Hr  ${Math.floor((duration%3600)/60) || 0} Mins  ${duration%60 || 0} Secs`;
}

export function getTotalLectures(courseDetails){
    if(!courseDetails){
        return '0';
    }
    let toatalLectures = 0;
    for(let section of courseDetails){
        toatalLectures+=section?.subSections?.length;
    }
    return toatalLectures;
}

export function getCompletedLecturesofCourse(user,courseId){
    if(!user || !courseId){
        return '0';
    }
    const courseProgress = user?.courseProgress?.filter(ele => ele.courseId === courseId);
    //console.log(user,courseId);
    if(courseProgress.length===0){
        //console.log('yemp');
        return '0';
    }
    return courseProgress?.at(0)?.completedVideos?.length || 0;
}

export function formatDateTime(input) {
    // Split the date and time parts
    const [datePart, timePart] = input.split('|').map(s => s.trim());
  
    // Create a Date object
    const dateTime = new Date(`${datePart} ${timePart}`);
  
    // Format date
    const formattedDate = dateTime.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    // Format time
    const formattedTime = dateTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  
    return `${formattedDate} | ${formattedTime}`;
}


export const calculateDurationofSection = (subSections) => {
    //console.log('ooppp',subSections);
    if(!subSections){
        return '0';
    }
    let duration = 0;
    for(let subsetion of subSections){
        duration+=Math.ceil(subsetion?.timeDuration);
    }
    return `${Math.floor(duration/60) || 0} Min  ${duration%60 || 0} s`;
}


export function createviewCourseLink(user,course){
    let sectionId = null,subSectionId = null;
    //console.log(user);
    let flag= false;
    let CourseProgress = user?.courseProgress?.filter((ele) => ele?.courseId === course._id);
    //console.log(CourseProgress);
    for(let Section of course?.courseContent){
        for(let subSection of Section?.subSections){
            if(!sectionId || !subSectionId){
                sectionId = Section._id;
                subSectionId = subSection._id;
                console.log('One');
            }
            if((CourseProgress.length!==0) && (!(CourseProgress[0].completedVideos.includes(subSection._id)))){
                sectionId = Section._id;
                subSectionId = subSection._id;
                flag = true;
                break;
            }
            
        }
        if(flag){
            break;
        }
    }
    //console.log(flag);
    return `/view-course/${course?._id||'0'}/section/${sectionId || '0'}/sub-section/${subSectionId || '0'}`;
}



export function isLectureCompletd(user,subSectionid,courseId){
    const courseProgress =  user?.courseProgress?.filter((ele) => ele?.courseId === courseId);
    // console.log(user,courseId);
    // console.log(courseProgress,subSectionid);
    if(! courseProgress || courseProgress?.length===0){
        return false;
    }
    return courseProgress[0]?.completedVideos?.includes(subSectionid) || false;
}


export async function CopyToClipBoard(textToCopy) {
    try {
        await navigator.clipboard.writeText(textToCopy);
        toast.success('Link Copied To Clipboard');
    } catch (error) {
        toast.error('Some Error Occurred');
    }
    
}