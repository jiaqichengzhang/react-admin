import React, {Component} from 'react';
import {Card,Button,List} from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons';
import {IMG_URL} from '../../../utils/constants'
import {reqCategory} from '../../../api'
const {Item} = List
class Detail extends Component {
    state = {
        cName1:"",
        cName2:"",
    }
    async componentDidMount() {
        const {pCategoryId,categoryId} = this.props.location.state
        if(pCategoryId === '0'){
            const data = await reqCategory(categoryId)
            const {name:cName1} = data['data']
            this.setState({
                cName1
            })
        }else{
            // 一次发送多个请求，只有成功了才处理
            const data =await Promise.all([reqCategory(pCategoryId),reqCategory(categoryId)])
            const {name:cName1} = data[0]['data']
            const {name:cName2} = data[1]['data']
            this.setState({
                cName1,
                cName2
            })
        }}

    render() {
        const {cName1,cName2} = this.state
        const {name,desc,price,detail,imgs} = this.props.location.state
        const title =(
            <span>
                <Button type="link" onClick={()=>this.props.history.goBack()}>
                    <ArrowLeftOutlined/>
                </Button>商品详情
            </span>
        )

        return (
            <Card className="product-detail" title={title}>
                <List>
                    <Item className="item">
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                </List>
                <List>
                    <Item className="item">
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                </List>
                <List>
                    <Item className="item">
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                </List>
                <List>
                    <Item className="item">
                        <span className="left">所属分类:</span>
                        <span>{cName1}{cName2 ? `-->${cName2}`:null}</span>
                    </Item>
                </List>
                <List>
                    <Item className="item">
                        <span className="left">商品图片:</span>
                        <span>
                            {
                                imgs.map(v=> <img key={v} className="product-img" alt="product-img" src={IMG_URL+v}/>)
                            }
                        </span>
                    </Item>
                </List>
                <List>
                    <Item className="item">
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}>
                        </span>
                    </Item>
                </List>
            </Card>
        );
    }
}

export default Detail;
