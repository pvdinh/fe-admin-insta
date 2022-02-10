const type = {
    GET_USER_ACCOUNT_SETTING_BY_ID: "GET_USER_ACCOUNT_SETTING_BY_ID",
    GET_ALL_USER: "GET_ALL_USER",
    GET_ALL_USER_SUCCESS: "GET_ALL_USER_SUCCESS",
    SEARCH_USER: "SEARCH_USER",
    SEARCH_USER_SUCCESS: "SEARCH_USER_SUCCESS",
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

}
export default {type, action}