import React, {Component} from 'react';
import {Card,Button,Table,Input,Select,message} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {reqProducts,reqSearchProducts,reqUpdateProductStatus} from "../../../api";
import {PAGE_SIZE} from "../../../utils/constants";

const {Option} = Select
class Home extends Component {
    state = {
        products:[],
        loading:false,
        total:0,
        searchType:'productName',
        searchName:'',
    }
    currentPage =1
    columns = [
        {
            title: '商品名称',
            dataIndex: 'name',
        },
        {
            title: '商品描述',
            dataIndex: 'desc',
        },
        {
            title: '价格',
            dataIndex: 'price',
            render: (price) =>'￥'+price
        },
        {
            title: '状态',
            dataIndex: 'status',
            width:100,
            render: (status,product) =>(
                status === 1 ?(
                    <span>
                        <Button type="primary" onClick={()=>this.updateProduct(product._id,2)}>上架</Button>
                        <span>已下架</span>
                    </span>
                    ) :(
                    <span>
                        <Button type="primary" onClick={()=>this.updateProduct(product._id,1)}>下架</Button>
                        <span>已在售</span>
                    </span>
                    )



            )
        },
        {
            title: '操作',
            align:'center',
            width:100,
            render: (product) =>
                <span>
                    <Button type="link" onClick={()=>this.props.history.push({pathname:"/product/detail",state:product})}>详情</Button>
                    <Button type="link" onClick={()=>this.props.history.push({pathname:"/product/addupdate",state:product})}>修改</Button>
                </span>
        },
    ]
    componentDidMount() {
        this.getProducts()
    }
    handleSelectChange = (searchType)=>{
        this.setState({
            searchType
        })
    }
    handleInputChange = (e)=>{
        this.setState({
            searchName:e.target.value
        })
    }
    updateProduct = async (productId,status)=>{
        const res = await reqUpdateProductStatus(productId,status)
        if(res.status === 0){
            message.success("操作成功！")
            this.getProducts()
        }
    }
    getProducts = async(page)=>{
        const {searchName,searchType} = this.state
        this.currentPage=page||this.currentPage
        this.setState({
            loading:true
        })
        const params = {pageNum:this.currentPage,pageSize:PAGE_SIZE}
        let reqFun =  reqProducts
        if(searchName){
            params[searchType]=searchName
            reqFun =  reqSearchProducts
        }
        const res = await reqFun(params)
        if(res.status === 0){
            this.setState({
                loading:false,
                products:res.data.list,
                total:res.data.total,
            })
        }else{
            message.error("请求失败!")
        }

    }
    render() {
        const {products,loading,total} = this.state
        const title =(
            <span>
                <Select defaultValue="productName" onChange={this.handleSelectChange} style={{width:150}}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input onChange={this.handleInputChange} placeholder="输入关键字" style={{width:150,margin:"0 15px"}} />
                <Button type="primary" onClick={()=>this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra = <Button type="primary" icon={<PlusOutlined />} onClick={()=>this.props.history.push('/product/addupdate')}> 添加 </Button>
        const pagination={
            pageSize:PAGE_SIZE,
            current:this.currentPage,
            total,
            showQuickJumper:true,
            onChange:this.getProducts,
            showTotal:()=><span>共{total}条</span>
        }

        return (
            <Card title={title} extra={extra}>
                <Table
                    columns={this.columns}
                    rowKey="_id"
                    dataSource={products}
                    loading={loading}
                    pagination={pagination}
                    bordered
                />
            </Card>
        );
    }
}

export default Home;
