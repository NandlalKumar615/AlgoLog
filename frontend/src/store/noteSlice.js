import { createSlice } from '@reduxjs/toolkit';
import {IDLE} from '../constants/commonConstants'

const noteSlice = createSlice({
    name: 'note',
    initialState: {
        notes: [],
        status: IDLE,
    },
    reducers: {
        setNotes(state, action) {
            state.notes = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setNotes, setStatus } = noteSlice.actions;
export default noteSlice.reducer;