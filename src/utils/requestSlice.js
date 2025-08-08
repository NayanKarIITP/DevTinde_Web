import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"request",
    initialState:null,
    reducers:{ 
        addRequests:(state,action)=> action.payload,
        removeRequests:(state,action)=> {
            const newArray = state.filter((r)=> r._id !== action.payload._id);
            return newArray;
        },
    },
});

export const{addRequests, removeRequests} = connectionSlice.actions;

export default connectionSlice.reducer;