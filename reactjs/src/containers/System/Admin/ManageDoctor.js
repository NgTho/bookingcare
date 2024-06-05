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
            // save to markdow
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            listDoctor: [],

            //save to doctor info
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: null,
            selectedPayment: null,
            selectedProvince: null,
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }
    async componentDidMount() {
        await this.props.getRoleDataStart('R2');
        await this.props.getAllCodeStart();
    }
    componentDidUpdate(prevProps, prevState) {
        let { language: lang, roleData, allCodeData } = this.props;
        let listDoctor = [];
        let listPrice = [];
        let listPayment = [];
        let listProvince = [];
        if (prevProps.language !== lang || prevProps.roleData !== roleData || prevProps.allCodeData !== allCodeData) {
            if (roleData && roleData.length > 0) {
                roleData.map((item, index) => {
                    let nameVi = item.lastName + ' ' + item.firstName;
                    let nameEn = item.firstName + ' ' + item.lastName;
                    if (lang === 'vi') {
                        listDoctor.push({ value: item.id, label: nameVi });
                    }
                    if (lang === 'en') {
                        listDoctor.push({ value: item.id, label: nameEn });
                    }
                })
            }
            if (allCodeData && allCodeData.price && allCodeData.price.length > 0) {
                allCodeData.price.map((item, index) => {
                    if (lang === 'vi') {
                        listPrice.push({ value: item.keyMap, label: item.valueVi + ' VND' });
                    }
                    if (lang === 'en') {
                        listPrice.push({ value: item.keyMap, label: item.valueEn + ' USD' });
                    }
                })
            }
            if (allCodeData && allCodeData.payment && allCodeData.payment.length > 0) {
                allCodeData.payment.map((item, index) => {
                    if (lang === 'vi') {
                        listPayment.push({ value: item.keyMap, label: item.valueVi });
                    }
                    if (lang === 'en') {
                        listPayment.push({ value: item.keyMap, label: item.valueEn });
                    }
                })
            }
            if (allCodeData && allCodeData.province && allCodeData.province.length > 0) {
                allCodeData.province.map((item, index) => {
                    if (lang === 'vi') {
                        listProvince.push({ value: item.keyMap, label: item.valueVi });
                    }
                    if (lang === 'en') {
                        listProvince.push({ value: item.keyMap, label: item.valueEn });
                    }
                })
            }
            this.setState({
                listDoctor,
                listPrice,
                listPayment,
                listProvince
            })
        }




    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    changeText = (item, e) => {
        console.log(item);
        let copy = { ...this.state };
        copy[item] = e.target.value;
        this.setState({
            ...copy
        })
    }
    changeSelect = async (select, name) => {
        let { language: lang } = this.props;
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            description: '',
            selectedPrice: null,
            selectedPayment: null,
            selectedProvince: null,
            nameClinic: '',
            addressClinic: '',
            note: ''
        });
        let nameSelect = name.name;
        if (nameSelect === 'selectedDoctor') {
            let data = await getDetail(select.value);
            if (data && data.errCode == 0 && data.data.Markdown && data.data.Doctor_Info) {

                this.setState({
                    contentMarkdown: data.data.Markdown.contentMarkdown,
                    contentHTML: data.data.Markdown.contentHTML,
                    description: data.data.Markdown.description,
                    selectedPrice: { value: data.data.Doctor_Info.priceId, label: lang == 'vi' ? data.data.Doctor_Info.priceData.valueVi : data.data.Doctor_Info.priceData.valueEn },
                    selectedPayment: { value: data.data.Doctor_Info.paymentId, label: lang == 'vi' ? data.data.Doctor_Info.paymentData.valueVi : data.data.Doctor_Info.paymentData.valueEn },
                    selectedProvince: { value: data.data.Doctor_Info.provinceId, label: lang == 'vi' ? data.data.Doctor_Info.provinceData.valueVi : data.data.Doctor_Info.provinceData.valueEn },
                    nameClinic: data.data.Doctor_Info.nameClinic,
                    addressClinic: data.data.Doctor_Info.addressClinic,
                    note: data.data.Doctor_Info.note
                })
            }
        }

        let copyState = { ...this.state }
        copyState[nameSelect] = select
        this.setState({
            ...copyState
        })
    };
    createMardown = async () => {
        /* {
    contentMarkdown: this.state.contentMarkdown,
    contentHTML: this.state.contentHTML,
    description: this.state.description,
    doctorId: this.state.selectedDoctor && this.state.selectedDoctor.value ? this.state.selectedDoctor.value : '',
    priceId: this.state.selectedPrice,
    paymentId: this.state.selectedPayment,
    provinceId: this.state.selectedProvince
} */
        let data = this.state;
        data.doctorId = this.state.selectedDoctor && this.state.selectedDoctor.value ? this.state.selectedDoctor.value : '';
        data.priceId = this.state.selectedPrice && this.state.selectedPrice.value ? this.state.selectedPrice.value : '';
        data.paymentId = this.state.selectedPayment && this.state.selectedPayment.value ? this.state.selectedPayment.value : '';
        data.provinceId = this.state.selectedProvince && this.state.selectedProvince.value ? this.state.selectedProvince.value : '';
        console.log(data);
        await this.props.createMarkdownStart(data);
    }
    render() {
        const mdParser = new MarkdownIt(/* Markdown-it listDoctor */);
        let content;
        let { contentMarkdown, contentHTML, description, selectedDoctor, selectedPrice, selectedPayment, selectedProvince, listDoctor, listPrice, listPayment, listProvince, nameClinic, addressClinic, note } = this.state;
        if (contentMarkdown) content = contentMarkdown;
        console.log(this.state);
        return (
            <>
                <div className="container manage-doctor">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="my-5 text-center"><FormattedMessage id='admin.manage-doctor.title' /></h2>
                        </div>
                    </div>
                    <div className="col-12">
                        <form action="" method="POST">
                            <div className="form-row">

                                <div className="form-group col-6">
                                    <label htmlFor=""><FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                                    <Select
                                        value={selectedDoctor}
                                        onChange={this.changeSelect}
                                        options={listDoctor}
                                        placeholder={<FormattedMessage id='admin.manage-doctor.select-doctor' />}
                                        name='selectedDoctor'
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor=""><FormattedMessage id='admin.manage-doctor.intro' /></label>
                                    <textarea type="text" className="form-control" name="firstName" rows='4' value={description} onChange={(e) => this.changeText('description', e)}></textarea>
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor=""><FormattedMessage id='admin.manage-doctor.price' /></label>
                                    <Select
                                        value={selectedPrice}
                                        onChange={this.changeSelect}
                                        options={listPrice}
                                        placeholder={<FormattedMessage id='admin.manage-doctor.price' />}
                                        name='selectedPrice'
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor=""><FormattedMessage id='admin.manage-doctor.payment' /></label>
                                    <Select
                                        value={selectedPayment}
                                        onChange={this.changeSelect}
                                        options={listPayment}
                                        placeholder={<FormattedMessage id='admin.manage-doctor.payment' />}
                                        name='selectedPayment'
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor=""><FormattedMessage id='admin.manage-doctor.province' /></label>
                                    <Select
                                        value={selectedProvince}
                                        onChange={this.changeSelect}
                                        options={listProvince}
                                        placeholder={<FormattedMessage id='admin.manage-doctor.province' />}
                                        name='selectedProvince'
                                    />
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor=""><FormattedMessage id='admin.manage-doctor.name-clinic' /></label>
                                    <input type="text" className="form-control" value={nameClinic} onChange={(e) => this.changeText('nameClinic', e)} />
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor=""><FormattedMessage id='admin.manage-doctor.address-clinic' /></label>
                                    <input type="text" className="form-control" value={addressClinic} onChange={(e) => this.changeText('addressClinic', e)} />
                                </div>
                                <div className="form-group col-4">
                                    <label htmlFor=""><FormattedMessage id='admin.manage-doctor.note' /></label>
                                    <input type="text" className="form-control" value={note} onChange={(e) => this.changeText('note', e)} />
                                </div>
                            </div>
                            <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} value={contentMarkdown} onChange={this.handleEditorChange} />
                            <Button className='my-3 float-right' color="primary" onClick={this.createMardown}><FormattedMessage id='admin.manage-doctor.save' /></Button>
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
        allCodeData: state.admin.allCodeData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleDataStart: (roleId, limit) => dispatch(actions.getRoleDataStart(roleId, limit)),
        createMarkdownStart: (data) => dispatch(actions.createMarkdownStart(data)),
        getAllCodeStart: () => dispatch(actions.getAllCodeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
