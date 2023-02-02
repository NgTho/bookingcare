import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: ''
        }
        this.listenEmitter();
    }


    listenEmitter() {
        console.log('emittttter');
        emitter.on('EVEN_CLEAR_MODAL', () => {
            console.log('emittttter1111');
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                address: ''
            })
        })
    }
    componentDidMount() {
    }

    changeInput = (item, e) => {
        let copy = { ...this.state };
        copy[item] = e.target.value;
        this.setState({
            ...copy
        })
    }
    checkInput = () => {
        let isValid = true;
        let arr = ['firstName', 'lastName', 'email', 'password', 'address'];
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
        let { firstName, lastName, email, password, address } = this.state;
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
                            <div className="col-12 mx-auto pt-3">

                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>First name</label>
                                        <input type="text" className="form-control" name="firstName" placeholder="First name" onChange={(e) => this.changeInput('firstName', e)} value={firstName} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Last name</label>
                                        <input type="text" className="form-control" name="lastName" placeholder="Last name" onChange={(e) => this.changeInput('lastName', e)} value={lastName} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-6">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={(e) => this.changeInput('email', e)} value={email} />
                                    </div>
                                    <div className="form-group col-6">
                                        <label>Password</label>
                                        <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e) => this.changeInput('password', e)} value={password} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" className="form-control" name="address" placeholder="1234 Main St" onChange={(e) => this.changeInput('address', e)} value={address} />
                                </div>
                                {/* <div className="row">
                                    <div className="form-group col-6">
                                        <label for="">Phone number</label>
                                        <input type="text" className="form-control" name="phoneNumber" />
                                    </div>
                                    <div className="form-group col-3">
                                        <label for="">Gender</label>
                                        <select name="gender" className="form-control">
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-3">
                                        <label for="">Role</label>
                                        <select name="roleId" className="form-control">
                                            <option value="0">Admin</option>
                                            <option value="1">Doctor</option>
                                            <option value="2">Patien</option>
                                        </select>
                                    </div>
                                </div> */}

                            </div>

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.addUser}>Create</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);









