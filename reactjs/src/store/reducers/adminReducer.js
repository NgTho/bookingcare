import actionTypes from '../actions/actionTypes';

const initialState = {
    gender: [],
    role: [],
    position: [],
    isLoading: false,
    resCreate: {},
    resDelete: {},
    resUpdate: {},
    users: [],
    roleData: [],
    detailData: {},
}

const adminReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.GET_GENDER_START:
            state.isLoading = true;
            return {
                ...state
            }

        case actionTypes.GET_GENDER_SUCCESS:
            state.gender = action.data;
            state.isLoading = false;
            return {
                ...state
            }
        case actionTypes.GET_GENDER_FAIL:
            state.gender = [];
            state.isLoading = false;
            return {
                ...state
            }
        //////////////////////////////////////
        case actionTypes.GET_POSITION_START:
            return {
                ...state
            }

        case actionTypes.GET_POSITION_SUCCESS:
            state.position = action.data;
            return {
                ...state
            }
        case actionTypes.GET_POSITION_FAIL:
            state.position = [];
            return {
                ...state
            }
        ///////////////////////////////////
        case actionTypes.GET_ROLE_START:
            return {
                ...state
            }

        case actionTypes.GET_ROLE_SUCCESS:
            state.role = action.data;
            return {
                ...state
            }
        case actionTypes.GET_ROLE_FAIL:
            state.role = [];
            return {
                ...state
            }

        ///////////////////////////////////
        case actionTypes.CREATE_USER_START:
            return {
                ...state
            }

        case actionTypes.CREATE_USER_SUCCESS:
            state.resCreate = action.data;
            return {
                ...state
            }
        case actionTypes.CREATE_USER_FAIL:
            state.resCreate = {};
            return {
                ...state
            }

        ///////////////////////////////////
        case actionTypes.GET_ALL_USER_START:
            return {
                ...state
            }

        case actionTypes.GET_ALL_USER_SUCCESS:
            state.users = action.data;
            return {
                ...state
            }
        case actionTypes.GET_ALL_USER_FAIL:
            state.users = [];
            return {
                ...state
            }
        ///////////////////////////////////
        case actionTypes.DELETE_USER_START:
            return {
                ...state
            }

        case actionTypes.DELETE_USER_SUCCESS:
            state.resDelete = action.data;
            return {
                ...state
            }
        case actionTypes.DELETE_USER_FAIL:
            state.resDelete = {};
            return {
                ...state
            }
        ///////////////////////////////////
        case actionTypes.UPDATE_USER_START:
            return {
                ...state
            }

        case actionTypes.UPDATE_USER_SUCCESS:
            state.resUpdate = action.data;
            return {
                ...state
            }
        case actionTypes.UPDATE_USER_FAIL:
            state.resUpdate = {};
            return {
                ...state
            }
        ///////////////////////////////////
        case actionTypes.GET_ROLE_DATA_START:
            return {
                ...state
            }

        case actionTypes.GET_ROLE_DATA_SUCCESS:
            state.roleData = action.data;
            //console.log(state);
            return {
                ...state
            }
        case actionTypes.GET_ROLE_DATA_FAIL:
            state.roleData = {};
            return {
                ...state
            }
        ///////////////////////////////////
        case actionTypes.GET_DETAIL_START:
            return {
                ...state
            }

        case actionTypes.GET_DETAIL_SUCCESS:
            state.detailData = action.data;
            //console.log(state);
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_FAIL:
            state.detailData = {};
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}

export default adminReducer;