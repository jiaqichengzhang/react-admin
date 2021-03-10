import React, {Component} from 'react';
import {Card,Button,Table,message,Modal} from "antd";
import {PlusOutlined,ArrowRightOutlined} from '@ant-design/icons';
import {reqCategories,reqAddCategory,reqUpdateCategory} from '../../api'
import AddForm  from './components/add-form'
import UpdateForm  from './components/update-form'

class Category extends Component {
    state = {
        categories:[],
        subCategories:[],
        loading:true,
        parentId:"0",
        parentName:"",
        isModalVisible:0,
    }
    columns = [
        {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '操作',
            align:'center',
            width:300,
            render: (category) =>
                <span>
                        <Button type="link" onClick={()=>this.showUpdate(category)}>修改分类</Button>
                    {this.state.parentId === '0' ?
                        <Button type="link" onClick={()=>this.showSubCategories(category)}>查看子分类</Button>
                        :null
                    }
                    </span>
        },
    ];
    getCategories = async ()=>{
        this.setState({
            loading:true
        })
        const res = await reqCategories(this.state.parentId)
        if(res.status === 0){
            const categories = res.data
            this.setState({
                categories,
                loading:false
            })
        }else{
            message.error("获取分类失败！")
        }
    }
    showCategories = ()=>{
        this.setState({
            parentId:"0",
            parentName:""
        },()=>{
            this.getCategories()
        })
    }
    showSubCategories = (category)=>{
        const {_id,name} = category
        this.setState({
            parentId:_id,
            parentName:name
        },()=>{
            this.getCategories()
        })
    }
    showAdd = ()=>{
        this.setState({
            isModalVisible:1
        })
    }
    showUpdate = (category)=>{
        this.category = category
        this.setState({
            isModalVisible:2
        })
    }
    closeModal = ()=>{
        this.setState({
            isModalVisible:0
        })
    }
    addCategory = async (parentId,categoryName)=>{
        this.setState({
            isModalVisible:0
        })
        const res = await reqAddCategory(parentId,categoryName)
        if(res.status === 0){
            message.success("添加成功！")
            this.getCategories();
        }
    }
    updateCategory = async (categoryId,categoryName)=>{
        this.setState({
            isModalVisible:0
        })
        const res = await reqUpdateCategory(categoryId,categoryName)
        if(res.status === 0){
            message.success("修改成功！")
            this.getCategories();
        }

    }
    componentDidMount() {
        this.getCategories();
    }
    render() {
        const category = this.category || {}
        const {categories,loading,parentId,parentName,isModalVisible} = this.state
        const title = parentId === '0' ? "一级分类列表" :
            <span>
                <Button type="link" onClick={this.showCategories}>一级分类列表</Button>
                <ArrowRightOutlined />
                <span>{parentName}</span>
            </span>
        const extra =  parentId === '0' ? <Button type="primary" icon={<PlusOutlined />} onClick={this.showAdd}> 添加 </Button> : null
        return (
            <Card title={title} extra={extra}>
                <Table
                    columns={this.columns}
                    rowKey="_id"
                    dataSource={categories}
                    loading={loading}
                    pagination={{ pageSize:5,showQuickJumper:true}}
                    bordered
                />
                <Modal
                    title="添加分类"
                    visible={isModalVisible===1}
                    onCancel={this.closeModal}
                    footer={null}>
                    <AddForm
                        categories={categories}
                        addCategory={this.addCategory}
                        handleCancel={this.closeModal}
                    />
                </Modal>
                <Modal
                    title="修改分类"
                    visible={isModalVisible===2}
                    onCancel={this.closeModal}
                    footer={null}>
                    <UpdateForm
                        category={category}
                        updateCategory={this.updateCategory}
                        handleCancel={this.closeModal}
                    />
                </Modal>
            </Card>
        );
    }
}

export default Category;
