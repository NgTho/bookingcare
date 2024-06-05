import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';
import { userLoginSuccess } from '../../store/actions';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            passWord: '',
            issShowpassWord: false,
            errMessage: ''
        }
    }
    changeUsername = (e) => {
        this.setState({
            userName: e.target.value
        })
    }
    changePassword = (e) => {
        this.setState({
            passWord: e.target.value
        })
    }
    submitBtn = async () => {
        this.setState({
            errMessage: ''
        });
        try {
            let data = await handleLogin(this.state.userName, this.state.passWord);
            console.log(data);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.errMessage
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user);
            }

        } catch (e) {
            // Lấy data của error trong Axios dùng e.response
            //console.log(e.response);
            if (e.response.data) {
                this.setState({
                    errMessage: e.response.data.errMessage
                })
            }

        }

    }
    showHidepassWord = () => {
        this.setState({
            issShowpassWord: !this.state.issShowpassWord
        })
    }
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.submitBtn();
        }
    }
    render() {
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group'>
                            <label>Username</label>
                            <input type='text' className='form-control login-input' placeholder='Enter your name' value={this.state.userName} onChange={this.changeUsername} />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.issShowpassWord ? 'text' : 'password'} className='form-control login-input' placeholder='Enter your password' value={this.state.passWord} onChange={this.changePassword} onKeyDown={this.handleKeyDown} />
                                <i className={this.state.issShowpassWord ? 'far fa-eye-slash' : 'far fa-eye'} onClick={this.showHidepassWord}></i>
                            </div>

                        </div>
                        <div className='col-12 errMessage'>{this.state.errMessage}</div>
                        <div className='col-12'>
                            <button type='button' className='btn btn-primary btn-login' onClick={this.submitBtn}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center'>
                            <span className=''>Or login with</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
