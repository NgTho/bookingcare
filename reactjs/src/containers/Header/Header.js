import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { changeLanguageApp } from '../../store/actions/appActions';
import './Header.scss';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
    changeLanguage = (lang) => {
        this.props.changeLanguageAppToRedux(lang) // gọi hàm từ component đến action
    }
    render() {
        const { processLogout } = this.props;
        let { language: lang, userInfo } = this.props;
        let name = userInfo.firstName + ' ' + userInfo.lastName;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='languages'>
                    <div className='welcome'><FormattedMessage id='home-header.welcome' /> {name ? name : ''}</div>
                    <div className={lang === 'vi' ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage('vi')}>VN</span></div>
                    <div className={lang === 'en' ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage('en')}>EN</span></div>
                </div>
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppToRedux: (lang) => dispatch(changeLanguageApp(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
