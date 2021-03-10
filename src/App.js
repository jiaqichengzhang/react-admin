import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import Login from './pages/Login'
import Admin from './pages/Admin'

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" component={Admin}/>
                <Redirect to="/"/>
            </Switch>
        );
    }
}
