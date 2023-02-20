import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
//import { getAllcode } from '../../../services/userService';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import ModalUserRedux from './ModalUserRedux';
import ModalEditUserRedux from './ModalEditUserRedux';
import { emitter } from '../../../utils/emitter';
import { confirmAlert } from 'react-confirm-alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: [],
            isOpenModal: false,
            isOpenEdit: false,
            resCreate: {},
            resDelete: {},
            clearModal: false,
            user: {}
        }
    }
    addUser = () => {
        this.setState({
            isOpenModal: true,
            clearModal: false
        })
    }
    editUser = async (user) => {
        console.log(user);
        this.setState({
            isOpenEdit: true,
            clearModal: false,
            user: user
        })
    }
    updateUser = async (data) => {
        try {
            await this.props.updateUserStart(data);
        } catch (e) {
            console.log(e);
        }
    }
    toggle = () => {
        this.setState({
            isOpenModal: false,
            isOpenEdit: false
        })
    }
    createUser = async (data) => {
        try {
            await this.props.createUserStart(data);
        } catch (e) {
            console.log(e);
        }
    }

    deleteUser = async (id) => {
        try {
            await this.props.deleteUserStart(id);
        } catch (e) {
            console.log(e);
        }
    }
    confirmDelete = async (id) => {
        confirmAlert({
            title: 'Are you delete',
            message: 'Are you sure delete',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteUser(id)
                },
                {
                    label: 'No',
                }
            ]
        })
    };
    async componentDidMount() {
        await this.props.getAllUserStart();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                userData: this.props.users
            })
        }
        if (prevProps.resCreate !== this.props.resCreate) {
            this.setState({
                resCreate: this.props.resCreate,
                isOpenModal: false,
                clearModal: true
            })
        }
        if (prevProps.resDelete !== this.props.resDelete) {
            this.setState({
                resDelete: this.props.resDelete
            })
        }
        if (prevProps.resUpdate !== this.props.resUpdate) {
            this.setState({
                resUpdate: this.props.resUpdate,
                isOpenEdit: false,
                clearModal: true
            })
        }
    }
    render() {
        let { userData } = this.state;
        return (
            <>
                <div className="container user-redux">
                    <ModalUserRedux
                        isOpenModal={this.state.isOpenModal}
                        clearModal={this.state.clearModal}
                        toggle={this.toggle}
                        createUser={this.createUser}
                    />
                    {
                        this.state.isOpenEdit === true &&
                        <ModalEditUserRedux
                            isOpenModal={this.state.isOpenEdit}
                            toggle={this.toggle}
                            user={this.state.user}
                            clearModal={this.state.clearModal}
                            updateUser={this.updateUser}

                        />
                    }
                    <h2 className="my-5 text-center">List User</h2>
                    <a onClick={this.addUser} className="mb-3"><i className="fas fa-user-plus"></i></a>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                userData && userData.length > 0 && userData.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {item.firstName}
                                            </td>
                                            <td>
                                                {item.lastName}
                                            </td>
                                            <td>
                                                {item.email}
                                            </td>
                                            <td>
                                                {item.address}
                                            </td>
                                            <td>
                                                <span onClick={() => this.editUser(item)}><i className="fas fa-user-edit"></i></span>
                                                <span onClick={() => this.confirmDelete(item.id)}><i className="fas fa-trash-alt"></i></span>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div >
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users,
        resCreate: state.admin.resCreate,
        resDelete: state.admin.resDelete,
        resUpdate: state.admin.resUpdate,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createUserStart: (data) => dispatch(actions.createUserStart(data)),
        getAllUserStart: () => dispatch(actions.getAllUserStart()),
        deleteUserStart: (data) => dispatch(actions.deleteUserStart(data)),
        updateUserStart: (data) => dispatch(actions.updateUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
