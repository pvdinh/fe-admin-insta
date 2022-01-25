const type = {
    LOGIN: "LOGIN",
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
}
export default {type, action}