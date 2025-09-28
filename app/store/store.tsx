import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // local storage
import gameReducer from "./gameSlice";
import timerReducer from "./timerSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["timer", "game"],
};

const rootReducer = combineReducers({
  timer: timerReducer,
  game: gameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
// type safe
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
