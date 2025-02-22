import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import auxiliaryReducer from "./slices/auxiliarySlice";
import boxSlice from "./slices/boxSlice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Configuration for Redux persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine reducers into root reducer
const rootReducer = combineReducers({
  user: userReducer,
  auxiliary: auxiliaryReducer,
});

// Create persisted reducer using persistReducer from redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // all the reducers are kept here
  reducer: {
    persistedReducer,
    boxSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
