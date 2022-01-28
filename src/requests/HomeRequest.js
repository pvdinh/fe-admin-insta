import BaseRequest from "./BaseRequest";

export default class HomeRequest extends BaseRequest{
    getUserAccountProfile(){
        const url = 'user-account-setting/get'
        return this.get(url)
    }
}