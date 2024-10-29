import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./userSlice";
import cartSlice from "./cartSlice";

const store = configureStore({
    reducer: {
        user: userSlice,   //slice name slice
        cart: cartSlice
    }
});

export default store;
