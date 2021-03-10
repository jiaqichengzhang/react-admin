/*
 发送ajax请求的函数模块
     包装axios
     返回promise对象
     统一处理请求异常
     异步返回数据
*/
import axios from 'axios'
import {message} from "antd"

export default function ajax(url,data = {},method = 'GET') {
    return new Promise(function (resolve,reject) {
        let promise
        if(method === 'GET'){
            promise = axios.get(url,{params:data}) // params配置指定的是query参数
        }else{
            promise = axios.post(url,data)
        }
        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('请求错误：' + error.message)
        })
    })
}
