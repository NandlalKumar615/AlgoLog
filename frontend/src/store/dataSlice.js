import { createSlice } from '@reduxjs/toolkit';
import {IDLE} from '../constants/commonConstants'


// For different Page
const dataSlice = createSlice({
    name: 'data',
    initialState: {
        fetchedData: null,
        status: IDLE,
    },
    reducers: {
        setData(state, action) {
            state.fetchedData = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setData, setStatus } = dataSlice.actions;
export default dataSlice.reducer;