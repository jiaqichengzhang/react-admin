import React, {Component} from 'react';
import {Card, Table, Button, Modal,message} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import AddUpdateForm from "./components/addUpdate-form";
import {formatDate} from '../../utils/dateUtils'
import {reqUsers,reqAddUser,reqUpdateUser,reqDeleteUser} from "../../api";

class Role extends Component {
    state = {
        users:[],
        roles:[],
        loading:false,
        isModalVisible:false,
        user:null
    }
    columns = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '电话',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            render: (time) => formatDate(time)
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            render: (role_id) => {
                const role = this.state.roles.find(v => v._id === role_id)
                if(role)return role['name']
                return null
            }
        },
        {
            title: '操作',
            align:'center',
            width:200,
            render: (user) =>
                <span>
                    <Button type="link" onClick={()=>{this.setState({isModalVisible:1,user})}}>修改</Button>
                    <Button type="link" onClick={()=>this.deleteUser(user['_id'])}>删除</Button>
                </span>
        },
    ]
    componentDidMount() {
        this.getUsers()
    }
    getUsers = async ()=>{
        this.setState({
            loading:true
        })
        const res = await reqUsers()
        if(res.status === 0){
            const {users,roles} = res.data
            this.setState({
                users,
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
    addUpdateUser = async (params)=>{
        this.closeModal()
        let reqUrl = reqAddUser
        let msg = '添加用户'
        if(params['_id']){
            reqUrl = reqUpdateUser
            msg = '更新用户'
        }
        const res = await reqUrl(params)
        if(res.status === 0){
            message.success(`${msg}成功！`)
            this.setState({
                user:null
            })
            this.getUsers()
        }else{
            message.error(`${msg}失败！`)
        }
    }
    deleteUser = (userId)=>{
        Modal.confirm({
            title: '删除用户',
            icon: <ExclamationCircleOutlined style={{color:'red'}}/>,
            content: '确认删除该用户吗？',
            okText: '确认',
            cancelText: '取消',
            onOk:async ()=>{
                const res = await reqDeleteUser(userId)
                if(res.status === 0){
                    message.success(`删除成功！`)
                    this.getUsers()
                }else{
                    message.error(`删除失败！`)
                }
            }
        });
    }
    render() {
        const  {users,roles,isModalVisible,user} = this.state
        const title = <Button type="primary" onClick={()=>this.setState({isModalVisible:1,user:null})}>添加用户</Button>
        const modalTitle = user ? '修改用户' : '添加用户'
        return (
            <Card title={title}>
                <Table
                    dataSource={users}
                    columns={this.columns}
                    rowKey="_id"
                    pagination={{ pageSize:5,showQuickJumper:true}}
                />
                <Modal
                    title={modalTitle}
                    visible={isModalVisible===1}
                    onCancel={this.closeModal}
                    footer={null}>
                    <AddUpdateForm
                        roles={roles}
                        user={user}
                        addUpdateUser={this.addUpdateUser}
                        handleCancel={this.closeModal}
                    />
                </Modal>
            </Card>
        );
    }
}

export default Role;
