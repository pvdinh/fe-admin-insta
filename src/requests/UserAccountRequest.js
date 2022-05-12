import BaseRequest from "./BaseRequest";

class UserAccountRequest extends BaseRequest{
    getUserAccountSettingById(uId){
        const url = `admin/manage-user/${uId}/user-account-setting`
        return this.get(url)
    }

    getAllUser(payload){
        const url = `admin/manage-user?page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }

    searchUser(payload){
        const url = `admin/manage-user/${payload.search}/search?page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }

    filterUserByTime(payload){
        const url = `admin/manage-user/filter?start=${payload.start}&end=${payload.end}&phone=${payload.phone}&email=${payload.email}&page=${payload.page}&size=${payload.size}`
        return this.get(url)
    }

    deleteUser(idUser){
        const url = `admin/manage-user/${idUser}/delete`
        return this.delete(url)
    }
}
export default UserAccountRequest