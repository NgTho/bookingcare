import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";

class HandBook extends Component {
    changeLanguage = (lang) => {
        this.props.changeLanguageAppToRedux(lang) // gọi hàm từ component đến action
    }
    render() {

        return (
            <>
                <div className='section handbook'>
                    <div className='container'>
                        <div className='header'>
                            <span className='title'>Cẩm nang</span>
                            <button className='btn'>Xem thêm</button>
                        </div>
                        <div className='body'>
                            <Slider {...this.props.settings}>
                                <div className='item'>
                                    <div className='img handbook'></div>
                                    <div>Cơ xương khớp</div>
                                </div>
                                <div className='item'>
                                    <div className='img handbook tk'></div>
                                    <div>Thần kinh</div>
                                </div>
                                <div className='item'>
                                    <div className='img handbook th'></div>
                                    <div>Tiêu hóa</div>
                                </div>
                                <div className='item'>
                                    <div className='img handbook tm'></div>
                                    <div>Tim mạch</div>
                                </div>
                                <div className='item'>
                                    <div className='img handbook tmh'></div>
                                    <div>Tai mũi họng</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
