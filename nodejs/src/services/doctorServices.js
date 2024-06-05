import db from '../models/index';
import _ from 'lodash';
import moment from 'moment/moment';
let getRoleData = async (roleId, limit) => {
    try {
        let data;
        if (limit) {
            data = await db.User.findAll(
                {
                    where: { roleId: roleId },
                    limit: limit,
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true
                }
            );
        } else {
            data = await db.User.findAll(
                {
                    where: { roleId: roleId },
                    order: [
                        ['createdAt', 'DESC']
                    ],
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true
                }
            );
        }

        if (data) {
            return {
                errCode: 0,
                data: data
            }
        }
    } catch (e) {
        return e;
    }
}
let createMarkdownData = async (input) => {
    try {
        let { doctorId, contentHTML, contentMarkdown, priceId, paymentId, provinceId, addressClinic, nameClinic, note } = input;
        //console.log('input: ', input);
        if (!doctorId || !contentHTML || !contentMarkdown || !priceId || !paymentId || !provinceId || !addressClinic || !nameClinic) {
            return {
                errCode: 1,
                errMessage: 'Missing input data 111'
            }
        }
        await db.Markdown.create(input);
        let info = await db.Doctor_Info.findOne({
            where: { doctorId },
            raw: false
        })
        console.log('info: ', info);
        if (info) {
            await db.Doctor_Info.update(
                input,
                {
                    where: { doctorId }
                }
            );
        } else {
            await db.Doctor_Info.create(input);
        }

        return {
            errCode: 0,
            errMessage: "Success"
        }
    } catch (e) {
        return e;
    }
}
let getDetailData = async (id) => {
    try {
        let data = await db.User.findOne({
            where: { id: id },
            attributes: {
                exclude: ['password']
            },
            include: [
                { model: db.Markdown, attributes: ['description', 'contentHTML', 'contentMarkdown'] },
                { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                {
                    model: db.Doctor_Info,
                    attributes: { exclude: ['id', 'doctorId'] },
                    include: [
                        { model: db.Allcode, as: 'priceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'provinceData', attributes: ['valueEn', 'valueVi'] },
                        { model: db.Allcode, as: 'paymentData', attributes: ['valueEn', 'valueVi'] },
                    ],
                },
            ],
            raw: true,
            nest: true
        })
        if (data && data.image) {
            data.image = new Buffer(data.image, 'base64').toString('binary');
        }
        if (data) {
            return {
                errCode: 0,
                data: data
            }
        }
    } catch (e) {
        return e;
    }
}
let bulkCreateScheduleData = async (data) => {
    try {
        let dataSchedule = data;
        if (dataSchedule && dataSchedule.length > 0) {
            dataSchedule = dataSchedule.map((item, index) => {
                item.maxNumber = 10;//số lượng tối đa bệnh nhân mà bác sĩ khám
                return item;

            })
            let exist = await db.Schedule.findAll(
                {
                    where: { doctorId: dataSchedule[0].doctorId, date: moment(dataSchedule[0].date).format("YYYY-MM-DD") },

                    attributes: ['doctorId', 'date', 'timeType', 'maxNumber'],
                    raw: true
                }
            );
            console.log('exist1: ', exist);
            // convert date 
            if (exist && exist.length > 0) {
                exist = exist.map((item, index) => {
                    item.date = moment(item.date).format("YYYY/MM/DD");
                    return item;
                })
            }
            let diff = _.differenceWith(dataSchedule, exist, _.isEqual);
            console.log('dataSchedule: ', dataSchedule);
            console.log('exist2: ', exist);
            console.log('diff: ', diff);
            if (diff && diff.length > 0) {
                await db.Schedule.bulkCreate(diff);
            }
            return {
                errCode: 0,
                data: dataSchedule
            }
        } else {
            return {
                errCode: 1,
                errMessage: 'missing'
            }
        }

    } catch (e) {
        return e;
    }
}
let getScheduleData = async (id, date) => {
    try {

        if (!id || !date) {
            return {
                errCode: 1,
                errMessage: 'missing'
            }
        }
        console.log('id: ', id, 'date: ', date);
        let data = await db.Schedule.findAll(
            {
                where: { doctorId: id, date: date },

                attributes: ['doctorId', 'date', 'timeType', 'maxNumber'],
                include: [
                    { model: db.Allcode, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            }
        );

        // convert date 
        if (data && data.length > 0) {
            data = data.map((item, index) => {
                item.date = moment(item.date).format("YYYY/MM/DD");
                return item;
            })
        }
        console.log(data);
        return {
            errCode: 0,
            data: data
        }

    } catch (e) {
        return e;
    }
}
export { getRoleData, createMarkdownData, getDetailData, bulkCreateScheduleData, getScheduleData }