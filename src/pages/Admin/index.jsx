import React, {Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import {Layout} from "antd";
import {connect} from 'react-redux';
import LeftNav from '../../components/LeftNav'
import Header from '../../components/Header'
import Home from '../../pages/Home'
import Product from '../../pages/Product'
import Category from '../../pages/Category'
import Role from '../../pages/Role'
import User from '../../pages/User'
import Bar from '../../pages/Charts/Bar'
import Line from '../../pages/Charts/Line'
import Pie from '../../pages/Charts/Pie'
import NotFound from '../../pages/NotFound'

const{Footer,Sider,Content}=Layout
class Admin extends Component {
    render() {
        const user = this.props.user
        if(!user || !user._id) return <Redirect to="/Login"/>
        return (
            <Layout style={{height:"100%"}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{backgroundColor:'white',margin:'20px 20px 0',overflow:'auto'}}>
                        <Switch>
                            <Redirect exact from='/' to='/home'/>
                            <Route path='/home' component={Home}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Route component={NotFound}/> {/*上面没有匹配直接跳转到这里*/}
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#aaaaaa'}}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        );
    }
}

export default connect(
    state => ({
        user:state.user
    })
)(Admin);
