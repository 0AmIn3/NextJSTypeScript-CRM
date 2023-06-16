import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getHotelsAPI, pathHotelsAPI, postHotelsAPI, putHotelsAPI } from "../thunk";


const initialState = {
  data: [],
  userKey: [],
  status: "idle",
};

export const HotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getHotelsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getHotelsAPI.fulfilled, (state, action) => {
        state.data = action.payload.data || [];
        state.userKey = action.payload.userKey || [];
        state.status = "fulfilled";
      })
      .addCase(getHotelsAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(postHotelsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postHotelsAPI.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "fulfilled";
      })
      .addCase(postHotelsAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(pathHotelsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(pathHotelsAPI.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.userKey = action.payload.userKey;
        state.status = "fulfilled";
      })
      .addCase(pathHotelsAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(putHotelsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(putHotelsAPI.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.userKey = action.payload.userKey;
        state.status = "fulfilled";
      })
      .addCase(putHotelsAPI.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { deleteAnswer } = HotelsSlice.actions;

export default HotelsSlice.reducer;
