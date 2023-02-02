import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class MedicalFacility extends Component {
    changeLanguage = (lang) => {
        this.props.changeLanguageAppToRedux(lang) // gọi hàm từ component đến action
    }
    render() {

        return (
            <>
                <div className='section medical-facility'>
                    <div className='container'>
                        <div className='header'>
                            <span className='title'>Cơ sở y tế nổi bật</span>
                            <button className='btn'>Xem thêm</button>
                        </div>
                        <div className='body'>
                            <Slider {...this.props.settings}>
                                <div className='item'>
                                    <div className='img medical-facility'></div>
                                    <div>Hệ thống y tế 1</div>
                                </div>
                                <div className='item'>
                                    <div className='img medical-facility tk'></div>
                                    <div>Hệ thống y tế 2</div>
                                </div>
                                <div className='item'>
                                    <div className='img medical-facility th'></div>
                                    <div>Hệ thống y tế 3</div>
                                </div>
                                <div className='item'>
                                    <div className='img medical-facility tm'></div>
                                    <div>Hệ thống y tế 4</div>
                                </div>
                                <div className='item'>
                                    <div className='img medical-facility tmh'></div>
                                    <div>Hệ thống y tế 5</div>
                                </div>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
