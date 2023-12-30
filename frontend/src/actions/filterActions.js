import { setFormData, setPageNo} from '../store/filterSlice';

//Fetch Notes

export function getFormData(formData) {
    // console.log(formData)
    return function getData(dispatch, getState) {
        dispatch(setFormData(formData));
    };
}


//Set Page No

export function givePageNo(pageNo) {
    return function setPage(dispatch, getState){
        dispatch(setPageNo(pageNo))
    }
}