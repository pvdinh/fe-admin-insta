import HomeRequest from "../requests/HomeRequest";

export const getUserAccountProfile = () => {
    const homeRequest = new HomeRequest()
    return homeRequest.getUserAccountProfile()
}