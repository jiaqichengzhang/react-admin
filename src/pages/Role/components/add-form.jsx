import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Form, Input,Button,Tooltip} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons'
const { Item} = Form;

class AddForm extends Component {
    static propTypes = {
        addRole:PropTypes.func.isRequired,
        handleCancel:PropTypes.func.isRequired
    }
    constructor (props){
        super(props);
        this.formRef = React.createRef();
    }
    onFinish = (values)=>{
        this.props.addRole(values.roleName)
        this.formRef.current.setFieldsValue({
            "roleName": ""
        })
    }
    onCancel = ()=>{
        this.props.handleCancel()
    }
    render() {
        return (
            <Form
                onFinish={this.onFinish}
                ref={this.formRef}
            >
                <Item
                    name="roleName"
                    label={
                        <span>角色名称&nbsp;
                            <Tooltip title="最长为24位">
                                <QuestionCircleOutlined />
                            </Tooltip>
                        </span>
                    }
                    rules={[{ required: true,message: '请输入角色名称',whitespace: true},{max:24,message: '最长为24位'}]}
                >
                    <Input placeholder="输入角色名称" />
                </Item>
                <Item style={{ textAlign: 'right' }}>
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

export default AddForm;
