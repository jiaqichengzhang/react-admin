import {RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER} from "../action-types";
import storageUtils from '../../utils/storageUtils'
import {reqLogin} from "../../api";

export const receiveUser = (user)=>({type:RECEIVE_USER,data:user})
export const showErrorMsg = (errorMsg)=>({type:SHOW_ERROR_MSG,data:errorMsg})
export const logout = ()=>{
    storageUtils.removeUser()
    return {type:RESET_USER}
}

export const login = (username,password) =>{
    return async (dispatch) =>{
        const res = await reqLogin(username,password)
        if(res.status === 0){
            const user = res.data
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        }else{
            const msg = res.msg
            dispatch(showErrorMsg(msg))
        }
    }
}

