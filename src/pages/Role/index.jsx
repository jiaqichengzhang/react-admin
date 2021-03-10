import React, {Component, Fragment} from 'react';
import {Card, Table, Button, Modal,message} from "antd";
import {connect} from 'react-redux';
import {logout} from '../../redux/actions/user'
import {formatDate} from '../../utils/dateUtils'
import {isEmpty} from '../../utils/commonUtils'
import AddForm from "./components/add-form";
import AuthForm from "./components/auth-form";
import {reqRoles,reqAddRole,reqUpdateRole} from "../../api";

class Role extends Component {
    state = {
        roles:[],
        loading:false,
        isModalVisible:false,
        selectedRole:{},
    }
    columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
        },
        {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (time) => formatDate(time)
        },
        {
            title: '授权时间',
            dataIndex: 'auth_time',
            render: (time) => formatDate(time)
        },
        {
            title: '授权人',
            dataIndex: 'auth_name',
        },
    ]
    componentDidMount() {
        this.getRoles()
    }
    getRoles = async ()=>{
        this.setState({
            loading:true
        })
       const res = await reqRoles()
       if(res.status === 0){
           const roles = res.data
           this.setState({
               roles,
               loading:false,
           })
       }
    }
    closeModal = ()=>{
        this.setState({
            isModalVisible:0
        })
    }
    handleChange = (_,[selectedRole]) =>{
        const selectedKeys = [selectedRole['_id']]
        this.setState({
            selectedKeys,
            selectedRole
        })
    }
    addRole = async (roleName)=>{
        this.closeModal()
        const res = await reqAddRole(roleName)
        if(res.status === 0){
            message.success('创建角色成功')
            this.getRoles()
        }else{
            message.error('创建角色成功')
        }
    }
    updateRole = async (params)=>{
        this.closeModal()
        const {_id,menus,auth_time,auth_name} = params;
        const res = await reqUpdateRole(_id,menus,auth_time,auth_name)
        if(res.status === 0){
            if(this.props.user.role_id === _id){
                message.success('当前角色权限设置成功')
                this.props.logout()
            }else{
                message.success('角色权限设置成功')
                this.setState({
                    selectedKeys:[],
                    selectedRole:{}
                })
                this.getRoles()
            }
        }else{
            message.error('角色权限设置失败')
        }
    }
    render() {
        const  {roles,isModalVisible,selectedRole,selectedKeys} = this.state
        const title =  (
            <Fragment>
                <Button type="primary" style={{marginRight:"10px"}} onClick={()=>this.setState({isModalVisible:1})}>创建角色</Button>
                <Button type="primary" disabled={isEmpty(selectedRole) ? true : false} onClick={()=>this.setState({isModalVisible:2})}>设置角色权限</Button>
            </Fragment>
        )
        return (
            <Card title={title}>
                <Table
                    rowSelection={{
                        type: "radio",
                        selectedRowKeys:selectedKeys,
                        onChange: this.handleChange ,
                        getCheckboxProps: (record) => ({
                            disabled: record.name === 'superAdmin'
                        }),
                    }}
                    dataSource={roles}
                    columns={this.columns}
                    rowKey="_id"
                    pagination={{ pageSize:5,showQuickJumper:true}}
                />
                <Modal
                    title="创建角色"
                    visible={isModalVisible===1}
                    onCancel={this.closeModal}
                    footer={null}>
                    <AddForm
                        addRole={this.addRole}
                        handleCancel={this.closeModal}
                    />
                </Modal>
                <Modal
                    title="设置角色权限"
                    visible={isModalVisible===2}
                    onCancel={this.closeModal}
                    footer={null}>
                    <AuthForm
                        role={selectedRole}
                        updateRole={this.updateRole}
                        handleCancel={this.closeModal}
                    />
                </Modal>
            </Card>
        );
    }
}

export default connect(
    state => ({
        user:state.user
    }),
    {logout}
)(Role);
