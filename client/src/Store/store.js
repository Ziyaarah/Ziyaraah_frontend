// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authReducer from './api/authSlice.js'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: getDefaultMiddleware({
    serializableCheck: false, 
  }),
});

export const persistor = persistStore(store);