// import { createSlice } from "@reduxjs/toolkit";

// const connectionSlice = createSlice({
//     name:"connection",
//     initialState:null,
//     reducers:{ 
//         addConnections:(state,action)=> action.payload,
//         removeConnections:(state,action)=> null,
//     },
// });

// export const{addConnections, removeConnections} = connectionSlice.actions;

// export default connectionSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name:"connection",
    initialState:null,
    reducers:{ 
        addConnections:(state, action) => {
            // ⚠️ ADD DEBUG LOGS
            console.log("🟡 Redux - Received payload:", action.payload);
            console.log("🟡 Redux - First item:", action.payload?.[0]);
            console.log("🟡 Redux - First item _id:", action.payload?.[0]?._id);
            return action.payload;
        },
        removeConnections:(state, action) => null,
    },
});

export const {addConnections, removeConnections} = connectionSlice.actions;

export default connectionSlice.reducer;