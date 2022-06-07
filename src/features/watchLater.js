import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchLaterVideos: [],
  isLoading: false,
};
export const getWatchLaterVideos = createAsyncThunk(
  "video/watchLater",
  async (token) => {
    try {
      const getData = await fetch("/api/user/watchlater", {
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
const watchlaterSlice = createSlice({
  name: "watchLater",
  initialState,
  reducers: {
    addWatchLaterReducer: (state, action) => {
      state.watchLaterVideos = action.payload.value;
    },
    deleteWatchLaterReducer: (state, action) => {
      state.watchLaterVideos = action.payload.value;
    },
  },
  extraReducers: {
    [getWatchLaterVideos.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getWatchLaterVideos.fulfilled]: (state, action) => {
      console.log(action);
      state.watchLaterVideos = action.payload.watchlater;
      state.isLoading = false;
    },
    [getWatchLaterVideos.rejected]: (state, action) => {},
  },
});
export const { addWatchLaterReducer, deleteWatchLaterReducer } =
  watchlaterSlice.actions;
export default watchlaterSlice.reducer;
