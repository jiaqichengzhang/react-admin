import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Form, Input, Select,Button} from 'antd';
const { Item} = Form;
const { Option } = Select;

class AddForm extends Component {
    static propTypes = {
        addCategory:PropTypes.func.isRequired,
        handleCancel:PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.formRef = React.createRef();
    }
    onFinish = (values)=>{
        this.props.addCategory(values.parentId,values.categoryName)
        this.formRef.current.setFieldsValue({
            "categoryName": ""
        })
    }
    onCancel = ()=>{
        this.props.handleCancel()
    }
    render() {
        const {categories} = this.props
        return (
            <Form
                onFinish={this.onFinish}
                ref={this.formRef}
            >
                <Item name="parentId" label="分类" initialValue="0"  rules={[{ required: true,message: '请选择分类'}]}>
                    <Select>
                        <Option value="0">一级分类</Option>
                        {categories.map(v => <Option key={v._id} value={v._id}>{v.name}</Option>)}
                    </Select>
                </Item>
                <Item name="categoryName" label="名称" rules={[{ required: true,message: '请输入名称'}]}>
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

export default AddForm;
