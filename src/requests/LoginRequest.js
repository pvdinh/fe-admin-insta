import BaseRequest from "./BaseRequest";

class LoginRequest extends BaseRequest{
    login(payload){
        const url = 'login'
        return this.post(url,payload)
    }
}
export default LoginRequest