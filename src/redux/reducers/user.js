import {RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER} from "../action-types";
import storageUtils from '../../utils/storageUtils'

const initState = storageUtils.getUser() || {}
export default function headTitleReducer(preState=initState,action){
    const {type,data} = action
    switch (type) {
        case RECEIVE_USER:{
            return data
        }
        case SHOW_ERROR_MSG:{
            return {...preState,errorMsg:data}
        }
        case RESET_USER:{
            return {}
        }
        default:return preState
    }
}
