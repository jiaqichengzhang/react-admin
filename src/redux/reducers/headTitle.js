import {SET_HEAD_TITLE} from "../action-types";

const initState = '首页'
export default function headTitleReducer(preState=initState,action){
    const {type,data} = action
    switch (type) {
        case SET_HEAD_TITLE:{
            return data
        }
        default:return preState
    }
}
