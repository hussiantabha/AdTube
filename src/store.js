import { configureStore } from "@reduxjs/toolkit";
import videoReducers from "./features/video";
import playlistReducers from "./features/playlist";
import likeReducers from "./features/like";
import watchLaterReducers from "./features/watchLater";
import historyReducers from "./features/history";
const store = configureStore({
  reducer: {
    video: videoReducers,
    playlist: playlistReducers,
    like: likeReducers,
    watchLater: watchLaterReducers,
    history: historyReducers,
  },
});

export { store };
