import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getClientsAPI,
  pathClientsAPI,
  postClientsAPI,
  putClientsAPI,
} from "../thunk";

const initialState = {
  data: [],
  userKey: [],
  status: "idle",
};

export const ClientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getClientsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getClientsAPI.fulfilled, (state, action) => {
        state.data = action.payload.data || [];
        state.userKey = action.payload.userKey || [];
        state.status = "fulfilled";
      })
      .addCase(getClientsAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(postClientsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postClientsAPI.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "fulfilled";
      })
      .addCase(postClientsAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(pathClientsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(pathClientsAPI.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.userKey = action.payload.userKey;
        state.status = "fulfilled";
      })
      .addCase(pathClientsAPI.rejected, (state, action) => {
        state.status = "rejected";
      })
      .addCase(putClientsAPI.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(putClientsAPI.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.userKey = action.payload.userKey;
        state.status = "fulfilled";
      })
      .addCase(putClientsAPI.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { deleteAnswer } = ClientsSlice.actions;

export default ClientsSlice.reducer;
