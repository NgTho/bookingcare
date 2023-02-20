import db from '../models/index';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
let checkEmail = async (email) => {
    try {
        let user = await db.User.findOne(
            {
                where: { email: email }
            }
        )
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return e;
    }
}

let userLogin = async (email, password) => {
    try {
        let userData = {};
        let issEmail = await checkEmail(email);
        if (issEmail) {
            let user = await db.User.findOne(
                {
                    where: { email: email }
                }
            )
            if (user) {
                let check = bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = 'User found!';
                    //console.log(user);
                    delete user.password;
                    userData.user = user;
                } else {
                    userData.errCode = 3;
                    userData.errMessage = 'Password wrong';
                }
            } else {
                userData.errCode = 2;
                userData.errMessage = 'User not found!';
            }
            return userData;
        } else {
            userData.errCode = 1;
            userData.errMessage = 'Email not found!';
            return userData;
        }
    } catch (e) {
        return e;
    }
}
let getUser = async (id) => {
    try {
        let userData;
        if (id) {
            userData = await db.User.findOne(
                {
                    attributes: { exclude: ['password'] },
                    where: { id: id }
                }
            )
        } else {
            userData = await db.User.findAll(
                {
                    attributes: { exclude: ['password'] }
                }
            )
        }
        if (userData) {
            return userData;
        } else {
            return {}
        }
    } catch (e) {
        return e;
    }
}
let createNewUser = async (data) => {
    try {
        let check = await checkEmail(data.email);
        if (check === true) {
            return ({
                errCode: 1,
                errMessage: 'Email is already exist'
            })
        }

        let hash = await hashPassword(data.password);
        await db.User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hash,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            roleId: data.role,
            positionId: data.position,
            image: data.avatar
        })
        return {
            errCode: 0,
            errMessage: "Success"
        }
    } catch (e) {
        return e;
    }
}


let hashPassword = async (password) => {
    try {
        let hash = bcrypt.hashSync(password, salt);
        return hash;
    } catch (e) {
        return e;
    }
}
let deleteUserdata = async (id) => {
    try {
        let user = await db.User.findOne(
            {
                where: { id: id }
            }
        )
        if (!user) {
            return {
                errCode: 1,
                errMessage: 'Delete fail, user not found'
            }
        }
        await db.User.destroy(
            {
                where: { id: id }
            }
        )

        return {
            errCode: 0,
            errMessage: 'Delete success'
        }
    } catch (e) {
        return e;
    }
}
let updateUserdata = async (data) => {
    try {
        let user = await db.User.findOne(
            {
                where: { id: data.id }
            }
        )
        if (!user) {
            return {
                errCode: 1,
                errMessage: 'Update fail, user not found'
            }
        }
        await db.User.update(
            {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                roleId: data.role,
                positionId: data.position,
                image: data.avatar
            },
            {
                where: { id: data.id }
            }
        )
        return {
            errCode: 0,
            errMessage: 'Update success'
        }
    } catch (e) {
        return e;
    }
}
let getAllCodedata = async (type) => {
    try {
        let data = await db.Allcode.findAll(
            {
                where: { type: type }
            }
        );
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

export { userLogin, getUser, createNewUser, deleteUserdata, updateUserdata, getAllCodedata }