import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  playlist: [],
  isLoading: false,
};
export const getPlaylistData23 = createAsyncThunk(
  "video/playlist",
  async (token) => {
    try {
      const getData = await fetch("/api/user/playlists", {
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
const playlistSlice = createSlice({
  name: "playlit",
  initialState,
  reducers: {
    addPlaylistData: (state, action) => {
      state.playlist = action.payload.value;
    },
    deletePlaylistReducer: (state, action) => {
      state.playlist = action.payload.value;
    },
    deletePlaylistVideoReducer: (state, action) => {
      state.playlist = action.payload.value;
    },
  },
  extraReducers: {
    [getPlaylistData23.pending]: (state) => {
      state.isLoading = true;
    },
    [getPlaylistData23.fulfilled]: (state, action) => {
      state.playlist = action.payload.playlists;
      state.isLoading = false;
    },
    [getPlaylistData23.rejected]: (state) => {},
  },
});
export const {
  deletePlaylistReducer,
  deletePlaylistVideoReducer,
  addPlaylistData,
} = playlistSlice.actions;
export default playlistSlice.reducer;
