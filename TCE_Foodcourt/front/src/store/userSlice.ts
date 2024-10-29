import { createSlice } from "@reduxjs/toolkit";

const initialState :any = [{user:{name: "ali", username:"@ali", role:"customer"}}];
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set(state, action){
            state.push(action.payload); // get data in payload and update state
        }

    }
});

export const {set} = userSlice.actions          // all action fucntion. here to export
export default userSlice.reducer;