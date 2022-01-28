const type = {
    GET_USER_ACCOUNT_PROFILE: "GET_USER_ACCOUNT_PROFILE",
    GET_USER_ACCOUNT_PROFILE_SUCCESS: "GET_USER_ACCOUNT_PROFILE_SUCCESS",
}
const action = {
    getUserAccountProfile: (callback) => ({
            type: type.GET_USER_ACCOUNT_PROFILE,
            callback,
        }),
}
export default {type, action}