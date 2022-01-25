import LoginRequest from "../requests/LoginRequest";

export const login = (payload) =>{
    const loginRequest = new LoginRequest()
    return loginRequest.login(payload)
}