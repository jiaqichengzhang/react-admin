import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Form, Input,Button} from "antd";
const { Item} = Form;

class UpdateForm extends Component {
    static propTypes = {
        updateCategory:PropTypes.func.isRequired,
        handleCancel:PropTypes.func.isRequired,
        category:PropTypes.object.isRequired
    }
    formRef = React.createRef();
    componentDidUpdate () {
        const {name} = this.props.category
        this.formRef.current.setFieldsValue({
            categoryName:name
        })
    }
    onFinish = (values)=>{
        const {_id} = this.props.category
        this.props.updateCategory(_id,values.categoryName)
        this.formRef.current.setFieldsValue({
            "categoryName": ""
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
                <Item name="categoryName" rules={[{ required: true ,message: '请选择分类'}]}>
                    <Input placeholder="输入分类名称" />
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

export default UpdateForm;
