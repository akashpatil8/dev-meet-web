import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slices/userSlice";
import feedReducer from "../redux/slices/feedSlice";
import connectionsReducer from "../redux/slices/connectionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
  },
});

export default store;
