import { configureStore } from '@reduxjs/toolkit';
import folderReducer from './folderSlice';
import darkModeReducer from './darkModeSlice';

export const store = configureStore({
  reducer: {
    folderatom: folderReducer,
    darkMode: darkModeReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
