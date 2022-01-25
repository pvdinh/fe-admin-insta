const type = {
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
}
const action = {
    login: (username, password, callback) => ({
        type: type.LOGIN,
        payload: {
            username,
            password,
        },
        callback,
    }),
    logout: () => ({
        type: type.LOGOUT,
    }),
}
export default {type, action}