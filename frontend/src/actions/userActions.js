import {IDLE,ERROR,LOADING} from '../constants/commonConstants'
import {setMyProfileData, setStatus} from '../store/userSlice'
import { setReceivedData, setReceivedDataStatus, setLoggedIn} from '../store/userSlice';
import {toast} from 'react-toastify';


import axios from 'axios';


//Fetch Profile Data

export function fetchMyProfile() {

    let link = `/api/v1/me`;

    return async function fetchMyProfileThunk(dispatch, getState) {
        dispatch(setStatus(LOADING));
        try {
            const response = await axios.get(link);
            const data = response.data;
            // console.log(data)
            dispatch(setMyProfileData(data));
            dispatch(setStatus(IDLE));
        } catch (err) {
            console.log(err);
            dispatch(setStatus(ERROR));
        }
    };
}

export function executeUserAction(link,type,payload,nextCall){

    return async function doUserAction(dispatch, getState){
        dispatch(setReceivedDataStatus(LOADING));
        // event.preventDefault();
        try {
            // const formData = new FormData(event.target);
            // const formValues = Object.fromEntries(formData.entries());
            const config = {
                headers: { "Content-Type": "application/json" },
            };
            const notify = {
                pending: {
                    render(){
                      return "Processing your request ⌛"
                    },
                    icon: true,
                  },
                  success: {
                    render({data}){
                        // console.log(data);
                      return `${data.data.message}`
                    },
                    icon: true,
                  },
            }


            let response = undefined;
            if(type==="put"){
                response = await toast.promise(axios.put(link, payload, config),notify);
            }
            if(type==="get"){
                response = await toast.promise(axios.get(link),notify);
            }
            if(type==="post"){
                response = await toast.promise(axios.post(link, payload, config),notify);
            }

            const receivedData = response.data
            // console.log(receivedData)
            dispatch(setReceivedData(receivedData))   // Till Now no use ********
            dispatch(setReceivedDataStatus(IDLE))
            if(nextCall){
                nextCall()
            }
            // nextCall? nextCall():null
            // console.log(nextCall)
          } catch (error) {
            const response = error.response;
            // console.log(error)
            // console.log(data.status)
            // console.log(data)
            if(response.status === 400){
                toast.info(`${response.data.message}`)
            }else{
                toast.error(`${response.data.message} ☹️`)
            }
            dispatch(setReceivedDataStatus(ERROR))
          }
    }
}


// export async function getLoginData(event) {
//     event.preventDefault();
//     try {
//       const formData = new FormData(event.target);
//       const formValues = Object.fromEntries(formData.entries());
//       const res = await axios.post('api/v1/login', formValues);
//       console.log(res.data); // Response data from the server
//       event.target.reset();
//     } catch (error) {
//       console.log(error.response.data.message);
//     }
//   }