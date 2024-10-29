import { createSlice } from "@reduxjs/toolkit";


const initialState :any = [];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add(state, action){
            state.push(action.payload); // get data in payload and update state
        }
        ,
        remove(state, action){
            const index = state.findIndex((item: any) => item.name === action.payload.name);
            if (index !== -1) {
                state.splice(index, 1);
            }
            return state;
        },
        empty(state) {
            state = []
            return state
        }

    }
});

export const {add, remove, empty} = cartSlice.actions          // all action fucntion. here to export
export default cartSlice.reducer;