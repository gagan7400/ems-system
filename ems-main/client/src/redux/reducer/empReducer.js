import { createSlice } from '@reduxjs/toolkit';
let initialState = {
    loading: true, error: null, empdata: null
}

let empReducer = createSlice({
    name: 'empReducer',
    initialState,
    reducers: {
        SUCCESS: (state, action) => {
            state.loading = false;
            state.empdata = action.payload;
        },
        REQUEST: (state) => {
            state.loading = true;
            state.empdata = null;
            state.error = null;
        },
        FAILED: (state, action) => {
            state.loading = false;
            state.empdata = null;
            state.error = action.payload;
        }
    }
})

export const { SUCCESS, REQUEST, FAILED } = empReducer.actions;
export default empReducer.reducer; 