import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  likeVideos: [],
  isLoading: false,
};

export const getLikedData = createAsyncThunk(
  "video/likeVideos",
  async (token) => {
    try {
      const getData = await fetch("/api/user/likes", {
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
const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    addLikeVideo: (state, action) => {
      state.likeVideos = action.payload.value;
    },
    deleteLikeVideoReducer: (state, action) => {
      state.likeVideos = action.payload.value;
    },
  },
  extraReducers: {
    [getLikedData.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getLikedData.fulfilled]: (state, action) => {
      state.likeVideos = action.payload.likes;
      state.isLoading = false;
    },
    [getLikedData.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
export const { addLikeVideo, deleteLikeVideoReducer } = likeSlice.actions;
export default likeSlice.reducer;
