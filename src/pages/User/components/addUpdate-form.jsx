import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Form, Input,Button,Select } from 'antd';
const {Password } = Input
const { Item} = Form;
const {Option} = Select

class AddUpdateForm extends Component {
    static propTypes = {
        roles:PropTypes.array.isRequired,
        addUpdateUser:PropTypes.func.isRequired,
        handleCancel:PropTypes.func.isRequired
    }
    layout = {
        labelCol: { span: 4},
        wrapperCol: { span: 20 },
    };
    constructor (props){
        super(props);
        this.formRef = React.createRef();
    }
    componentDidMount() {
        this.initForm()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
       this.initForm()
    }
    initForm = ()=>{
        const {user} = this.props
        this.formRef.current.setFieldsValue(user)
    }
    onFinish = (values)=>{
        const {user} = this.props
        if(user) values['_id'] = user._id
        this.props.addUpdateUser(values)
        this.formRef.current.setFieldsValue({
            username:'',
            password:'',
            phone:'',
            email:'',
            role_id:'',
        })
    }
    onCancel = ()=>{
        this.props.handleCancel()
    }
    render() {
        const {roles} = this.props
        const {user} = this.props
        return (
            <Form
                {...this.layout}
                onFinish={this.onFinish}
                ref={this.formRef}
            >
                <Item
                    name="username"
                    label="用户名"
                    rules={[{ required: true,message: '请输入用户名'}]}>
                    <Input placeholder="请输入用户名" />
                </Item>
                {
                    user ? null :(
                        <Item
                            name="password"
                            label="密码"
                            rules={[{ required: true,message: '请输入密码'}]}>
                            <Password placeholder="请输入密码"/>
                        </Item>
                        )
                }
                <Item
                    name="phone"
                    label="手机号"
                    rules={[{ required: true,message: '请输入手机号'}]}>
                    <Input placeholder="请输入手机号" />
                </Item>
                <Item
                    name="email"
                    label="邮箱"
                    rules={[{ required: true,message: '请输入邮箱'}]}>
                    <Input placeholder="请输入邮箱" />
                </Item>
                <Item
                    name="role_id"
                    label="角色">
                    <Select
                        placeholder="请选择角色"
                        allowClear>
                        {roles.map(v=><Option key={v._id} value={v._id}>{v.name}</Option>)}
                    </Select>
                </Item>
                <Item
                    style={{ textAlign: 'right' }}
                    wrapperCol={{ span: 24}}
                >
                    <Button htmlType="button" onClick={this.onCancel}>
                        取消
                    </Button>
                    <Button type="primary" htmlType="submit" style={{ margin: '0 8px' }}>
                        确定
                    </Button>
                </Item>
            </Form>
        );
    }
}

export default AddUpdateForm;
