import {configureStore} from '@reduxjs/toolkit';
import { count } from 'console';
 import counterReducers from './counter/counterSlice';
export const store = configureStore({
    reducer: {
        // Add your reducers here
        counter:counterReducers
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;