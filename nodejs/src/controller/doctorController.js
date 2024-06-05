import {
    getRoleData,
    createMarkdownData,
    getDetailData,
    bulkCreateScheduleData,
    getScheduleData
} from '../services/doctorServices';
let getRole = async (req, res) => {
    let limit = req.body.limit;
    let roleId = req.body.roleId;
    console.log(limit);
    console.log(roleId);
    if (!roleId) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing roleId'
        })
    }
    let data = await getRoleData(roleId, parseInt(limit));
    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error'
        })
    }
    return res.status(200).json(data);
}
let createMarkdown = async (req, res) => {
    //console.log('req: ', req.body);
    let data = await createMarkdownData(req.body);
    console.log(data);
    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error'
        })
    }
    return res.status(200).json(data);
}
let getDetail = async (req, res) => {
    let id = req.params.id;
    console.log(id);
    if (!id || id == null) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing input data'
        })
    }
    let data = await getDetailData(id);
    console.log(data);
    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error'
        })
    }
    return res.status(200).json(data);
}
let bulkCreateSchedule = async (req, res) => {
    let data = await bulkCreateScheduleData(req.body);
    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error'
        })
    }
    return res.status(200).json(data);
}
let getSchedule = async (req, res) => {
    let id = req.params.id;
    let date = req.params.date;
    let data = await getScheduleData(id, date);
    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error'
        })
    }
    return res.status(200).json(data);
}
export { getRole, createMarkdown, getDetail, bulkCreateSchedule, getSchedule }