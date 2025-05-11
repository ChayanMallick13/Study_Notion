import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './Slices/authslice';
import cartReducer from './Slices/CartSlice';
import profilereducer from './Slices/ProfileSlice';
import loaderreducer from './Slices/LoaderSlice';
import courseReducer from './Slices/CourseSlice';
import chatBoxReducer from './Slices/ChatBotSlice';

const rootReducer = combineReducers({
    auth:authReducer,
    Cart:cartReducer,
    Profile:profilereducer,
    loader:loaderreducer,
    course:courseReducer,
    chatBox:chatBoxReducer,
});

export default rootReducer;