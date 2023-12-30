import { setLink, setStatus } from "../store/linkSlice";

export function generateLink(link) {
    return function setLinkData(dispatch, getState){
        dispatch(setLink(link))
    }
}