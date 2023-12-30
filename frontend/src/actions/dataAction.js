import {IDLE,ERROR,LOADING} from '../constants/commonConstants'
import { setData,setStatus } from '../store/dataSlice';


import axios from 'axios';


//Fetch Profile Data

export function fetchData(link) {

    // let link = `/api/v1/me`;

    return async function fetchDataThunk(dispatch, getState) {
        dispatch(setStatus(LOADING));
        try {
            const response = await axios.get(link);
            const data = response.data;
            // console.log(data)
            dispatch(setData(data));
            dispatch(setStatus(IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(ERROR));
        }
    };
}