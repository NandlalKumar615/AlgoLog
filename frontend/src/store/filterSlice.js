import { createSlice } from '@reduxjs/toolkit';
import {IDLE} from '../constants/commonConstants'

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        formData : {},
        pageNo : 1,
    },
    reducers: {
        setFormData(state, action) {
            state.formData = action.payload;
        },
        setPageNo(state, action){
            state.pageNo = action.payload;
        }
    },
});

export const {setFormData, setPageNo} = filterSlice.actions;
export default filterSlice.reducer;