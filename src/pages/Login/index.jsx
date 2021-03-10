import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import { Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import {login} from '../../redux/actions/user'
import "./index.less"
import logo from '../../assets/images/logo.png'

class Login extends Component {
    state = {
        username:"admin",
        password:"admin",
    }
    login = async (values)=>{
        this.props.login(values.username,values.password)
    }
    handleUsername(rule, value, callback){
        const length=value && value.length
        if(!value){
            return Promise.reject('必须输入用户名')
        }else if(length<4){
            return Promise.reject('用户名必须大于4位')
        }else if(length>12){
            return Promise.reject('用户名必须小于12位')
        }
        return Promise.resolve();
    }
    handlePassword(rule, value, callback){
        const length=value && value.length
        const pwdReg=/^[a-zA-Z0-9_]+$/
        if(!value){
            return Promise.reject('必须输入密码')
        }else if(length<4){
            return Promise.reject('密码必须大于4位')
        }else if(length>12){
            return Promise.reject('密码必须小于12位')
        }else if(!pwdReg.test(value)){
            return Promise.reject('密码必须是英文、数组或下划线组成')
        }
        return Promise.resolve();
    }
    render() {
        const {username,password} = this.state
        // 如果用户已经登录-自动条状
        const user = this.props.user
        if(user && user._id) {
            return <Redirect to="/home"/>
        }

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <div className={user.errorMsg ? 'error-msg show':'error-msg'}>{user.errorMsg}</div>
                    <h2>用户登陆</h2>
                    <Form className="login-form" onFinish={this.login}>
                        <Form.Item
                            name="username"
                            initialValue={username}
                            rules={[{ validator: (rule, value, callback) => this.handleUsername(rule, value, callback) }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="用户名" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            initialValue={password}
                            rules={[{ validator: (rule, value, callback) => this.handlePassword(rule, value, callback) }]}
                        >
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="密码"/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>

            </div>
        );
    }
}
export default connect(
    state => ({
        user:state.user
    }),
    {login}
)(Login);
