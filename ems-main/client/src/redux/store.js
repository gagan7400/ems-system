import { configureStore } from '@reduxjs/toolkit';
import empReducer from './reducer/empReducer';

export let store = configureStore({
    reducer: {
        emp: empReducer
    }
});