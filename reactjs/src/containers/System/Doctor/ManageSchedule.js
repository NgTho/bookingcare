import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment/moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { ToastContainer, toast } from 'react-toastify';
import _ from 'lodash';
import { bulkCreateSchedule } from '../../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            options: [],
            selectedDate: null,
            timeRange: []
        }
    }
    async componentDidMount() {
        await this.props.getRoleDataStart('R2');
        await this.props.getAllCodeStart();
    }
    componentDidUpdate(prevProps, prevState) {
        let { language: lang, roleData, allCodeData } = this.props;
        if (prevProps.roleData !== roleData || prevProps.language !== lang) {
            let copy = [];
            if (roleData && roleData.length > 0) {
                roleData.map((item, index) => {
                    let nameVi = item.lastName + ' ' + item.firstName;
                    let nameEn = item.firstName + ' ' + item.lastName;
                    if (lang === 'vi') {
                        copy = copy.concat({ value: item.id, label: nameVi });
                    }
                    if (lang === 'en') {
                        copy = copy.concat({ value: item.id, label: nameEn });
                    }
                })
            }
            this.setState({
                options: copy
            })
        }
        if (prevProps.allCodeData !== allCodeData) {
            /* let newTime = allCodeData;
            if (allCodeData && allCodeData.length > 0) {
                newTime = allCodeData.map((item, index) => {
                    item.isSelected = false;
                    return item
                })
            } */
            let newTime = {};
            console.log(allCodeData.time);
            if (allCodeData && allCodeData.time && allCodeData.time.length > 0) {
                newTime = allCodeData.time.map((item, index) => {
                    return { ...item, isSelected: false };
                })
            }
            this.setState({
                timeRange: newTime
            })
        }
    }
    changeSelect = async (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
        });
        /* let data = await getDetail(selectedOption.value);
        if (data && data.errCode == 0 && data.data.Markdown) {
            console.log('xxxxxx');
            this.setState({
                contentMarkdown: data.data.Markdown.contentMarkdown,
                contentHTML: data.data.Markdown.contentHTML,
                description: data.data.Markdown.description
            })
        }
        console.log(data); */
    };
    changeDate = (value) => {

        this.setState({
            selectedDate: value
        })
    }
    clickBtnTime = (time) => {
        let { timeRange } = this.state;
        let selectedTime = timeRange;
        if (timeRange && timeRange.length > 0) {
            selectedTime = timeRange.map((item, index) => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
        }
        this.setState({
            timeRange: selectedTime

        })
    }
    saveSchedule = async () => {
        let { selectedOption, timeRange, selectedDate } = this.state;

        if (!selectedOption || _.isEmpty(selectedOption)) { toast.error('Invalid doctor!'); return; }
        if (!selectedDate) { toast.error('Invalid date !'); return; }
        selectedDate = moment(selectedDate).format("YYYY/MM/DD");
        let result = [];
        if (timeRange && timeRange.length > 0) {
            timeRange.map((item, index) => {
                if (item.isSelected === true) {
                    result.push({
                        doctorId: selectedOption.value,
                        date: selectedDate,
                        timeType: item.keyMap
                    })
                }
            })
        } else {
            toast.error('Invalid time !'); return;
        }
        let res = await bulkCreateSchedule(result);
        if (res.errCode === 0) {
            toast.success('Success !'); return;
        } else {
            toast.error('Faile !'); return;
        }
        console.log(res);
    }
    render() {
        let { selectedOption, options, selectedDate, timeRange } = this.state;
        let { language: lang } = this.props;
        return (
            <>
                <div className="container manage-schedule">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="my-5 text-center">Manage Schedule</h2>
                        </div>
                    </div>
                    <div className="col-12">
                        <form action="" method="POST">
                            <div className="form-row">

                                <div className="form-group col-6">
                                    <label htmlFor="">Chọn bác sĩ</label>
                                    <Select
                                        value={selectedOption}
                                        onChange={this.changeSelect}
                                        options={options}
                                    />
                                </div>
                                <div className="form-group col-6">
                                    <label htmlFor="">Chọn ngày</label>
                                    <DatePicker
                                        /* selected={date}
                                        onSelect={handleDateSelect} */
                                        onChange={this.changeDate}
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                        selected={selectedDate}
                                        minDate={new Date()}
                                    />
                                </div>
                                <div className="form-group col-12">
                                    <div className='list-time'>
                                        {
                                            timeRange && timeRange.length > 0 && timeRange.map((item, index) => {
                                                return (
                                                    <Button
                                                        key={index}
                                                        className=""
                                                        color='secondary'
                                                        onClick={() => this.clickBtnTime(item)}
                                                        style={item.isSelected === true ? { backgroundColor: '#555', color: '#fff' } : {}}
                                                    >
                                                        {lang == 'vi' ? item.valueVi : item.valueEn}

                                                    </Button>
                                                )
                                            })
                                        }
                                    </div>

                                    <Button
                                        className='my-3 float-right'
                                        color="primary"
                                        onClick={this.saveSchedule}
                                    >
                                        <FormattedMessage id='manage-user.save' />
                                    </Button>
                                </div>

                            </div>
                        </form>
                    </div>

                </div >
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        roleData: state.admin.roleData,
        allCodeData: state.admin.allCodeData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getRoleDataStart: (roleId, limit) => dispatch(actions.getRoleDataStart(roleId, limit)),
        getAllCodeStart: () => dispatch(actions.getAllCodeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
