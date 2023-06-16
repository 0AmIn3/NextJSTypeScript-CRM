import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteCompanyAPI, getCompanyAPI, pathCompanyAPI, postCompanyAPI } from "./thunk";

const initialState = {
  data: [],
  userKey: [],
  status: "idle",
};

export const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    // getAll: (state, action) => {
    //   state.data = [...state.data];
    // },

  },
  extraReducers(builder) {
    builder
      .addCase(getCompanyAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCompanyAPI.fulfilled, (state, action) => {
        state.data = action.payload.data || []
        state.userKey = action.payload.userKey || []
        state.status = "fulfilled";
      })
      .addCase(getCompanyAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(postCompanyAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postCompanyAPI.fulfilled, (state, action) => {
        state.data = action.payload || []
        state.status = "fulfilled";
      })
      .addCase(postCompanyAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(pathCompanyAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(pathCompanyAPI.fulfilled, (state, action) => {
        state.data = action.payload || []
        state.status = "fulfilled";
      })
      .addCase(pathCompanyAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(deleteCompanyAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCompanyAPI.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.status = "fulfilled";
      })
      .addCase(deleteCompanyAPI.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { getAll, changeOpros } = CompanySlice.actions;

export default CompanySlice.reducer;
