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

const timerPersistConfig = {
  key: "timer",
  storage,
  blacklist: ["showModal", "showTimer"], // transient UI flags stay out of storage
};
const persistedTimerReducer = persistReducer(timerPersistConfig, timerReducer);

const rootReducer = combineReducers({
  timer: timerReducer,
  game: gameReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/REGISTER",
          "persist/PURGE",
          "persist/FLUSH",
        ],
      },
    }),
});

export const persistor = persistStore(store);
// type safe
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
