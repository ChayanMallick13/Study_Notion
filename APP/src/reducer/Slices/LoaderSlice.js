import { createSlice } from "@reduxjs/toolkit";

const initialState = ({
    loader:false,
});

//

const LoaderSlice = createSlice({
    name:"loader",
    initialState:initialState,
    reducers: {
        setLoader(state){
            state.loader = true;
        },
        resetLoader(state){
            state.loader = false;
        }
    }
});

export const {resetLoader,setLoader} = LoaderSlice.actions;
export default LoaderSlice.reducer;