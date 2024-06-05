import actionTypes from './actionTypes';
import {
    getAllCode,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getRole,
    createMarkdown,
    getDetail,
} from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
/////////////////////////////////////////////
export const getRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.GET_ROLE_START });
            let data = await getAllCode('role');
            if (data && data.errCode === 0) {
                dispatch(getRoleSuccess(data.data));
            } else {
                dispatch(getRoleFail());
            }
        } catch (e) {
            dispatch(getRoleFail());
            console.log(e);
        }
    }
}

export const getRoleSuccess = (data) => ({
    type: actionTypes.GET_ROLE_SUCCESS,
    data: data
})

export const getRoleFail = () => ({
    type: actionTypes.GET_ROLE_FAIL
})

/////////////////////////////////////////////
export const createUserStart = (input) => {
    return async (dispatch, getState) => {
        try {
            let data = await createUser(input);
            //console.log(data);
            if (data && data.errCode === 0) {
                toast.success('Create user success!');
                dispatch(createUserSuccess(data));
                dispatch(getAllUserStart());
            } else {
                toast.error('Create user fail!');
                dispatch(createUserFail());
            }
        } catch (e) {
            dispatch(createUserFail());
            console.log(e);
        }
    }
}

export const createUserSuccess = (data) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    data: data
})

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

/////////////////////////////////////////////
export const getAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            let data = await getUser();
            if (data && data.errCode === 0) {
                dispatch(getAllUserSuccess(data.user.reverse()));//đưa user mới thêm lên đầu
            } else {
                dispatch(getAllUserFail());
            }
        } catch (e) {
            dispatch(getAllUserFail());
            console.log(e);
        }
    }
}

export const getAllUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_USER_SUCCESS,
    data: data
})

export const getAllUserFail = () => ({
    type: actionTypes.GET_ALL_USER_FAIL
})

/////////////////////////////////////////////
export const deleteUserStart = (input) => {
    return async (dispatch, getState) => {
        try {
            let data = await deleteUser(input);
            console.log(data);
            if (data && data.errCode === 0) {
                toast.warn('Delete user success!');
                dispatch(deleteUserSuccess(data));
                dispatch(getAllUserStart());
            } else {
                toast.error('Delete user fail!');
                dispatch(deleteUserFail());
            }
        } catch (e) {
            dispatch(deleteUserFail());
            console.log(e);
        }
    }
}

export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    data: data
})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL
})

/////////////////////////////////////////////
export const updateUserStart = (input) => {
    return async (dispatch, getState) => {
        try {
            let data = await updateUser(input);
            console.log(data);
            if (data && data.errCode === 0) {
                toast.success('Update user success!');
                dispatch(updateUserSuccess(data));
                dispatch(getAllUserStart());
            } else {
                toast.error('Update user fail!');
                dispatch(updateUserFail());
            }
        } catch (e) {
            dispatch(updateUserFail());
            console.log(e);
        }
    }
}

export const updateUserSuccess = (data) => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
    data: data
})

export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAIL
})

/////////////////////////////////////////////
export const getRoleDataStart = (roleId, limit) => {
    return async (dispatch, getState) => {
        try {
            let data = await getRole(roleId, limit);
            //console.log(data);
            if (data && data.errCode === 0) {
                dispatch(getRoleDataSuccess(data.data));
            } else {
                dispatch(getRoleDataFail());
            }
        } catch (e) {
            dispatch(getRoleDataFail());
            console.log(e);
        }
    }
}

export const getRoleDataSuccess = (data) => ({
    type: actionTypes.GET_ROLE_DATA_SUCCESS,
    data: data
})

export const getRoleDataFail = () => ({
    type: actionTypes.GET_ROLE_DATA_FAIL
})

/////////////////////////////////////////////
export const createMarkdownStart = (input) => {
    return async (dispatch, getState) => {
        try {
            let data = await createMarkdown(input);
            console.log(data);
            if (data && data.errCode === 0) {
                dispatch(createMarkdownSuccess(data));
                toast.success('Save success!');
            } else {
                dispatch(createMarkdownFail());
                toast.error('Save fail!');
            }
        } catch (e) {
            dispatch(createMarkdownFail());
            toast.error('Save fail!');
            console.log(e);
        }
    }
}

export const createMarkdownSuccess = (data) => ({
    type: actionTypes.CREATE_MARKDOWN_SUCCESS,
    data: data
})

export const createMarkdownFail = () => ({
    type: actionTypes.CREATE_MARKDOWN_FAIL
})

/////////////////////////////////////////////
export const getDetailStart = (input) => {
    return async (dispatch, getState) => {
        try {
            let data = await getDetail(input);
            console.log(data);
            if (data && data.errCode === 0) {
                dispatch(getDetailSuccess(data.data));
            } else {
                dispatch(getDetailFail());
            }
        } catch (e) {
            dispatch(getDetailFail());
            console.log(e);
        }
    }
}

export const getDetailSuccess = (data) => ({
    type: actionTypes.GET_DETAIL_SUCCESS,
    data: data
})

export const getDetailFail = () => ({
    type: actionTypes.GET_DETAIL_FAIL
})

/////////////////////////////////////////////
export const getAllCodeStart = () => {
    return async (dispatch, getState) => {
        try {
            let gender = await getAllCode('GENDER');
            let position = await getAllCode('POSITION');
            let time = await getAllCode('TIME');
            let price = await getAllCode('PRICE');
            let payment = await getAllCode('PAYMENT');
            let province = await getAllCode('PROVINCE');

            if (gender && gender.errCode === 0 && position && position.errCode === 0 && time && time.errCode === 0 && price && price.errCode === 0 && payment && payment.errCode === 0 && province && province.errCode === 0) {
                let data = {
                    gender: gender.data,
                    position: position.data,
                    time: time.data,
                    price: price.data,
                    payment: payment.data,
                    province: province.data,
                }
                console.log(data);
                dispatch(getAllCodeSuccess(data));
            } else {
                dispatch(getAllCodeFail());
            }
        } catch (e) {
            dispatch(getAllCodeFail());
            console.log(e);
        }
    }
}

export const getAllCodeSuccess = (data) => ({
    type: actionTypes.GET_ALLCODE_SUCCESS,
    data: data
})

export const getAllCodeFail = () => ({
    type: actionTypes.GET_ALLCODE_FAIL
})