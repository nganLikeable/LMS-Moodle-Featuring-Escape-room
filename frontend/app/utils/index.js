// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import persistConfig from "./persistConfig";
import rootReducer from "./rootReducer"; // combine your reducers

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
