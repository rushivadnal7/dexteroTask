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

        addAccount: (state, action) => {
            state.accounts.push(action.payload);
        },

        updateAccount: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.accounts.findIndex(account => account.id === id);
            if (index !== -1) {
                state.accounts[index] = { ...state.accounts[index], ...updatedData };
            }
        },

        deleteAccount: (state, action) => {
            state.accounts = state.accounts.filter(account => account.id !== action.payload);
        }
    },
});

export const { setPage, addAccount, updateAccount, deleteAccount } = accountSlice.actions;
export default accountSlice.reducer;
