import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux";
import store from './redux/store'
import App from './App';
import memoryUtils from './utils/memoryUtils'
import storageUtils from './utils/storageUtils'
import './assets/css/index.css';

// 从local中保存user到memory
memoryUtils.user = storageUtils.getUser()

ReactDOM.render(
    <Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>,
    document.getElementById('root')
);

