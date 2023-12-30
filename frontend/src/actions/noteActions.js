// import { useSelector } from 'react-redux';
import {IDLE,ERROR,LOADING,MY_NOTES,EXPLORE_NOTES,REVISION_NOTES,FAVOURITE_NOTES} from '../constants/commonConstants'
import {setNotes, setStatus} from '../store/noteSlice'

// import { UseSelector } from 'react-redux/es/hooks/useSelector';

import axios from 'axios';


//Fetch Notes

// const { formData} = useSelector((state)=>state.form)


export function fetchNotes(formData, pageNo, type) {

    // console.log(formData)

    let link = `api/v1/`;

    if(type===EXPLORE_NOTES){
        link += `notes/`
    }
    if(type===MY_NOTES){
        link += `notes/myNotes`
    }
    if(type===REVISION_NOTES){
        link += `notes/revisionNotes`
    }
    if(type===FAVOURITE_NOTES){
        link += `notes/favouriteNotes`
    }

    if(formData.limit){
        link+=`?limit=${formData.limit}`
    }else{
        link+=`?limit=12`
    }
    if(pageNo){
        link+=`&page=${pageNo}`
    }
    if(formData.keyword){
        link+=`&keyword=${formData.keyword}`
    }
    if(formData.Basic){
        link+=`&difficulty=Basic`     
    }
    if(formData.Easy){
        link+=`&difficulty=Easy`
    }
    if(formData.Medium){
        link+=`&difficulty=Medium`
    }
    if(formData.Hard){
        link+=`&difficulty=Hard`
    }
    if(formData.Arrays){
        link+=`&topic=Arrays`
    }
    if(formData.Linked_List){
        link+=`&topic=Linked_List`
    }
    if(formData.Stack){
        link+=`&topic=Stack`
    }
    if(formData.Queue){
        link+=`&topic=Queue`
    }
    if(formData.Recursion){
        link+=`&topic=Recursion`
    }
    if(formData.Binary_Tree){
        link+=`&topic=Binary_Tree`
    }
    if(formData.Greedy_Algorithm){
        link+=`&topic=Greedy_Algorithm`
    }
    if(formData.Binary_Search){
        link+=`&topic=Binary_Search`
    }
    if(formData.Binary_Search_Tree){
        link+=`&topic=Binary_Search_Tree`
    }
    if(formData.Graph){
        link+=`&topic=Graph`
    }
    if(formData.Trie){
        link+=`&topic=Trie`
    }
    if(formData.Arrays){
        link+=`&topic=Dynamic_Programming`
    }
    
    // console.log(link);
    // console.log(pageNo);



    return async function fetchNoteThunk(dispatch, getState) {
        dispatch(setStatus(LOADING));
        try {
            const response = await axios.get(link);
            const data = response.data;
            dispatch(setNotes(data));
            dispatch(setStatus(IDLE));
        } catch (err) {
            // console.log(err);
            dispatch(setStatus(ERROR));
        }
    };
}