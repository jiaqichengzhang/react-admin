import {combineReducers} from "redux";
import headTitle from './headTitle'
import user from './user'

// combineReducers 传入对象，是redux维护的总状态
export default combineReducers({
    headTitle,
    user
})
