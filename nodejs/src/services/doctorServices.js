import db from '../models/index';
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
        await db.Markdown.create({
            contentHTML: input.contentHTML,
            contentMarkdown: input.contentMarkdown,
            description: input.description,
            doctorId: input.doctorId
        })
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
export { getRoleData, createMarkdownData, getDetailData }