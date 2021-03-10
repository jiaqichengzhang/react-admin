/*
 接口请求函数配置模块
 每个函数返回promise
*/
import ajax from './ajax'

// 登录
export const reqLogin = (username,password) => ajax("/api/login",{username,password},'POST')
// 获取天气信息
export const reqWeather = () => ajax("https://restapi.amap.com/v3/weather/weatherInfo",{key:'d086c35d8988ef025692949832821ae3',city:'110000'})
// 获取商品分类列表
export const reqCategories = (parentId) => ajax("/api/manage/category/list",{parentId},'GET')
// 添加分类
export const reqAddCategory = (parentId,categoryName) => ajax("/api/manage/category/add",{parentId,categoryName},'POST')
// 修改分类
export const reqUpdateCategory = (categoryId,categoryName) => ajax("/api/manage/category/update",{categoryId,categoryName},'POST')
// 商品列表
export const reqProducts = (params) => ajax("/api/manage/product/list",params,'GET')
// 商品列表（根据关键字）
export const reqSearchProducts = (params) => ajax("/api/manage/product/search",params,'GET')
// 根据分类ID获取分类
export const reqCategory = (categoryId) => ajax("/api/manage/category/info",{categoryId},'GET')
// 更新商品上架/下架
export const reqUpdateProductStatus= (productId,status) => ajax("/api/manage/product/updateStatus",{productId,status},'POST')
// 删除图片
export const reqDeleteImg= (name) => ajax("/api/manage/img/delete",{name},'POST')
// 添加商品
export const reqAddProduct= (params) => ajax("/api/manage/product/add",params,'POST')
// 修改商品
export const reqUpdateProduct= (params) => ajax("/api/manage/product/update",params,'POST')
// 获取角色列表
export const reqRoles= () => ajax("/api/manage/role/list",{},'GET')
// 添加角色
export const reqAddRole= (roleName) => ajax("/api/manage/role/add",{roleName},'POST')
// 修改角色
export const reqUpdateRole= (_id,menus,auth_time,auth_name) => ajax("/api/manage/role/update",{_id,menus,auth_time,auth_name},'POST')
// 用户列表
export const reqUsers= () => ajax("/api/manage/user/list",{},'GET')
// 添加用户
export const reqAddUser= (params) => ajax("/api/manage/user/add",params,'POST')
// 修改用户
export const reqUpdateUser= (params) => ajax("/api/manage/user/update",params,'POST')
// 删除用户
export const reqDeleteUser= (userId) => ajax("/api/manage/user/delete",{userId},'POST')

