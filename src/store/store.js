import { configureStore } from "@reduxjs/toolkit";
import puppyApi from "../store/api";

// TODO: configure the store to use the API slice's auto-generated reducer and custom middleware.
const store = configureStore({
  reducer: {
    [puppyApi.reducerPath]: puppyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(puppyApi.middleware),
});

export default store;
