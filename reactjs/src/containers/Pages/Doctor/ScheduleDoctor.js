import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import * as actions from '../../../store/actions';
import HomeHeader from '../../Homepage/HomeHeader';
import '../../Homepage/HomeHeader.scss';
import './ScheduleDoctor.scss';
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';
import { getSchedule } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
class ScheduleDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            options: [],
            dataTime: []
        }
    }
    capitalizeFirstLetter = (str) => {
        let splitStr = str.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }
    changeLanguageSelect = () => {
        let { language: lang } = this.props;
        let arr = [],
            label,
            value;
        for (let i = 0; i < 7; i++) {
            value = moment().add(i, 'days').format("YYYY/MM/DD");
            if (lang === 'vi') {
                label = i === 0 ? 'Hôm nay - ' + moment().format('DD/MM') : this.capitalizeFirstLetter(moment().add(i, 'days').locale('vi').format('dddd - DD/MM'));
            }
            if (lang === 'en') {
                label = i === 0 ? 'Today - ' + moment().format('DD/MM') : moment().add(i, 'days').locale('en').format('ddd - DD/MM');
            }
            arr.push({
                value: value,
                label: label
            });
        }
        this.setState({
            options: arr
        })
    }
    changeSelect = async (selectedOption) => {
        let res = await getSchedule(this.props.match.params.id, moment(selectedOption.value).format("YYYY-MM-DD"));
        let dataTime = [];
        if (res && res.errCode == 0) {
            dataTime = res.data;
        }
        this.setState({
            selectedOption: selectedOption,
            dataTime: dataTime
        })
    };
    async componentDidMount() {
        await this.changeLanguageSelect();
        this.changeSelect(this.state.options[0]);
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            await this.changeLanguageSelect();
            // fix giá trị đã chọn khi thay đổi ngôn ngữ
            if (!this.state.selectedOption) await this.changeSelect(this.state.options[0]);
            let { language: lang } = this.props;
            let label, selectedOption, today, value = this.state.selectedOption.value;
            if (moment().format('YYYY/MM/DD') === value) today = true;
            if (lang === 'vi') {
                label = today === true ? 'Hôm nay - ' + moment().format('DD/MM') : this.capitalizeFirstLetter(moment(value).locale('vi').format('dddd - DD/MM'));
            }
            if (lang === 'en') {
                label = today === true ? 'Today - ' + moment().format('DD/MM') : moment(value).locale('en').format('ddd - DD/MM');
            }
            selectedOption = {
                value: value,
                label: label
            }
            this.setState({
                selectedOption: selectedOption
            })
        }

    }

    render() {
        let { selectedOption, options, dataTime } = this.state;
        let { language: lang } = this.props;
        console.log(this.state);
        return (
            <div className='schedule'>
                <Select
                    value={selectedOption}
                    onChange={this.changeSelect}
                    options={options}
                    styles={{
                        container: provided => ({
                            ...provided,
                            width: 250
                        })
                    }}
                />
                <div className='t1'>
                    <i className='fas fa-calendar-alt'></i><span><FormattedMessage id='detail.schedule' /></span>
                </div>
                <div className='bl1'>
                    {dataTime && dataTime.length > 0 ?
                        <>
                            {dataTime.map((item, index) => {
                                return (
                                    <Button
                                        key={index}
                                        className=""
                                        color='secondary'
                                    >
                                        {lang == 'vi' ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}

                                    </Button>
                                )
                            })}
                            <div className='t2'><FormattedMessage id='detail.choose' /> <i className='far fa-hand-point-up'></i> <FormattedMessage id='detail.book-free' /></div>
                        </>
                        :
                        <div><i><FormattedMessage id='detail.no-schedule' /></i></div>
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ScheduleDoctor));
