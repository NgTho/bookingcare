import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import '../../Homepage/HomeHeader.scss';
import './DetailDoctor.scss';
import ScheduleDoctor from './ScheduleDoctor';
import { FormattedMessage } from 'react-intl';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailData: {}
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            await this.props.getDetailStart(this.props.match.params.id);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        let { detailData } = this.props;
        if (detailData && prevProps.detailData !== detailData) {
            this.setState({
                detailData: detailData
            })
        }
    }
    render() {
        const { language: lang, systemMenuPath } = this.props;
        let id = this.props.match.params.id;
        let { detailData } = this.state;
        let name, description, image, content;
        console.log(detailData);
        if (detailData && detailData.image) {
            image = detailData.image;
        }
        if (detailData && detailData.positionData) {
            let positionVi = ''; let positionEn = '';
            detailData.positionId === 'P0' ? positionVi = '' : positionVi = detailData.positionData.valueVi + ', ';
            detailData.positionId === 'P0' ? positionEn = '' : positionEn = detailData.positionData.valueEn + ', ';
            let nameVi = positionVi + 'Bác sĩ ' + detailData.lastName + ' ' + detailData.firstName;
            let nameEn = positionEn + 'Doctor ' + detailData.firstName + ' ' + detailData.lastName;
            if (lang === 'vi') {
                name = nameVi;
            }
            if (lang === 'en') {
                name = nameEn;
            }
        }
        if (detailData && detailData.Markdown && detailData.Markdown.description) {
            description = detailData.Markdown.description;
        }
        if (detailData && detailData.Markdown && detailData.Markdown.contentHTML) {
            content = detailData.Markdown.contentHTML;
        }


        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='section detail'>
                    <div className='top1'>
                        <div className='container'>
                            <div className="row">
                                <div className="col-2">
                                    <div className='bl1' style={{ backgroundImage: `url(${image})` }}>
                                    </div>
                                </div>
                                <div className="col-10">
                                    <div className='bl2'>
                                        <p className='t1'>{name}</p>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='top2'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-7'>
                                    <div className='left'>
                                        <ScheduleDoctor />
                                    </div>
                                </div>
                                <div className='col-5'>
                                    <div className='right'>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='top3'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12'>
                                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='top4'>

                    </div>
                </div>


            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        detailData: state.admin.detailData,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailStart: (id) => dispatch(actions.getDetailStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DetailDoctor));
