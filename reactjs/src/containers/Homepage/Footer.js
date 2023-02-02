import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {
    changeLanguage = (lang) => {
        this.props.changeLanguageAppToRedux(lang) // gọi hàm từ component đến action
    }
    render() {

        return (
            <>
                <div className='footer'>
                    <p>&copy; 2021 Bookingcare <a href='#'>Click để xem chi tiết</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
