import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../utils/CommonUtils';
class ModalUserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,

            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: '',
            gender: '',
            position: '',
            role: '',
            avatar: ''
        }
        //this.listenEmitter();
    }
    changeInput = (item, e) => {
        let copy = { ...this.state };
        copy[item] = e.target.value;
        this.setState({
            ...copy
        })
    }
    changeImg = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log(base64);
            let url = URL.createObjectURL(file);
            this.setState({
                url: url,
                avatar: base64
            })
        }
    }
    async componentDidMount() {
        await this.props.getAllCodeStart();
        await this.props.getRoleStart();

    }


    // Khởi tạo giá trị ban đầu
    componentDidUpdate(prevProps, prevState) {
        let { allCodeData, roleData, clearModal } = this.props;
        if (allCodeData && allCodeData.gender && allCodeData.gender.length > 0 && prevProps.allCodeData !== allCodeData) {
            this.setState({
                gender: allCodeData.gender[0].keyMap
            })
        }
        if (allCodeData && allCodeData.position && allCodeData.position.length > 0 && prevProps.allCodeData !== allCodeData) {
            this.setState({
                position: allCodeData.position[0].keyMap
            })
        }
        if (roleData && roleData.length > 0 && prevProps.roleData !== roleData) {
            this.setState({
                role: roleData[0].keyMap
            })
        }
        if (clearModal && clearModal === true && prevProps.clearModal !== clearModal) {
            this.setState({
                url: '',
                isOpen: false,

                firstName: '',
                lastName: '',
                email: '',
                password: '',
                address: '',
                phoneNumber: '',
                gender: allCodeData.gender[0].keyMap,
                position: allCodeData.position[0].keyMap,
                role: roleData[0].keyMap,
                avatar: ''
            })
        }
    }
    checkInput = () => {
        let isValid = true;
        let arr = ['firstName', 'lastName', 'email', 'password', 'address', 'phoneNumber'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                isValid = false;
                alert(`Missing ${arr[i]}`);
                break;
            }
        }
        return isValid;
    }
    addUser = () => {
        let isValid = this.checkInput();
        if (isValid === true) {
            this.props.createUser(this.state);
        }
    }
    render() {
        let { language: lang, isLoading, allCodeData, roleData } = this.props;
        let { isOpen, url } = this.state;
        let { firstName, lastName, email, password, address, phoneNumber, gender, position, role, avatar } = this.state;
        return (
            <Modal
                isOpen={this.props.isOpenModal}
                toggle={this.props.toggle}
                className={'modalReact'}
                size="lg"
                centered
            >
                <ModalHeader toggle={this.props.toggle}>Add User</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="my-3 text-center"><FormattedMessage id='manage-user.add' /></h2>
                            </div>
                            {isLoading === false &&
                                <div className="col-12 mx-auto border border-secondary rounded-lg pt-3">
                                    <form action="" method="POST">
                                        <div className="form-row">
                                            <div className="form-group col-6">
                                                <label htmlFor=""><FormattedMessage id='manage-user.first-name' /></label>
                                                <input type="text" className="form-control" name="firstName" placeholder="First name" onChange={(e) => this.changeInput('firstName', e)} value={firstName} />
                                            </div>
                                            <div className="form-group col-6">
                                                <label htmlFor=""><FormattedMessage id='manage-user.last-name' /></label>
                                                <input type="text" className="form-control" name="lastName" placeholder="Last name" onChange={(e) => this.changeInput('lastName', e)} value={lastName} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-6">
                                                <label htmlFor=""><FormattedMessage id='manage-user.email' /></label>
                                                <input type="email" className="form-control" name="email" placeholder="Email" onChange={(e) => this.changeInput('email', e)} value={email} />
                                            </div>
                                            <div className="form-group col-6">
                                                <label htmlFor=""><FormattedMessage id='manage-user.password' /></label>
                                                <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e) => this.changeInput('password', e)} value={password} />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-6">
                                                <label htmlFor=""><FormattedMessage id='manage-user.address' /></label>
                                                <input type="text" className="form-control" name="address" placeholder="1234 Main St" onChange={(e) => this.changeInput('address', e)} value={address} />
                                            </div>
                                            <div className="form-group col-6">
                                                <label htmlFor=""><FormattedMessage id='manage-user.phone-number' /></label>
                                                <input type="text" className="form-control" name="phoneNumber" onChange={(e) => this.changeInput('phoneNumber', e)} value={phoneNumber} />
                                            </div>
                                        </div>
                                        <div className="form-row">

                                            <div className="form-group col-4">
                                                <label htmlFor=""><FormattedMessage id='manage-user.gender' /></label>
                                                <select name="gender" className="form-control" onChange={(e) => this.changeInput('gender', e)}>
                                                    {
                                                        allCodeData && allCodeData.gender && allCodeData.gender.length > 0 && allCodeData.gender.map(item => {
                                                            return (
                                                                <option value={item.keyMap} key={item.keyMap}>{lang === 'vi' ? item.valueVi : item.valueEn}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-4">
                                                <label htmlFor=""><FormattedMessage id='manage-user.position' /></label>
                                                <select name="position" className="form-control" onChange={(e) => this.changeInput('position', e)}>
                                                    {
                                                        allCodeData && allCodeData.position && allCodeData.position.length > 0 && allCodeData.position.map(item => {
                                                            return (
                                                                <option value={item.keyMap} key={item.keyMap}>{lang === 'vi' ? item.valueVi : item.valueEn}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-4">
                                                <label htmlFor=""><FormattedMessage id='manage-user.role' /></label>
                                                <select name="roleId" className="form-control" onChange={(e) => this.changeInput('role', e)}>
                                                    {
                                                        roleData && roleData.length > 0 && roleData.map(item => {
                                                            return (
                                                                <option value={item.keyMap} key={item.keyMap}>{lang === 'vi' ? item.valueVi : item.valueEn}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group col-12">
                                                <label htmlFor=""><FormattedMessage id='manage-user.image' /></label>
                                                <div className='imgUpload'>
                                                    <label htmlFor="imgInput"><a className='btn btn-info'>Chọn ảnh <i className='fas fa-upload'></i></a></label>
                                                    <input type="file" id="imgInput" className="form-control" name="image" hidden onChange={this.changeImg} />
                                                    {
                                                        url !== '' &&
                                                        <div className='imgPreview' style={{ background: `url(${url})` }} onClick={() => this.setState({ isOpen: true })}></div>
                                                    }
                                                </div>

                                            </div>
                                        </div>
                                    </form>
                                </div>
                            }
                            {isLoading === true && <div className='col-6 mx-auto text-center'>LOADING DATA</div>}

                        </div >
                        {
                            isOpen === true &&
                            <Lightbox
                                mainSrc={url}
                                onCloseRequest={() => this.setState({ isOpen: false })}
                            />
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.addUser}><FormattedMessage id='manage-user.save' /></Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allCodeData: state.admin.allCodeData,
        roleData: state.admin.role,
        isLoading: state.admin.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllCodeStart: () => dispatch(actions.getAllCodeStart()),
        getRoleStart: () => dispatch(actions.getRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUserRedux);









