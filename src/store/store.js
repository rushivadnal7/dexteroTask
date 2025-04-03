import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/accountSlice.js";

const store = configureStore({
    reducer: {
        accounts: accountsReducer,
    },
});

export default store;
