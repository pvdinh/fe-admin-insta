const type = {
   GET_USER_ACCOUNT_SETTING_BY_ID:"GET_USER_ACCOUNT_SETTING_BY_ID",
}
const action = {
    getUserAccountSettingById: (uId, callback) => ({
        type: type.GET_USER_ACCOUNT_SETTING_BY_ID,
        uId,
        callback,
    }),
}
export default {type, action}