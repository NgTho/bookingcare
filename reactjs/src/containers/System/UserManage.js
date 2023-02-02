import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import {
    getUser,
    createUser,
    deleteUser,
    updateUser
}
    from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import { emitter } from '../../utils/emitter';
class UserManage extends React.Component {
    state = {
        userData: [],
        isOpenModal: false,
        isOpenEdit: false,
        user: {}
    };
    async componentDidMount() {
        this.getUser();
    }
    getUser = async () => {
        let res = await getUser();
        if (res.user) {
            this.setState({
                userData: res.user
            })
        }
    }
    addUser = () => {
        this.setState({
            isOpenModal: true
        })
    }
    editUser = (user) => {
        this.setState({
            isOpenEdit: true,
            user: user
        })
    }
    toggle = () => {
        this.setState({
            isOpenModal: false,
            isOpenEdit: false
        })
    }
    createUser = async (data) => {
        try {
            let res = await createUser(data);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModal: false
                })
                await this.getUser();
                emitter.emit('EVEN_CLEAR_MODAL');
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }
    deleteUser = async (id) => {
        try {
            let res = await deleteUser(id);
            if (res && res.errCode === 0) {
                await this.getUser();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }
    confirmDelete = (id) => {
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
                    //onClick: () => alert('Click No')
                }
            ]
        })
    };
    updateUser = async (data) => {
        try {
            let res = await updateUser(data);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenEdit: false
                });
                await this.getUser();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        let { userData } = this.state;
        return (
            <>
                <div className="container userManager">
                    <ModalUser
                        isOpenModal={this.state.isOpenModal}
                        toggle={this.toggle}
                        createUser={this.createUser}
                    />
                    {
                        this.state.isOpenEdit === true &&
                        <ModalEditUser
                            isOpenModal={this.state.isOpenEdit}
                            toggle={this.toggle}
                            user={this.state.user}
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
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
