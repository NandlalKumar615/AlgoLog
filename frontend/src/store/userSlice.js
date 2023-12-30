import { createSlice } from '@reduxjs/toolkit';
import {IDLE} from '../constants/commonConstants'


const myProfileSlice = createSlice({
    name: 'myProfile',
    initialState: {
        myProfileData: {},
        status: IDLE,
        loggedIn: false,
    },
    reducers: {
        setMyProfileData(state, action) {
            state.myProfileData = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setLoggedIn(state, action){
            state.loggedIn = action.payload;
        }
    },
});

export const { setMyProfileData, setStatus, setLoggedIn} = myProfileSlice.actions;
export const myProfileReducer =  myProfileSlice.reducer;


const userActionSlice = createSlice({
    name: 'userAction',
    initialState: {
        receivedData: undefined,
        status: IDLE,
    },
    reducers: {
        setReceivedData(state, action) {
            state.receivedData = action.payload;
        },
        setReceivedDataStatus(state, action) {
            state.status = action.payload;
        },
    },
});

export const { setReceivedData, setReceivedDataStatus } = userActionSlice.actions;
export const userActionReducer =  userActionSlice.reducer;