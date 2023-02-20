import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.user.id,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            email: this.props.user.email,
            address: this.props.user.address,
        }
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
        let arr = ['firstName', 'lastName', 'email', 'address'];
        for (let i = 0; i < arr.length; i++) {
            if (!this.state[arr[i]]) {
                isValid = false;
                alert(`Missing ${arr[i]}`);
                break;
            }
        }
        return isValid;
    }
    editUser = (data) => {
        let isValid = this.checkInput();
        console.log(data);
        if (isValid === true) {
            this.props.updateUser(data);
        }
    }
    render() {
        let { firstName, lastName, email, address } = this.state;
        //console.log(this.props);
        return (
            <Modal
                isOpen={this.props.isOpenModal}
                toggle={this.props.toggle}
                className={'modalReact'}
                size="lg"
                centered
            >
                <ModalHeader toggle={this.props.toggle}>Edit User</ModalHeader>
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
                                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={(e) => this.changeInput('email', e)} value={email} disabled />
                                    </div>

                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <input type="text" className="form-control" name="address" placeholder="1234 Main St" onChange={(e) => this.changeInput('address', e)} value={address} />
                                </div>
                            </div>

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.editUser(this.state)}>Update</Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);









