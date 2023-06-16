import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getFilialsAPI, pathFilialsAPI, postFilialsAPI, putFilialsAPI } from "../thunk";


const initialState = {
  data: [],
  userKey: [],
  status: "idle",
};

export const FilialsSlice = createSlice({
  name: "filials",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFilialsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getFilialsAPI.fulfilled, (state, action) => {
        state.data = action.payload.data || [];
        state.userKey = action.payload.userKey || [];
        state.status = "fulfilled";
      })
      .addCase(getFilialsAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(postFilialsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postFilialsAPI.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "fulfilled";
      })
      .addCase(postFilialsAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(pathFilialsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(pathFilialsAPI.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.userKey = action.payload.userKey;
        state.status = "fulfilled";
      })
      .addCase(pathFilialsAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(putFilialsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(putFilialsAPI.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.userKey = action.payload.userKey;
        state.status = "fulfilled";
      })
      .addCase(putFilialsAPI.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { deleteAnswer } = FilialsSlice.actions;

export default FilialsSlice.reducer;
