import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  historyVideos: [],
  isLoading: false,
};
export const getHistoryData = createAsyncThunk(
  "videos/History",
  async (token) => {
    try {
      const getData = await fetch("/api/user/history", {
        method: "GET",
        headers: {
          authorization: token,
        },
      });
      const convertedJSON = await getData.json();
      return convertedJSON;
    } catch (err) {
      return err;
    }
  }
);
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addHistoryData: (state, action) => {
      state.historyVideos = action.payload.value;
    },
    deleteHistoryData: (state, action) => {
      state.historyVideos = action.payload.value;
    },
  },
  extraReducers: {
    [getHistoryData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getHistoryData.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
    [getHistoryData.rejected]: (state, action) => {},
  },
});
export const { addHistoryData, deleteHistoryData } = historySlice.actions;
export default historySlice.reducer;
