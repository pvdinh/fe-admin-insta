import UserAccountRequest from "../requests/UserAccountRequest";

export const getUserAccountSettingById = (uId) =>{
    const userAccountRequest = new UserAccountRequest()
    return userAccountRequest.getUserAccountSettingById(uId)
}

export const getAllUser = (payload) =>{
    const userAccountRequest = new UserAccountRequest()
    return userAccountRequest.getAllUser(payload)
}

export const searchUser = (payload) =>{
    const userAccountRequest = new UserAccountRequest()
    return userAccountRequest.searchUser(payload)
}