import React, { Component } from 'react';
import { connect } from 'react-redux';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
class About extends Component {
    changeLanguage = (lang) => {
        this.props.changeLanguageAppToRedux(lang) // gọi hàm từ component đến action
    }
    render() {

        return (
            <>
                <div className='about'>
                    <div className='header'>
                        Truyền thông nói về BookingCare
                    </div>
                    <div className='content'>
                        <div className='bl left'>
                            <LiteYouTubeEmbed
                                id="FyDQljKtWnI"
                                title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
                            />
                        </div>
                        <div className='bl right'>

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
