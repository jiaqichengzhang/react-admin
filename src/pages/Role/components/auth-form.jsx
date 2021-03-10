import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Form, Input,Button,Tree} from 'antd';
import menuList from '../../../config/menuConfig'
import memoryUtils from '../../../utils/memoryUtils'
const {Item} = Form
class AuthForm extends Component {
    static propTypes = {
        role:PropTypes.object.isRequired,
        updateRole:PropTypes.func.isRequired,
        handleCancel:PropTypes.func.isRequired
    }
    state = {
        expandedKeys:['all'],// 展开项
        checkedKeys:[],// 选中项

    }
    constructor (props){
        super(props);
        this.treeData = [
            {
                title: '平台权限',
                key: 'all',
                children:menuList,
            }
        ]
    }
    componentDidMount() {
        this.initRole(this.props)
    }
    UNSAFE_componentWillReceiveProps (nextProps) {
        this.initRole(nextProps)
    }
    initRole(props){
        this.setState({
            checkedKeys:props.role.menus,
            expandedKeys:['all',...props.role.menus]
        })
    }
    onFinish = ()=>{
        const params = {
            _id:this.props.role._id,
            menus:this.state.checkedKeys.filter(v=>v!=='all'),
            auth_time:(new Date()).valueOf(),
            auth_name:memoryUtils['user']['username'],

        }
        this.props.updateRole(params)
    }
    onCancel = ()=>{
        this.props.handleCancel()
    }
    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys
        })
    }
    onCheck = (checkedKeys) => {
        this.setState({
            checkedKeys
        })
    }
    render() {
        const {expandedKeys,checkedKeys} = this.state
        const {treeData} = this
        const {name} = this.props.role
        return (
            <Form
                onFinish={this.onFinish}
            >
                <Item label="角色名称">
                    <Input value={name}/>
                </Item>
                <Item>
                    <Tree
                        checkable
                        treeData={treeData}
                        onExpand={this.onExpand}
                        expandedKeys={expandedKeys}
                        onCheck={this.onCheck}
                        checkedKeys={checkedKeys}

                    />
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

export default AuthForm;
