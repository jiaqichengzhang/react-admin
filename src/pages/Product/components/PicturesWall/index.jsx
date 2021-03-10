import React, {Component} from 'react';
import { Upload, Modal,message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {IMG_URL} from '../../../../utils/constants'
import {reqDeleteImg} from '../../../../api'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
class PicturesWall  extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };

    componentWillMount() {
        if(this.props.imgs){
            const fileList = this.props.imgs.map((img,index)=>({
                uid: -index,
                name: img,
                status: 'done',
                url: IMG_URL+img,
            }))
            this.setState({fileList})
        }
    }
    getImgs = () =>this.state.fileList.map(v=>v.name)
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };
    /*
    file:当前操作的文件
     */
    handleChange = async ({ file,fileList }) => {
        if(file.status === 'done'){
            const {status,data} = file.response
            console.log(file.response)
            if(status === 0){
                const {name,url} = data
                fileList[fileList.length-1]['name'] = name
                fileList[fileList.length-1]['url'] = url
            }else{
                message.error('图片上传失败！')
            }
        }else if(file.status === 'removed'){
            const res = await reqDeleteImg(file.name)
            if(res.status === 0){
                message.success('图片删除成功！')
            }else{
                message.error('图片删除失败！')
            }
        }
        this.setState({ fileList })
    };

    render() {
        const { previewVisible, previewImage, fileList, previewTitle } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    action="/api/manage/img/upload"
                    listType="picture-card"
                    accept="image/*"
                    name="image"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

export default PicturesWall ;
