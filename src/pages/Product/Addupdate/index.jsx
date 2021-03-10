import React, {Component} from 'react';
import {Card,Button,Form, Input,message,Cascader} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {reqCategories,reqAddProduct,reqUpdateProduct} from "../../../api";
import PicturesWall from '../components/PicturesWall'
import RichTextEditor from '../components/RichTextEditor'
const {Item} = Form
const {TextArea} = Input
class Addupdate extends Component {
    state = {
        options:[],
        initialValues:{},
        updateId:null,
    }
    constructor(props) {
        super(props);
        this.pw = React.createRef()
        this.editor = React.createRef()
    }
    componentDidMount() {
        this.initOptions()
    }
    static getDerivedStateFromProps(props,state){
        const product = props.location.state
        if (product) { //更新
            const updateId = product['_id']
            const initialValues= {
                name: product['name'],
                desc: product['desc'],
                price: product['price'],
                categoryIds: [],
                imgs: product['imgs'],
                detail: product['detail'],
            }
            if (product['pCategoryId'] === '0') initialValues.categoryIds = [product['categoryId']]
            else initialValues.categoryIds = [product['pCategoryId'], product['categoryId']]
            state['updateId'] = updateId
            state['initialValues'] = initialValues
            return state;
        }else{
            return null;
        }
    }
    initOptions = async ()=>{
        const {updateId,initialValues} = this.state
        if(updateId && initialValues['categoryIds'][0] !== '0'){
            const [pCategoryId] = initialValues['categoryIds']
            const datas = await Promise.all([this.getCategories('0'),this.getCategories(pCategoryId)])
            const options = datas[0].map(v =>{
                const item = {
                    value: v['_id'],
                    label: v['name'],
                    isLeaf: false,
                }
                if( v['_id'] === pCategoryId){
                    item['children'] =  datas[1].map(v1 =>(
                        {
                            label: v1['name'],
                            value: v1['_id'],
                        }
                    ))
                }
                return item
            })
            this.setState({
                options
            })
        }else{
            const data = await this.getCategories('0')
            const options = data.map(v =>({
                value: v['_id'],
                label: v['name'],
                isLeaf: false,
            }))
            this.setState({
                options
            })
        }
    }
    loadOptions = async (selectedOptions )=>{
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        const data = await this.getCategories(targetOption.value)
        targetOption.loading = false;
        if(data.length>0){
            targetOption.children = data.map(v =>(
                {
                    label: v['name'],
                    value: v['_id'],
                }
            ))
        }else{
            targetOption['isLeaf'] = true
        }
        this.setState({
            options:[...this.state.options]
        },()=>{
            console.log(this.state.options)
        })
    }
    getCategories = async (parentId)=>{
        const res = await reqCategories(parentId)
        if(res.status === 0){
            const data = res.data
            return data
        }else {
            return [];
        }
    }
    onFinish = async (values)=>{
        const imgs = this.pw.current.getImgs()
        values['imgs'] = imgs
        const detail = this.editor.current.getEditorState()
        values['detail'] = detail
        if(values['categoryIds'].length === 2){
            values['pCategoryId'] = values['categoryIds'][0]
            values['categoryId'] = values['categoryIds'][1]
        }else{
            values['pCategoryId'] = '0'
            values['categoryId'] = values['categoryIds'][0]
        }
        delete values['categoryIds']
        let reqUrl = reqAddProduct
        let msg = '添加商品'
        if(this.state.updateId) {
            values['_id'] = this.updateId
            reqUrl = reqUpdateProduct
            msg = '修改商品'
        }
        const res = await reqUrl(values)
        if(res.status === 0){
            message.success(msg+'成功！')
            this.props.history.push('/product')
        }else{
            message.error(msg+'失败！')
        }
    }
    validatePrice = (rule, value, callback)=>{
        if(value<=0) {
            return Promise.reject("商品价格必须大于0")
        }
        return Promise.resolve()
    }
    layout = {
        labelCol: {
            span: 2,
        },
        wrapperCol: {
            span: 10,
        },
    };

    render() {
        const {options,initialValues,updateId} = this.state
        const {imgs,detail} = initialValues
        const title =(
            <span>
                <Button type="link" onClick={()=>this.props.history.goBack()}>
                    <ArrowLeftOutlined/>
                </Button>{updateId ? '修改商品':'添加商品'}
            </span>
        )

        return (
            <Card className="product-add" title={title}>
                <Form
                    {...this.layout}
                    initialValues={initialValues}
                    onFinish={this.onFinish}
                >
                    <Item
                        label="商品名称"
                        name="name"
                        rules={[{ required: true, message: '请输入商品名称！' }]}
                    >
                        <Input placeholder="请输入商品名称"/>
                    </Item>
                    <Item
                        label="商品描述"
                        name="desc"
                        rules={[{ required: true, message: '请输入商品描述!' }]}
                    >
                        <TextArea  placeholder="请输入商品描述"/>
                    </Item>
                    <Item
                        label="商品价格"
                        name="price"
                        rules={[{ required: true, message: '请输入商品价格!' },{validator: this.validatePrice}]}
                    >
                        <Input type="number" addonAfter="元" placeholder="请输入商品价格"/>
                    </Item>
                    <Item
                        label="商品分类"
                        name="categoryIds"
                    >
                        <Cascader options={options} loadData={this.loadOptions} placeholder="请选择商品分类" />
                    </Item>
                    <Item
                        label="商品图片"
                        name="imgs"
                    >
                        <PicturesWall
                            imgs={imgs}
                            ref={this.pw}
                        />
                    </Item>
                    <Item
                        label="商品详情"
                        wrapperCol={{span:16}}
                    >
                        <RichTextEditor
                            editorState={detail}
                            ref={this.editor}
                        />
                    </Item>

                    <Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Addupdate;
