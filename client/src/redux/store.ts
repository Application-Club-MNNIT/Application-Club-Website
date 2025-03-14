import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import auxiliaryReducer from "./auxiliarySlice";

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
    auth: authReducer,
    auxiliary: auxiliaryReducer,
});

// Create persisted reducer using persistReducer from redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer, // ✅ Fixed this line
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Persistor
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
