import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import Home from './Home'
import Addupdate from './Addupdate'
import Detail from './Detail'
import './index.less'

class Product extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/product" component={Home} exact/>
                    <Route path="/product/addupdate" component={Addupdate}/>
                    <Route path="/product/detail" component={Detail}/>
                    <Redirect to="/product"/>
                </Switch>
            </div>
        );
    }
}

export default Product;
