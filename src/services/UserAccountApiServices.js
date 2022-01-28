import UserAccountRequest from "../requests/UserAccountRequest";

export const getUserAccountSettingById = (uId) =>{
    const userAccountRequest = new UserAccountRequest()
    return userAccountRequest.getUserAccountSettingById(uId)
}