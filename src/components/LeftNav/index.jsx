import React, {Component} from 'react';
import { Menu } from 'antd';
import {Link,withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {setHeadTitle} from "../../redux/actions/headTitle";
import menuList from '../../config/menuConfig'
import './index.less'
const { SubMenu } = Menu;

class LeftNav extends Component {
    UNSAFE_componentWillMount() {
        this.getNodeMenu()
        this.getOpenKey()
        this.getTitle()
    }
    getNodeMenu =()=>{
        const {user} = this.props
        // 根据用户权限获取目录
        const menus = user.role.menus // 获取用户权限
        let newMenuList = []
        if(user.username === 'admin'){
            newMenuList = menuList
        }else{
            menuList.forEach((value)=>{
                const key = value['key']
                if(key === 'home'){
                    newMenuList.push(value)
                }else{
                    if(menus.includes(value['key'])){
                        newMenuList.push({...value})
                    }else if(value.hasOwnProperty('children')){
                        const children = value['children']
                        let newChildren = []
                        children.forEach(child =>{
                            if(menus.includes(child['key'])){
                                newChildren.push(child)
                            }
                        })
                        if(newChildren.length>0){
                            newMenuList.push({...value,children})
                        }
                    }
                }
            })
        }

        this.nodeMenu = (
            newMenuList.map(item =>{
                return (
                    item.children ?
                        <SubMenu key={item.key} icon={item.icon} title={item.title}>
                            {item.children.map(subItem =>
                                <Menu.Item key={subItem.key} icon={subItem.icon}>
                                    <Link to={subItem.key} onClick={()=>this.getTitle(subItem.title)}>{subItem.title} </Link>
                                </Menu.Item>

                            )}
                        </SubMenu>
                        :
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key} onClick={()=>this.getTitle(item.title)}>{item.title}</Link>
                        </Menu.Item>

                )
            })
        )
    }
    getOpenKey =()=>{
        const path = this.props.location.pathname
        this.openKey = (menuList.find(item =>path.indexOf(item.key)===0)||{})['key']
        if(path.indexOf('product')===0 || path.indexOf('category')===0){
            this.openKey = 'products'
        }
    }
    getTitle = (title) =>{
        if(!title){
            const path = this.props.location.pathname
            menuList.forEach(item =>{
                if(item.key === path)title = item.title;
                else if('children' in item){
                    item.children.forEach(subItem =>{
                        if(subItem.key === path)title = subItem.title;
                    })
                }
            })
            title = title || '首页'
        }
        this.props.setHeadTitle(title)
    }
    render() {
        const {nodeMenu,openKey} = this
        let selectKey = this.props.location.pathname
        if(selectKey === 'product/addupdate' || selectKey === 'product/detail'){
            selectKey = 'product'
        }
       /* console.log("selectKey",selectKey)
        console.log("openKey",openKey)*/
        return (
            <Menu
                className="leftNav"
                defaultSelectedKeys={['home']}
                theme="dark"
                mode="inline"
                selectedKeys={[selectKey]}
                defaultOpenKeys={[openKey]}
            >
                {nodeMenu}
            </Menu>
        );
    }
}

export default connect(
    state => ({
        user:state.user
    }),
    {setHeadTitle}
)(withRouter(LeftNav));
