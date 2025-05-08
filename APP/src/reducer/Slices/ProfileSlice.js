import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    user:(localStorage.getItem('user'))?JSON.parse(localStorage.getItem('user')):null,
    loader:false,
});

const ProfileSlice = createSlice({
    name:"Profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user = value.payload;
            localStorage.setItem('user',JSON.stringify(value.payload));
        },
        setLoader(state){
            state.loader = true;
        },
        resetLoader(state){
            state.loader = false;
        }
    }
});

export const {setUser,resetLoader,setLoader} = ProfileSlice.actions;
export default ProfileSlice.reducer;