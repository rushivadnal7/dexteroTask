import { createSlice } from "@reduxjs/toolkit";
import { accountsData } from "../utils/accountsData.js";

const initialState = {
    accounts: accountsData,
    currentPage: 1,
    perPage: 10, 
};

const accountSlice = createSlice({
    name: "accounts",
    initialState,
    reducers: {
        setPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setPage } = accountSlice.actions;
export default accountSlice.reducer;
