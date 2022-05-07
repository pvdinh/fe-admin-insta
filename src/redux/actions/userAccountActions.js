const type = {
    GET_USER_ACCOUNT_SETTING_BY_ID: "GET_USER_ACCOUNT_SETTING_BY_ID",
    GET_ALL_USER: "GET_ALL_USER",
    GET_ALL_USER_SUCCESS: "GET_ALL_USER_SUCCESS",
    SEARCH_USER: "SEARCH_USER",
    SEARCH_USER_SUCCESS: "SEARCH_USER_SUCCESS",
    FILTER_USER_BY_TIME: "FILTER_USER_BY_TIME",
    FILTER_USER_BY_TIME_SUCCESS: "FILTER_USER_BY_TIME_SUCCESS",
    DELETE_USER: "DELETE_USER",
    DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
}
const action = {
    getUserAccountSettingById: (uId, callback) => ({
        type: type.GET_USER_ACCOUNT_SETTING_BY_ID,
        uId,
        callback,
    }),
    getAllUser: (payload, callback) => ({
        type: type.GET_ALL_USER,
        payload,
        callback,
    }),
    searchUser: (payload, callback) => ({
        type: type.SEARCH_USER,
        payload,
        callback,
    }),
    filterUserByTime: (payload, callback) => ({
        type: type.FILTER_USER_BY_TIME,
        payload,
        callback,
    }),
    deleteUser: (idUser, callback) => ({
        type: type.DELETE_USER,
        id:idUser,
        callback,
    }),
}
export default {type, action}