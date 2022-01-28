import BaseRequest from "./BaseRequest";

class UserAccountRequest extends BaseRequest{
    getUserAccountSettingById(uId){
        const url = `admin/manage-user/${uId}/user-account-setting`
        return this.get(url)
    }
}
export default UserAccountRequest