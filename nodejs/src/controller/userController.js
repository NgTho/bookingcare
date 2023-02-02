import { updateUser } from '../services/CrudServices';
import {
    userLogin,
    getUser,
    createNewUser,
    deleteUserdata,
    updateUserdata,
    getAllCodedata,
} from '../services/userServices';
let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Missing parameter!'
        })
    }
    let userData = await userLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        errMessage: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let getAllUser = async (req, res) => {
    let id = req.body.id;
    let userData = await getUser(id);
    console.log(userData);
    if (!userData) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'User not found'
        })
    }
    return res.status(200).json({
        errCode: 0,
        errMessage: 'User found',
        user: userData
    })
}
let createUser = async (req, res) => {
    let mes = await createNewUser(req.body);
    if (!mes) {
        return res.status(500).json({
            errCode: 1,
            errMessage: 'Not create'
        });
    }
    return res.status(200).json({
        errCode: mes.errCode,
        errMessage: mes.errMessage
    });
}
let deleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing parameter'
        })
    }
    let mes = await deleteUserdata(req.body.id);
    return res.status(200).json({
        errCode: mes.errCode,
        errMessage: mes.errMessage
    });
}
let editUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing parameter'
        })
    }
    let mes = await updateUserdata(req.body);
    return res.status(200).json({
        errCode: mes.errCode,
        errMessage: mes.errMessage
    });
}
let getAllCode = async (req, res) => {
    let type = req.params.type;
    if (!type) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing type input'
        })
    }
    let data = await getAllCodedata(type);
    if (!data) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Error'
        })
    }
    return res.status(200).json(data);
}

export { handleLogin, getAllUser, createUser, editUser, deleteUser, getAllCode }