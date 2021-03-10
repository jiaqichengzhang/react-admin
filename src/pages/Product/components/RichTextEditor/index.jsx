import React, {Component} from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const transformDraftStateToHtml = (editorState) => {
    if (!editorState.getCurrentContent) {
        return '';
    }
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
};

const transformHtmlToDraftState = (html = '') => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
}
class RichTextEditor extends Component {
    state = {
        editorState: ''
    }
    componentDidMount() {
        if(this.props.editorState){
            this.setState({
                editorState: transformHtmlToDraftState(this.props.editorState)
            })
        }
    }
    getEditorState = () =>transformDraftStateToHtml(this.state.editorState)
    uploadImageCallBack = (file) => {
        return new Promise((resolve, reject) => {
            (async() => {
                var formData = new FormData();
                formData.append("image", file);
                var xhr = new XMLHttpRequest();
                xhr.open("post", "/api/manage/img/upload");
                xhr.send(formData);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        const res = JSON.parse(xhr.responseText)
                        if(res.status === 0){
                            resolve({
                                data: {
                                    link: `${res.data.url}`,
                                },
                            });
                        }else{
                            reject();
                        }
                    }
                }
                xhr.onerror = function () {
                    const error = JSON.parse(xhr.responseText)
                    reject(error)
                }
            })();
        })
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    };
    render() {
        return (
            <Editor
                editorStyle={{
                    minHeight: '200px',
                    border:"1px solid #999"
                }}
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                    image: {
                        uploadCallback: this.uploadImageCallBack,
                        alt: { present: true, previewImage: true },
                        previewImage: true,
                    },
                }}
            />
        );
    }
}

export default RichTextEditor;
