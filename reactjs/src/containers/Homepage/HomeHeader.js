import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions/appActions';
class HomeHeader extends Component {
    changeLanguage = (lang) => {
        this.props.changeLanguageAppToRedux(lang) // gọi hàm từ component đến action
    }
    render() {
        //console.log('check props:', this.props);
        let lang = this.props.language; // lấy biến từ redux
        return (
            <>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center'>
                            <div className='child'>
                                <div><b><FormattedMessage id='home-header.speciality' /></b></div>
                                <div className='sub'><FormattedMessage id='home-header.searchdoctor' /></div>
                            </div>
                            <div className='child'>
                                <div><b><FormattedMessage id='home-header.health-facility' /></b></div>
                                <div className='sub'><FormattedMessage id='home-header.select-room' /></div>
                            </div>
                            <div className='child'>
                                <div><b><FormattedMessage id='home-header.doctor' /></b></div>
                                <div className='sub'><FormattedMessage id='home-header.select-doctor' /></div>
                            </div>
                            <div className='child'>
                                <div><b><FormattedMessage id='home-header.fee' /></b></div>
                                <div className='sub'><FormattedMessage id='home-header.check-health' /></div>
                            </div>
                        </div>
                        <div className='right'>
                            <div className='support'><i className='fas fa-question-circle'></i>Hỗ trợ</div>
                            <div className={lang === 'vi' ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage('vi')}>VN</span></div>
                            <div className={lang === 'en' ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage('en')}>EN</span></div>
                        </div>

                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-banner'>
                        <div className='top'>
                            <div className='t_1'><FormattedMessage id='banner.title1' /></div>
                            <div className='t_2'><FormattedMessage id='banner.title2' /></div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input type='text' placeholder='Tìm chuyên gia khám bệnh' />
                            </div>
                        </div>
                        <div className='bottom'>
                            <div className='options'>
                                <div className='child'>
                                    <div className='icon'><i className='far fa-hospital'></i></div>
                                    <div className='t_3'><FormattedMessage id='banner.child1' /></div>
                                </div>
                                <div className='child'>
                                    <div className='icon'><i className='fas fa-mobile-alt'></i></div>
                                    <div className='t_3'><FormattedMessage id='banner.child2' /></div>
                                </div>
                                <div className='child'>
                                    <div className='icon'><i className='fas fa-procedures'></i></div>
                                    <div className='t_3'><FormattedMessage id='banner.child3' /></div>
                                </div>
                                <div className='child'>
                                    <div className='icon'><i className='fas fa-flask'></i></div>
                                    <div className='t_3'><FormattedMessage id='banner.child4' /></div>
                                </div>
                                <div className='child'>
                                    <div className='icon'><i className='fas fa-user-md'></i></div>
                                    <div className='t_3'><FormattedMessage id='banner.child5' /></div>
                                </div>
                                <div className='child'>
                                    <div className='icon'><i className='fas fa-briefcase-medical'></i></div>
                                    <div className='t_3'><FormattedMessage id='banner.child6' /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppToRedux: (lang) => dispatch(changeLanguageApp(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
