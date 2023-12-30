import { createSlice } from '@reduxjs/toolkit';
import {IDLE} from '../constants/commonConstants'

const linkSlice = createSlice({
    name: 'linkURL',
    initialState: {
        link: "",
        status: IDLE,
    },
    reducers: {
        setLink(state, action) {
            state.link = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setLink, setStatus } = linkSlice.actions;
export default linkSlice.reducer;