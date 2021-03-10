import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Button,Modal} from 'antd'
import {connect} from 'react-redux';
import {logout} from '../../redux/actions/user'
import {formatDate} from '../../utils/dateUtils'
import {reqWeather} from '../../api'
import './index.less'

class Header extends Component {
    state = {
        currentTime:formatDate(),
        weahter:'',
        title:''
    }
    // 生命周期
    componentDidMount() {
        this.getTime()
        this.getWeather()
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    getTime = () =>{
        this.timer = setInterval(()=>{
            this.setState({
                currentTime:formatDate()
            })
        },1000)
    }
    getWeather = async () =>{
        // 调用接口请求异步获取数据
        const {lives} = await reqWeather()
        const weahter = lives[0]['weather'] + ' | ' + lives[0]['temperature'] + '℃';
        this.setState({weahter})
    }

    logout = ()=>{
        Modal.confirm({
            content: '确定退出吗?',
            onOk: () => {
                this.props.logout()
                this.props.history.replace("login")
            }
        })
    }
    render() {
        const {user,headTitle} = this.props
        const username = user.username
        const title = headTitle
        const {currentTime,weahter} = this.state
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎, {username}</span>
                    <Button type="link" onClick={this.logout}>退出</Button>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        &nbsp;&nbsp;
                        <span>{weahter}</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    state => ({
        user:state.user,
        headTitle:state.headTitle,
    }),
    {logout}
)(withRouter(Header));
