import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  videos: [],
  isLoading: false,
};
export const getVideos = createAsyncThunk("videos/getVideos", async () => {
  const getData = await fetch("/api/videos");
  const convertedJSON = await getData.json();
  return convertedJSON;
});
const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: {
    [getVideos.pending]: (state) => {
      state.isLoading = true;
    },
    [getVideos.fulfilled]: (state, action) => {
      return { ...state, videos: action.payload.videos, isLoading: false };
    },
    [getVideos.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default videoSlice.reducer;
