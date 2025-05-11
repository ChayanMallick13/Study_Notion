const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
    CATEGORY_API:BASE_URL+'/course/getCategorys',
    CATEGORY_PAGE_DETAILS:BASE_URL+'/course/categoryPageDetails',
}

export const StatsLink = {
    STATS_LINK:BASE_URL+'/auth/getStats',
}

export const Contact_US = {
    CONTACT_US_LINK:BASE_URL+'/profile/contactUs',
}

export const authLinks = {
    LOGIN_API:BASE_URL+'/auth/signin',
    SIGNUP_API:BASE_URL+'/auth/signup',
    GETOTP_API:BASE_URL+'/auth/getOtp',
    GET_RESET_TOKEN_API:BASE_URL+'/auth/resetPasswordToken',
    RESET_PASSWORD_API:BASE_URL+'/auth/resetPassword',
    SIGN_IN_WITH_GOOGLE:BASE_URL+'/auth/sigInWithGoogle',
}

export const updateProfileLinks = {
    UPDATE_DP:BASE_URL+'/profile/updateProfilePicture',
    UPDATE_PROFILE_DETAILS:BASE_URL+'/profile/updateProfile',
    CHANGE_PASSWORD_API:BASE_URL+'/auth/changePassword',
    DELETE_STATUS_LINK:BASE_URL+'/profile/getDeletionStatus',
    DELETE_ACCOUNT_REQ:BASE_URL+'/profile/makedeleteRequestt',
    RECOVER_ACCOUNT_REQ:BASE_URL+'/profile/cancelDeleteRequest',
}

export const coursesLinks = {

    //course
    ENROLLED_API:BASE_URL+'/profile/getAllEnrolledCourses',
    TEMP:BASE_URL+'/course/getAllCourses',
    GET_AVG_RATING:BASE_URL+'/course/getAverageRatings',
    UPDATE_COURSE:BASE_URL+'/course/updateCourse',
    CREATE_COURSE:BASE_URL+'/course/createCourse',
    UPDATE_COURSE_STATUS:BASE_URL+'/course/updateCourseStatus',
    GET_COURSE_DETAILS:BASE_URL+'/course/getCourseDetails',

    //section   
    CREATE_SECTION:BASE_URL+'/course/createSection',
    UPDATE_SECTION:BASE_URL+'/course/updateSection',
    DELETE_SECTION:BASE_URL+'/course/deleteSection',

    //subsetion
    CREATE_SUBSECTION:BASE_URL+'/course/createSubSection',
    DELETE_SUBSECTION:BASE_URL+'/course/deleteSubSection',
    UPDATE_SUBSECTION:BASE_URL+'/course/updateSubSection',

    //ratings
    CREATE_RATING_API:BASE_URL+'/course/createRating',
    GET_AVERAGE_RATING_API:BASE_URL+'/course/getAverageRatings',
    GET_ALL_RATINGS_API:BASE_URL+'/course/getAllRatings'
}

export const paymentLinks = {
    CREATE_ORDER_API:BASE_URL+'/payment/capturePayment',
    VERIFY_ORDER_API:BASE_URL+'/payment/verifySignature',
    SEND_PURCHASE_COMPLETE_MAIL:BASE_URL+'/payment/sendPurchaseMail',
    GET_USER_PAYMENT_HISTORY:BASE_URL+'/payment/getUserPaymentHistory',
}

export const profileLinks = {
    GET_ALL_PROFILE_DETAILS_API:BASE_URL+'/profile/getAllUsersDetails',
    GET_INSTRUCTOR_STATS_API:BASE_URL+'/profile/getInstructorInfo'
}

export const courseProgressLinks = {
    COMPLETE_VIDEO_LINK:BASE_URL+'/auth/makeCompleteVideoRequest/'
}

export const geminiLinks = {
    GEMINI_API_LINK_BACKEND:BASE_URL+'/auth/geminiapi'
}