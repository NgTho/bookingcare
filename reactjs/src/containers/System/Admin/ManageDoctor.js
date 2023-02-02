import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
//import { getAllcode } from '../../../services/userService';
import * as actions from '../../../store/actions';
import './ManageDoctor.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ModalUserRedux from './ModalUserRedux';
import ModalEditUserRedux from './ModalEditUserRedux';
import { emitter } from '../../../utils/emitter';
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import { getDetail } from '../../../services/userService';
class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: '',
            options: []
        }
    }
    async componentDidMount() {
        await this.props.getRoleDataStart('R2');
    }
    componentDidUpdate(prevProps, prevState) {
        let { language: lang, roleData } = this.props;
        console.log(lang);
        if (prevProps.roleData !== roleData || prevProps.language !== lang) {
            let copy = [];
            let roleData = this.props.roleData;
            if (roleData && roleData.length > 0) {
                roleData.map((item, index) => {
                    let nameVi = item.lastName + ' ' + item.firstName;
                    let nameEn = item.firstName + ' ' + item.lastName;
                    if (lang === 'vi') {
                        copy = copy.concat({ value: item.id, label: nameVi });
                    }
                    if (lang === 'en') {
                        copy = copy.concat({ value: item.id, label: nameEn });
                    }
                })
            }
            this.setState({
                options: copy
            })
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: html,
            contentHTML: text
        })
    }
    changeSelect = async (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
            contentMarkdown: '',
            contentHTML: '',
            description: ''
        });
        let data = await getDetail(selectedOption.value);
        if (data && data.errCode == 0 && data.data.Markdown) {
            console.log('xxxxxx');
            this.setState({
                contentMarkdown: data.data.Markdown.contentMarkdown,
                contentHTML: data.data.Markdown.contentHTML,
                description: data.data.Markdown.description
            })
        }
        console.log(data);
    };
    createMardown = async () => {
        await this.props.createMarkdownStart({
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            description: this.state.description,
            doctorId: this.state.selectedOption && this.state.selectedOption.value ? this.state.selectedOption.value : ''
        });
    }
    render() {
        const mdParser = new MarkdownIt(/* Markdown-it options */);
        let content;
        let { contentMarkdown, contentHTML, description, selectedOption, options } = this.state;
        contentMarkdown ? content = contentMarkdown : content = '';
        console.log(this.state);
        return (
            <>
                <div className="container manage-doctor">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="my-5 text-center">Manage Doctor</h2>
                        </div>
                    </div>
                    <div className="col-12">
                        <form action="" method="POST">
                            <div className="form-row">

                                <div className="form-group col-6">
                                    <label htmlFor="">Chọn bác sĩ</label>
                                    <Select
                                        value={selectedOption}
                                        onChange={this.changeSelect}
                                        options={options}
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Thông tin giới thiệu</label>
                                    <textarea type="text" className="form-control" name="firstName" placeholder="First name" rows='4' value={description} onChange={(e) => { this.setState({ description: e.target.value }) }}></textarea>
                                </div>
                            </div>
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} value={content} onChange={this.handleEditorChange} />
                            <Button className='my-3 float-right' color="primary" onClick={this.createMardown}><FormattedMessage id='manage-user.save' /></Button>
                        </form>
                    </div>

                </div >

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        roleData: state.admin.roleData,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleDataStart: (roleId, limit) => dispatch(actions.getRoleDataStart(roleId, limit)),
        createMarkdownStart: (data) => dispatch(actions.createMarkdownStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
