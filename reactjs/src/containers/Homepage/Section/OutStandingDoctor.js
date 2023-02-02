import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../store/actions';
import { withRouter } from "react-router";
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctor: []
        }
    }
    changeLanguage = (lang) => {
        this.props.changeLanguageAppToRedux(lang) // gọi hàm từ component đến action
    }
    viewDetail = (id) => {
        console.log(id);
        if (this.props && this.props.history) {
            this.props.history.push(`/detail/${id}`);
        }

    }
    async componentDidMount() {
        await this.props.getRoleDataStart('R2', 5);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.roleData !== this.props.roleData) {
            this.setState({
                topDoctor: this.props.roleData
            })
        }
    }
    render() {
        //console.log(this.state);
        let { topDoctor } = this.state;
        let lang = this.props.language;
        return (
            <>
                <div className='section outstanding-doctor'>
                    <div className='container'>
                        <div className='header'>
                            <span className='title'><FormattedMessage id='homepage.outstanding-doctor' /></span>
                            <button className='btn'><FormattedMessage id='homepage.more-info' /></button>
                        </div>
                        <div className='body'>
                            <Slider {...this.props.settings}>
                                {
                                    topDoctor && topDoctor.length > 0 && topDoctor.map((item, index) => {
                                        let url;
                                        if (item.image) {
                                            url = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        let positionVi = ''; let positionEn = '';
                                        item.positionId === 'P0' ? positionVi = '' : positionVi = item.positionData.valueVi + ', ';
                                        item.positionId === 'P0' ? positionEn = '' : positionEn = item.positionData.valueEn + ', ';
                                        let nameVi = positionVi + 'Bác sĩ ' + item.lastName + ' ' + item.firstName;
                                        let nameEn = positionEn + 'Doctor ' + item.firstName + ' ' + item.lastName;
                                        return (
                                            <div className='item' key={item.id} onClick={() => this.viewDetail(item.id)}>
                                                <div className='border'>
                                                    <div className='outer-bg'>
                                                        <div className='img outstanding-doctor' style={{ backgroundImage: `url(${url})` }}></div>
                                                    </div>
                                                    <div className='position text-center'>
                                                        <div>
                                                            {lang === 'vi' && nameVi}
                                                            {lang === 'en' && nameEn}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>

                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        roleData: state.admin.roleData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleDataStart: (roleId, limit) => dispatch(actions.getRoleDataStart(roleId, limit)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OutStandingDoctor));
